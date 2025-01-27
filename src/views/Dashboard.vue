<template>
  <h1>Bienvenido a Pet Pocket</h1>
  <p>Una herramienta para gestión de veterinarios</p>
  <div class="card-container">
    <Card
      title="Total Usuarios"
      :value="totalUsuarios"
      icon="fas fa-user-circle"
      bgColorClass="bg-orange"
      enlace="dashboard/usuarios"
    />
    <Card
      title="Total de Mascotas"
      :value="totalMascotas"
      icon="fa-solid fa-dog"
      bgColorClass="bg-light-orange"
      enlace="dashboard/mascotas"
    />
    <Card
      title="Total Vacunas"
      :value="totalVacunas"
      icon="fa-solid fa-syringe"
      bgColorClass="bg-brown"
      enlace="dashboard/vacunas"
    />
    <Card
      title="Total Adopciones"
      :value="totalAdopciones"
      icon="fa-solid fa-shield-dog"
      bgColorClass="bg-yellow"
      enlace="dashboard/adopciones"
    />
  </div>

  <h3>Usuarios y Mascotas registradas</h3>
  <canvas ref="lineChart" class="estadistica"> </canvas>
  <h3>tipos de mascotas</h3>
  <canvas ref="barChart" class="estadistica"></canvas>
</template>

<script>
import Card from "../components/Card.vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "Dashboard",
  components: {
    Card,
  },
  data() {
    return {
      totalUsuarios: 20, // Datos quemados
      totalMascotas: 50,
      totalVacunas: 30,
      totalAdopciones: 15,
      lineChart: null,
      barChart: null,
      lineChartData: {
        pageViews: [], // Usuarios registrados simulados durante 7 días
        visitors: [], // Mascotas registradas simuladas durante 7 días
      },
      barChartData: {
        labels: ["Perros", "Gatos", "Aves"], // Tipos de mascotas
        data: [20, 25, 5], // Cantidad por tipo
      },
    };
  },
  methods: {
    fetchData() {
      // Generar datos simulados para los últimos 7 días
      this.lineChartData.pageViews = this.simulateDailyData(this.totalUsuarios);
      this.lineChartData.visitors = this.simulateDailyData(this.totalMascotas);

      // Crear gráficos
      this.createLineChart();
      this.createBarChart();
    },
    simulateDailyData(total) {
      const dailyData = [];
      let cumulative = 0;

      for (let i = 0; i < 7; i++) {
        const dailyIncrement = Math.floor(total / 7) + Math.random() * 5;
        cumulative += dailyIncrement;
        dailyData.push(Math.min(cumulative, total));
      }

      return dailyData;
    },
    createLineChart() {
      const ctx = this.$refs.lineChart.getContext("2d");

      if (this.lineChart) {
        this.lineChart.destroy();
      }

      const labels = this.getLast7Days();

      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Usuarios Registrados",
              data: this.lineChartData.pageViews,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              fill: true,
              lineTension: 0.4,
            },
            {
              label: "Mascotas Registradas",
              data: this.lineChartData.visitors,
              borderColor: "green",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              fill: true,
              lineTension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
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
              display: true,
              title: {
                display: true,
                text: "Fecha",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Cantidad",
              },
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
              label: "Tipos de Mascotas",
              data: this.barChartData.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // Red
                "rgba(255, 159, 64, 0.2)", // Orange
                "rgba(75, 192, 192, 0.2)", // Green
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
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
              title: {
                display: true,
                text: "Total Mascotas",
              },
            },
          },
        },
      });
    },
    getLast7Days() {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.estadistica {
  width: 90%;
  margin: auto;
  margin-top: 50px;
}
h3 {
  width: 94%;
  background-color: orange;
  color: white;
  margin: auto;
  text-align: center;
  padding: 10px;
  margin-bottom: 50px;
  margin-top: 50px;
}
.card-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
}
@media (max-width: 700px) {
  .card-container {
    flex-direction: column;
  }
  .card-container * {
    width: 90%;
    flex: 1;
    margin-top: 20px;
  }
}
</style>
<!-- name: "Dashboard", -->
