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
            },
            {
              label: "Alertas de Consumo",
              data: this.lineChartData.alertasMensuales,
              borderColor: "#dc3545",
              backgroundColor: "rgba(220, 53, 69, 0.1)",
              fill: true,
              lineTension: 0.4,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1000, // Animación al cargar
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
          animation: {
            duration: 1000, // Animación al cargar
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
      // Inicializar el mapa
      const map = L.map('map').setView([-1.8312, -78.1834], 6); // Centrar en Ecuador

      // Capa de mapa
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Marcador para la ubicación del medidor
      const marker = L.marker([-1.8312, -78.1834]).addTo(map)
        .bindPopup('Ubicación del Medidor')
        .openPopup();

      // Agregar evento al clic en el marcador
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
.dashboard {
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco y semi-transparente */
  padding: 2%; /* Espaciado interno relativo */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.2rem; /* Tamaño de fuente relativo */
}

.header p {
  font-size: 1.1rem; /* Tamaño de fuente relativo */
  color: #555;
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* Permitir que las tarjetas se envuelvan */
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-container > * {
  flex: 1 1 200px; /* Flexibilidad para adaptarse a diferentes tamaños */
  margin: 10px; /* Espacio entre tarjetas */
  transition: transform 0.3s; /* Efecto de transición */
}

.card-container > *:hover {
  transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
}

.charts {
  display: flex;
  flex-wrap: wrap; /* Permitir que las gráficas se envuelvan */
  justify-content: space-between;
  margin-top: 20px;
}

.chart-container {
  flex: 1 1 45%; /* Ocupa el 45% del ancho, permitiendo espacio */
  margin-bottom: 20px; /* Espacio entre las gráficas */
}

.estadistica {
  height: 200px; /* Altura más pequeña para las gráficas */
}

.map {
  height: 400px; /* Altura del mapa */
  width: 100%; /* Ancho completo */
  margin-top: 20px; /* Margen superior */
}

h3 {
  color: #555;
  margin: 20px 0;
  font-size: 1.5rem; /* Tamaño de fuente relativo */
  font-weight: 600;
}

/* Media Queries para Responsividad */
@media (max-width: 768px) {
  .header h1 {
    font-size: 1.8rem; /* Tamaño de fuente para pantallas pequeñas */
  }

  .header p {
    font-size: 1rem; /* Tamaño de fuente para pantallas pequeñas */
  }

  .charts {
    flex-direction: column; /* Gráficas apiladas en pantallas pequeñas */
  }

  .chart-container {
    flex: 1 1 100%; /* Cada gráfica ocupa el 100% del ancho */
  }
}

@media (min-width: 1440px) {
  .header h1 {
    font-size: 2.5rem; /* Tamaño de fuente para pantallas grandes */
  }

  .header p {
    font-size: 1.3rem; /* Tamaño de fuente para pantallas grandes */
  }
}
</style>