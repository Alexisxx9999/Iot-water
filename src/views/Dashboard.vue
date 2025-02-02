<template>
  <div class="dashboard">
    <header class="header">
      <h1>
        Bienvenido, <em>{{ username }}</em>
      </h1>
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

    <h3 class="statistics-title">Estadísticas de Consumo de Agua por mes</h3>
    <div class="charts">
      <div class="chart-container">
        <canvas ref="lineChart" class="estadistica"></canvas>
      </div>
      <div class="chart-container">
        <canvas ref="barChart" class="estadistica"></canvas>
      </div>
    </div>

    <h3 class="h3">Ubicación del Medidor</h3>

    <div class="search-container">
      <input type="number" id="medidorId" placeholder="ID del medidor" />
      <button id="buscarMedidor">Buscar Medidor</button>
    </div>

    <div id="map"></div>
    <!-- Mapa interactivo -->
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
      username: "Usuario",
      totalMedidores: 120,
      totalClientes: 300,
      totalAlertas: 25,
      totalUsuarios: 50,
      lineChart: null,
      barChart: null,
      map: null,
      markersLayer: null,
      medidores: [
        {
          id: 1,
          name: "Medidor A",
          lat: -1.8312,
          lng: -78.1834,
          estado: "activo",
        },
        {
          id: 2,
          name: "Medidor B",
          lat: -2.1503,
          lng: -79.8836,
          estado: "inactivo",
        },
        {
          id: 3,
          name: "Medidor C",
          lat: -0.1807,
          lng: -78.4678,
          estado: "activo",
        },
      ],
    };
  },
  methods: {
    fetchData() {
      this.createLineChart();
      this.createBarChart();
    },
    createLineChart() {
      const ctx = this.$refs.lineChart.getContext("2d");
      if (this.lineChart) this.lineChart.destroy();

      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
          ],
          datasets: [
            {
              label: "Consumo de Agua",
              data: [200, 150, 250, 300, 100, 400, 350],
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              fill: true,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    },
    createBarChart() {
      const ctx = this.$refs.barChart.getContext("2d");
      if (this.barChart) this.barChart.destroy();

      this.barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
          ],
          datasets: [
            {
              label: "Consumo de Agua (litros)",
              data: [200, 150, 250, 300, 100, 400, 350],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    },
    initMap() {
      this.map = L.map("map").setView([-1.8312, -78.1834], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(this.map);

      this.markersLayer = L.markerClusterGroup();
      this.addMarkers();

      this.map.addLayer(this.markersLayer);

      document.getElementById("buscarMedidor").addEventListener("click", () => {
        this.buscarMedidor();
      });
    },

    addMarkers() {
      const iconActivo = L.icon({
        iconUrl: "activo-icon.png",
        iconSize: [32, 32],
      });

      const iconInactivo = L.icon({
        iconUrl: "inactivo-icon.png",
        iconSize: [32, 32],
      });

      this.medidores.forEach((medidor) => {
        const marker = L.marker([medidor.lat, medidor.lng], {
          icon: medidor.estado === "activo" ? iconActivo : iconInactivo,
        });

        const popupContent = `
        <b>${medidor.name}</b><br>
        Estado: ${medidor.estado}<br>
        <a href="/dashboard/medidor" class="ver-detalle" data-id="${medidor.id}">Ver Detalle</a>
      `;

        marker.bindPopup(popupContent);
        this.markersLayer.addLayer(marker);
      });

      // Manejar clics en enlaces dentro de los popups
      this.map.on("popupopen", (e) => {
        const link = e.popup._contentNode.querySelector(".ver-detalle");
        if (link) {
          link.addEventListener("click", (event) => {
            event.preventDefault();
            const medidorId = link.getAttribute("data-id");
            this.verDetalleMedidor(medidorId);
          });
        }
      });
    },

    buscarMedidor() {
      const medidorId = parseInt(document.getElementById("medidorId").value);
      const medidor = this.medidores.find((m) => m.id === medidorId);

      if (medidor) {
        this.map.setView([medidor.lat, medidor.lng], 14);
        L.popup()
          .setLatLng([medidor.lat, medidor.lng])
          .setContent(
            `
          <b>${medidor.name}</b><br>
          Estado: ${medidor.estado}<br>
          <a href="/dashboard/medidor" class="ver-detalle" data-id="${medidor.id}">Ver Detalle</a>
        `
          )
          .openOn(this.map);
      } else {
        alert("Medidor no encontrado");
      }
    },

    verDetalleMedidor(medidorId) {
      this.$router.push({ path: `dashboard/medidor` });
    },
  },
  mounted() {
    this.fetchData();
    this.initMap();
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

.statistics-title {
  color: white;
  animation: fadeInUp 1s ease-out;
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

/* Gráficas */
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  margin: 30px 0;
}

.chart-container {
  flex: 1;
  min-width: 300px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInUp 1s ease-out;
}

.estadistica {
  height: 250px;
  width: 100%;
}

/* Mapa */
#map {
  width: 100%;
  max-width: 900px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  animation: fadeInUp 1s ease-out;
}

/* Contenedor del buscador */
.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  animation: fadeInUp 1s ease-out;
}

/* Campo de entrada */
#medidorId {
  padding: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
  outline: none;
}

/* Efecto de enfoque */
#medidorId:focus {
  border-color: #0056b3;
}

/* Botón de búsqueda */
#buscarMedidor {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

/* Efecto hover */
#buscarMedidor:hover {
  background-color: #0056b3;
}

.h3 {
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  font-size: 1.8rem;
  margin-bottom: 15px;
  animation: fadeInUp 1s ease-out;
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