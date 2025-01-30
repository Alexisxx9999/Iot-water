<template>
  <div class="dashboard">
    <header class="header">
      <h1>Bienvenido, <em>{{ username }}</em></h1>
      <p>Accesos directos y estadísticas</p>
    </header>

    <div class="card-container">
      <Card
        title="Medidores Activos"
        :value="totalMedidores"
        icon="fas fa-tachometer-alt"
        bgColorClass="bg-light"
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

    <h3>Ubicación del Medidor</h3>
    <div id="map" class="map"></div> <!-- Mapa interactivo -->
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { Chart, registerables } from "chart.js";
import L from 'leaflet'; // Importar Leaflet
import 'leaflet/dist/leaflet.css'; // Importar estilos de Leaflet

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
      lineChartData: {
        consumoMensual: [],
        alertasMensuales: [],
      },
      barChartData: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        data: [200, 150, 250, 300, 100, 400, 350],
      },
    };
  },
  methods: {
    fetchData() {
      this.lineChartData.consumoMensual = this.simulateMonthlyData(this.totalMedidores);
      this.lineChartData.alertasMensuales = this.simulateMonthlyData(this.totalAlertas);
      this.createLineChart();
      this.createBarChart();
    },
    simulateMonthlyData(total) {
      const monthlyData = [];
      for (let i = 0; i < 7; i++) {
        const monthlyIncrement = Math.floor(total / 7) + Math.random() * 10;
        monthlyData.push(monthlyIncrement);
      }
      return monthlyData;
    },
    createLineChart() {
      const ctx = this.$refs.lineChart.getContext("2d");
      if (this.lineChart) {
        this.lineChart.destroy();
      }
      const labels = this.getLast7Months();
      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Consumo de Agua",
              data: this.lineChartData.consumoMensual,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              fill: true,
              lineTension: 0.4,
              borderWidth: 2,
              pointRadius: 5,
            },
            {
              label: "Alertas de Consumo",
              data: this.lineChartData.alertasMensuales,
              borderColor: "#dc3545",
              backgroundColor: "rgba(220, 53, 69, 0.1)",
              fill: true,
              lineTension: 0.4,
              borderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Mes" },
            },
            y: {
              title: { display: true, text: "Consumo / Alertas" },
              beginAtZero: true,
            },
          },
        },
      });
    },
    createBarChart() {
      const ctx = this.$refs.barChart.getContext("2d");
      if (this.barChart) {
        this.barChart.destroy();
      }
      this.barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.barChartData.labels,
          datasets: [
            {
              label: "Consumo de Agua (litros)",
              data: this.barChartData.data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Litros" },
            },
          },
        },
      });
    },
    getLast7Months() {
      const months = [];
      const date = new Date();
      for (let i = 6; i >= 0; i--) {
        date.setMonth(date.getMonth() - 1);
        months.push(date.toLocaleString('default', { month: 'long' }));
      }
      return months.reverse();
    },
    initMap() {
      const map = L.map('map').setView([-1.8312, -78.1834], 6); // Centrar en Ecuador

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      const marker = L.marker([-1.8312, -78.1834]).addTo(map)
        .bindPopup('Ubicación del Medidor')
        .openPopup();

      marker.on('click', function() {
        alert('Este es el marcador para la ubicación del medidor.');
      });
    },
  },
  mounted() {
    this.fetchData();
    this.initMap(); // Inicializar el mapa al montar el componente
  },
};
</script>

<style scoped>
/* Fondo animado con gradiente */
.dashboard {
  background: linear-gradient(135deg, #c4c4c4, #0281ff);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  padding: 2%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  min-height: 100vh; /* Cubrir toda la pantalla */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Encabezado del Dashboard */
.header {
  text-align: center;
  margin-bottom: 5%; /* Ajuste en porcentaje para ser relativo al tamaño de la pantalla */
  color: white;
}

.header h1 {
  font-size: 3rem; /* Tamaño base para pantallas grandes */
  font-weight: 700;
}

.header p {
  font-size: 1.5rem; /* Tamaño base para pantallas grandes */
  font-weight: 400;
}

/* Media Queries para tamaños de pantallas más pequeñas */
@media (max-width: 1400px) {
  .header h1 { font-size: 2.8rem; }
  .header p { font-size: 1.4rem; }
}

@media (max-width: 1200px) {
  .header h1 { font-size: 2.5rem; }
  .header p { font-size: 1.3rem; }
}

@media (max-width: 1024px) {
  .header h1 { font-size: 2.2rem; }
  .header p { font-size: 1.1rem; }
}

@media (max-width: 768px) {
  .header h1 { font-size: 1.8rem; }
  .header p { font-size: 1rem; }
}

@media (max-width: 480px) {
  .header h1 { font-size: 1.6rem; }
  .header p { font-size: 0.9rem; }
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
  flex: 1 1 calc(25% - 20px); /* Cuatro columnas en pantallas grandes */
  max-width: 300px;
  min-width: 250px;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 12px;
}

.card-container > *:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Media Queries para pantallas más pequeñas */
@media (max-width: 1400px) {
  .card-container > * { flex: 1 1 calc(33.33% - 20px); }
}

@media (max-width: 1024px) {
  .card-container > * { flex: 1 1 calc(50% - 20px); }
}

@media (max-width: 768px) {
  .card-container > * { flex: 1 1 100%; } /* Una columna en móviles */
}

/* Gráficas */
.charts {
  display: flex;
  flex-wrap: nowrap; /* No permitir que se envuelvan */
  justify-content: space-between; /* Espacio entre gráficas */
  gap: 30px;
  margin: 30px 0;
}

.chart-container {
  flex: 1; /* Permite que las gráficas ocupen el mismo espacio */
  min-width: 300px; /* Ancho mínimo para evitar que se aplasten */
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex; /* Asegúrate de que el contenedor sea flex */
  align-items: center; /* Centra el contenido verticalmente */
  justify-content: center; /* Centra el contenido horizontalmente */
}

.estadistica {
  height: 250px; /* Asegúrate de que los gráficos tengan suficiente altura */
  width: 100%; /* Asegúrate de que los gráficos ocupen el ancho completo del contenedor */
}

@media (max-width: 768px) {
  .charts {
    flex-direction: column; /* Apilar gráficas en móviles */
    align-items: center;
  }

  .chart-container {
    flex: 1 1 100%; /* Una columna en móviles */
  }
}

/* Mapa */
.map {
  height: 400px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

h3 {
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  font-size: 1.8rem;
  margin-bottom: 15px;
}

/* Media Queries para pantallas grandes */
@media (max-width: 1400px) {
  .map { height: 350px; }
  h3 { font-size: 2rem; }
}

@media (max-width: 1024px) {
  .map { height: 250px; }
  h3 { font-size: 1.6rem; }
}

@media (max-width: 768px) {
  .map { height: 200px; }
  h3 { font-size: 1.4rem; }
}

@media (max-width: 480px) {
  .map { height: 180px; }
  h3 { font-size: 1.2rem; }
}
</style>