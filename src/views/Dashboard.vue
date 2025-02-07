<template>
  <div class="dashboard">
    <header class="header">
      <h1>Bienvenido</h1>
      <p>Accesos directos y estadísticas</p>
    </header>

    <div class="card-container">
      <Card
        title="Medidores Activos"
        :value="totalMedidores"
        icon="fas fa-tachometer-alt"
        bgColorClass="bg-white"
        enlace="dashboard/medidor"
      />
      <Card
        title="Clientes Activos"
        :value="totalClientes"
        icon="fas fa-users"
        bgColorClass="bg-light"
        enlace="dashboard/cliente"
      />
      <Card
        title="Alertas de Consumo"
        :value="totalAlertas"
        icon="fas fa-exclamation-triangle"
        bgColorClass="bg-light"
        enlace="dashboard/alertas"
      />
      <Card
        title="Usuarios"
        :value="totalUsuarios"
        icon="fas fa-user-friends"
        bgColorClass="bg-light"
        enlace="dashboard/usuario"
      />
    </div>

    <div class="statics-container">
      <h3 class="statistics-title">Estadísticas de Consumo de Agua por mes</h3>
      <div class="stats-panel">
        <h3>Estadísticas del Medidor</h3>
        <div v-if="medidorSeleccionado">
          <p><b>Nombre:</b> {{ medidorSeleccionado.name }}</p>
          <p><b>Estado:</b> {{ medidorSeleccionado.estado }}</p>
          <canvas ref="lineChart" class="estadistica"></canvas>
        </div>
        <p v-else>Seleccione un medidor en el mapa para ver estadísticas.</p>
      </div>
      <div class="filtrar"></div>
      <div class="map-panel">
        <h3>Ubicación del Medidor</h3>

        <div class="search-container">
          <input
            type="number"
            v-model="medidorId"
            placeholder="ID del medidor"
          />
          <button @click="buscarMedidor">Buscar</button>
        </div>

        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { Chart, registerables } from "chart.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

Chart.register(...registerables);

export default {
  name: "Dashboard",
  components: {
    Card,
  },
  data() {
    return {
      totalMedidores: 120,
      totalClientes: 300,
      totalAlertas: 25,
      totalUsuarios: 50,
      medidores: [],
      medidorSeleccionado: null,
      medidorId: "",
      map: null,
      markersLayer: null,
      lineChart: null,
    };
  },
  methods: {
    async cargarDatosExternos() {
      try {
        const response = await fetch("/data/medidores.json");
        const data = await response.json();

        // Asegurar que se asigna correctamente el array
        if (Array.isArray(data.medidores)) {
          this.medidores = data.medidores;
        } else {
          console.error(
            "Error: La estructura del JSON no contiene un array de medidores."
          );
        }

        console.log("Datos cargados correctamente:", this.medidores);

        // Una vez cargados los datos, agregamos los marcadores
        this.agregarMarcadores();
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    },
    initMap() {
      this.map = L.map("map").setView([-1.8312, -78.1834], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(this.map);

      this.markersLayer = L.markerClusterGroup();
      this.agregarMarcadores();
      this.map.addLayer(this.markersLayer);
    },
    agregarMarcadores() {
      if (!Array.isArray(this.medidores)) {
        console.error("Error: this.medidores no es un array");
        return;
      }

      this.markersLayer.clearLayers(); // Limpiar los marcadores previos

      this.medidores.forEach((medidor) => {
        const marker = L.marker([medidor.lat, medidor.lng]).bindPopup(`
      <b>${medidor.name}</b><br>
      Estado: ${medidor.estado}<br>
      <a href="/dashboard/medidor">Ir a Medidores</a>
    `);

        marker.on("click", () => {
          this.mostrarEstadisticas(medidor.id); // 🔥 ACTUALIZAR ESTADÍSTICAS AL CLICKEAR UN MEDIDOR
        });

        this.markersLayer.addLayer(marker);
      });

      this.map.addLayer(this.markersLayer);
    },

    buscarMedidor() {
      const medidor = this.medidores.find((m) => m.id == this.medidorId);
      if (medidor) {
        this.map.setView([medidor.lat, medidor.lng], 14);
        this.mostrarEstadisticas(medidor.id);
      } else {
        alert("Medidor no encontrado");
      }
    },
    mostrarEstadisticas(medidorId) {
      this.medidorSeleccionado = this.medidores.find((m) => m.id == medidorId);
      if (this.medidorSeleccionado) {
        this.$nextTick(() => {
          // 🔥 ESPERAR QUE VUE ACTUALICE EL DOM
          this.actualizarGrafico();
        });
      }
    },
    actualizarGrafico() {
      if (!this.medidorSeleccionado) return;

      this.$nextTick(() => {
        // 🔥 ASEGURAR QUE EL CANVAS ESTÁ DISPONIBLE
        const ctx = this.$refs.lineChart.getContext("2d");
        if (this.lineChart) {
          this.lineChart.destroy(); // 🔥 ELIMINAR EL GRÁFICO ANTERIOR
        }

        this.lineChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
            datasets: [
              {
                label: "Consumo de Agua",
                data: this.medidorSeleccionado.consumo, // 🔥 USAR LOS DATOS DEL MEDIDOR SELECCIONADO
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                fill: true,
              },
            ],
          },
          options: { responsive: true, maintainAspectRatio: false },
        });
      });
    },
  },
  mounted() {
    this.initMap();
    this.cargarDatosExternos(); // Cargar JSON al iniciar
  },
};
</script>

<style scoped>
/* Fondo animado con gradiente */
.dashboard {
  background: linear-gradient(135deg, rgb(189, 234, 255), rgb(111, 204, 240));
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  padding: 2%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Encabezado del Dashboard */
.header {
  text-align: center;
  margin-bottom: 5%;
  color: white;
  animation: fadeInDown 1s ease-out;
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
}

.header p {
  font-size: 1.5rem;
  font-weight: 400;
}

/* Contenedor de tarjetas */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
  gap: 20px;
}

.card-container > * {
  flex: 1 1 calc(25% - 20px);
  max-width: 300px;
  min-width: 250px;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  border-radius: 12px;
}

.card-container > *:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background-color: skyblue; /* Color de fondo al pasar el cursor */
  color: white; /* Color del texto al pasar el cursor */
}

/* estadisticas e interaccion con el mapa */
/* Contenedor principal de estadísticas y mapa */
.statics-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Panel de estadísticas */
.stats-panel {
  flex: 1;
  min-width: 350px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Estilo del título */
.statistics-title,
.stats-panel h3,
.map-panel h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

/* Estilos del gráfico */
.estadistica {
  width: 100%;
  height: 300px !important;
}

/* Panel del mapa */
.map-panel {
  flex: 1;
  min-width: 350px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Contenedor de búsqueda */
.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.search-container input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.search-container button {
  padding: 8px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-container button:hover {
  background: #0056b3;
}

/* Estilo del mapa */
#map {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

/* Media Queries para pantallas más pequeñas */
@media (max-width: 1400px) {
  .card-container > * {
    flex: 1 1 calc(33.33% - 20px);
  }
}

@media (max-width: 1024px) {
  .card-container > * {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .card-container > * {
    flex: 1 1 100%;
  } /* Una columna en móviles */
}

/* Animaciones */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
