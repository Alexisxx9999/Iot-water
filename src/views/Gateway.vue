<template>
  <div class="content">
    <!-- Encabezado y botón para abrir el modal del formulario -->
    <div class="header-container">
      <h1>Gateways</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Gateway</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} adopcion 😸</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="idgateway" class="title">Información adicional</label>
            <input type="text" id="idgateway" required />
          </div>
          <div class="form-group">
            <label for="idgateway" class="title">Información adicional</label>
            <input type="text" id="idgateway" />
          </div>
          <div class="form-group">
            <label for="idgateway" class="title">Información adicional</label>
            <input type="text" id="idgateway" />
          </div>
          <div class="form-group">
            <label for="idgateway" class="title">Información adicional</label>
            <input type="text" id="idgateway" />
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-primary">
              {{ editing ? "Guardar" : "Agregar" }}
            </button>
            <button type="button" @click="cancelEdit" class="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha de Instalación</th>
            <th><i class="fas fa-cogs"></i> Nombre del Gateway</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-plug"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gateway in gateways" :key="gateway.idGateway">
            <td>{{ gateway.installDate }}</td>
            <td>{{ gateway.name }}</td>
            <td>{{ gateway.location }}</td>
            <td>{{ gateway.status }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(gateway.idGateway)"></i>
              <i
                class="fas fa-edit"
                @click="editGateway(gateway.idGateway)"
              ></i>
              <i
                class="fas fa-trash-alt"
                @click="confirmDelete(gateway.idGateway)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para el formulario de agregar/editar (del primer código) -->
    <Modal
      v-if="showFormModal"
      :show="showFormModal"
      :title="editing ? 'Editar Gateway' : 'Agregar Gateway'"
      @cancel="closeFormModal"
      @confirm="submitForm"
    >
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="form-group">
          <label for="name">Nombre del Gateway</label>
          <input
            type="text"
            id="name"
            v-model="currentGateway.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="installDate">Fecha de Instalación</label>
          <input
            type="date"
            id="installDate"
            v-model="currentGateway.installDate"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="location">Ubicación</label>
          <input
            type="text"
            id="location"
            v-model="currentGateway.location"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="status">Estado</label>
          <select
            id="status"
            v-model="currentGateway.status"
            class="form-control"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">
            {{ editing ? "Guardar" : "Agregar" }}
          </button>
          <button
            type="button"
            @click="closeFormModal"
            class="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>

    <!-- Detalle del Gateway -->
    <div v-if="selectedGateway" class="gateway-details-container">
      <div class="gateway-details">
        <h2>Detalle del Gateway</h2>
        <p>
          <strong>Fecha de Instalación:</strong>
          {{ selectedGateway.installDate }}
        </p>
        <p><strong>Nombre:</strong> {{ selectedGateway.name }}</p>
        <p><strong>Ubicación:</strong> {{ selectedGateway.location }}</p>
        <p><strong>Estado:</strong> {{ selectedGateway.status }}</p>
        <button @click="selectedGateway = null" class="back-button">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  name: "Gateway",
  components: {
    Modal,
  },
  data() {
    return {
      gateways: [],
      currentGateway: {
        idGateway: "",
        name: "",
        location: "",
        ipAddress: "",
        status: "activo",
        installDate: "",
        description: "",
      },
      editing: false,
      showFormModal: false,
      selectedGateway: null,
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    loadDummyData() {
      this.gateways = [
        {
          idGateway: "1",
          name: "Gateway 1",
          location: "Zona A",
          ipAddress: "192.168.0.1",
          status: "activo",
          installDate: "2025-01-20",
          description: "Gateway principal de la zona A",
        },
        {
          idGateway: "2",
          name: "Gateway 2",
          location: "Zona B",
          ipAddress: "192.168.0.2",
          status: "inactivo",
          installDate: "2025-01-22",
          description: "Gateway auxiliar en la zona B",
        },
      ];
    },
    showAddForm() {
      this.resetForm();
      this.showFormModal = true;
    },
    editGateway(id) {
      this.editing = true;
      this.currentGateway = {
        ...this.gateways.find((gateway) => gateway.idGateway === id),
      };
      this.showFormModal = true;
    },
    submitForm() {
      if (this.editing) {
        const index = this.gateways.findIndex(
          (gateway) => gateway.idGateway === this.currentGateway.idGateway
        );
        if (index !== -1) this.gateways[index] = { ...this.currentGateway };
      } else {
        this.currentGateway.idGateway = (this.gateways.length + 1).toString();
        this.gateways.push({ ...this.currentGateway });
      }
      this.closeFormModal();
    },
    closeFormModal() {
      this.resetForm();
      this.showFormModal = false;
    },
    resetForm() {
      this.currentGateway = {
        idGateway: "",
        name: "",
        location: "",
        ipAddress: "",
        status: "activo",
        installDate: "",
        description: "",
      };
      this.editing = false;
    },
    viewDetails(id) {
      this.selectedGateway = this.gateways.find(
        (gateway) => gateway.idGateway === id
      );
    },
    confirmDelete(id) {
      this.gateways = this.gateways.filter(
        (gateway) => gateway.idGateway !== id
      );
    },
  },
};
</script>

<style src="../assets/css/AñadirGateway.css"></style>
