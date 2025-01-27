<template>
  <div class="dashboard">
    <h1>Bienvenido a IoT Water, <em>{{ username }}</em></h1>
    <p>Accesos directos y Estadísticas</p>
    
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

    <h3>Estadísticas de Consumo de Agua por mes</h3>
    <canvas ref="lineChart" class="estadistica"></canvas>
    <canvas ref="barChart" class="estadistica"></canvas>
  </div>
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
      username: "Usuario", // Cambia esto según sea necesario
      totalMedidores: 120, // Datos simulados
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
        data: [200, 150, 250, 300, 100, 400, 350], // Consumo de agua por mes
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
            },
            {
              label: "Alertas de Consumo",
              data: this.lineChartData.alertasMensuales,
              borderColor: "#dc3545",
              backgroundColor: "rgba(220, 53, 69, 0.1)",
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}

.card-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.card-container > * {
  margin: 10px; /* Espaciado entre tarjetas */
  flex: 1 1 200px; /* Flexível para adaptarse a diferentes tamaños de pantalla */
}

.estadistica {
  width: 90%;
  margin: auto;
  margin-top: 30px;
}

h3 {
  color: #555;
  margin: 30px 0;
  font-size: 24px;
  font-weight: 600;
}
</style>