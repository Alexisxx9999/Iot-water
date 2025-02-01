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
    <input type="number" id="medidorId" placeholder="ID del medidor" />
    <button id="buscarMedidor">Buscar Medidor</button>
    <div id="map" class="map"></div>
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
      // Crear el mapa centrado en Ecuador
      this.map = L.map("map").setView([-1.8312, -78.1834], 6);

      // Añadir la capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(this.map);

      // Datos de ejemplo: lista de medidores con coordenadas
      this.medidores = [
        { id: 1, lat: -1.8312, lng: -78.1834, info: "Medidor 1 - Quito" },
        { id: 2, lat: -2.2, lng: -79.88, info: "Medidor 2 - Guayaquil" },
        { id: 3, lat: -3.99, lng: -79.2, info: "Medidor 3 - Loja" },
      ];

      // Crear marcadores y agruparlos
      this.markers = L.markerClusterGroup();
      this.medidores.forEach((medidor) => {
        let marker = L.marker([medidor.lat, medidor.lng])
          .bindPopup(medidor.info)
          .addTo(this.markers);
      });
      this.map.addLayer(this.markers);

      // Evento para buscar el medidor
      document.getElementById("buscarMedidor").addEventListener("click", () => {
        this.buscarMedidor();
      });
    },

    buscarMedidor() {
      const medidorId = parseInt(document.getElementById("medidorId").value);

      const medidor = this.medidores.find((m) => m.id === medidorId);
      if (medidor) {
        this.map.setView([medidor.lat, medidor.lng], 14); // Zoom al marcador encontrado
        L.popup()
          .setLatLng([medidor.lat, medidor.lng])
          .setContent(`Medidor encontrado: ${medidor.info}`)
          .openOn(this.map);
      } else {
        alert("Medidor no encontrado");
      }
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

        marker.bindPopup(`
          <b>${medidor.name}</b><br>
          Estado: ${medidor.estado}<br>
          <button onclick="alert('Ver detalle de ${medidor.name}')">Ver Detalle</button>
        `);

        this.markersLayer.addLayer(marker);
      });
    },
  },
  mounted() {
    this.fetchData();
    this.initMap();
  },
};
</script>

<style src="../assets/css/dashboard.css"></style>
