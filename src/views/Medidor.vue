<template>
  <div class="content">
    <div class="header-container">
      <h1>Medidores</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Medidor</button>
      </div>
    </div>

    <!-- Formulario de Medidor -->
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Medidor</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <!-- Nombre del Medidor -->
          <div class="form-group">
            <label for="idgateway" class="title">Información adicional</label>
            <input type="text" id="idgateway" />
          </div>
          <!-- Ubicación -->
          <div class="form-group">
            <label for="idgateway" class="title">Información adicional</label>
            <input type="text" id="idgateway" />
          </div>
          <!-- Estado -->
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

    <!-- Tabla de Medidores -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha de Instalación</th>
            <th><i class="fas fa-cogs"></i> Nombre del Medidor</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-plug"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medidor in medidores" :key="medidor.idMedidor">
            <td>{{ medidor.installDate }}</td>
            <td>{{ medidor.name }}</td>
            <td>{{ medidor.location }}</td>
            <td>{{ medidor.status }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(medidor.idMedidor)"></i>
              <i class="fas fa-edit" @click="editMedidor(medidor.idMedidor)"></i>
              <i class="fas fa-trash-alt" @click="confirmDelete(medidor.idMedidor)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botón para regresar -->
    <button @click="goBack" class="back-button">Regresar</button>

    <!-- Modal para confirmación de eliminación -->
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que quieres eliminar este Medidor?"
      @confirm="deleteMedidor(medidorToDelete)"
      @cancel="cancelDelete"
    />

    <!-- Detalle de Medidor -->
    <div v-if="selectedMedidor" class="medidor-details-container">
      <div class="medidor-details">
        <h2>Detalle del Medidor</h2>
        <p><strong>Fecha de Instalación:</strong> {{ selectedMedidor.installDate }}</p>
        <p><strong>Ubicación:</strong> {{ selectedMedidor.location }}</p>
        <p><strong>Estado:</strong> {{ selectedMedidor.status }}</p>

        <h4>Información adicional del Medidor</h4>
        <div class="additional-info">
          <p><strong>Descripción:</strong> {{ selectedMedidor.description }}</p>
        </div>

        <button @click="selectedMedidor = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  name: "Medidor",
  components: {
    Modal,
  },
  data() {
    return {
      medidores: [],
      currentMedidor: {
        idMedidor: "",
        name: "",
        location: "",
        status: "activo",
        installDate: "",
        description: "",
      },
      editing: false,
      showForm: false,
      selectedMedidor: null,
      showModal: false,
      medidorToDelete: null,
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    loadDummyData() {
      // Datos de medidores "quemados"
      this.medidores = [
        { idMedidor: "1", name: "Medidor 1", location: "Zona A", status: "activo", installDate: "2025-01-20", description: "Medidor principal de la zona A" },
        { idMedidor: "2", name: "Medidor 2", location: "Zona B", status: "inactivo", installDate: "2025-01-22", description: "Medidor auxiliar en la zona B" },
      ];
    },
    submitForm() {
      // Función para agregar o editar medidor
      if (this.editing) {
        const index = this.medidores.findIndex(medidor => medidor.idMedidor === this.currentMedidor.idMedidor);
        if (index !== -1) {
          this.medidores[index] = { ...this.currentMedidor }; // Actualizar
        }
      } else {
        this.currentMedidor.idMedidor = (this.medidores.length + 1).toString(); // Asignar nuevo ID
        this.currentMedidor.installDate = new Date().toISOString().slice(0, 10); // Fecha actual
        this.medidores.push({ ...this.currentMedidor }); // Agregar nuevo
      }
      this.resetForm();
    },
    resetForm() {
      this.currentMedidor = {
        idMedidor: "",
        name: "",
        location: "",
        status: "activo",
        installDate: "",
        description: "",
      };
      this.showForm = false;
      this.editing = false;
    },
    showAddForm() {
      this.resetForm();
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    viewDetails(id) {
      this.selectedMedidor = this.medidores.find(medidor => medidor.idMedidor === id);
    },
    editMedidor(id) {
      this.editing = true;
      this.currentMedidor = { ...this.medidores.find(medidor => medidor.idMedidor === id) };
      this.showForm = true;
    },
    confirmDelete(id) {
      this.medidorToDelete = id;
      this.showModal = true;
    },
    deleteMedidor(id) {
      this.medidores = this.medidores.filter(medidor => medidor.idMedidor !== id);
      this.showModal = false;
      this.medidorToDelete = null;
    },
    cancelDelete() {
      this.showModal = false;
      this.medidorToDelete = null;
    },
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style src="../assets/css/AñadirMedidor.css"></style>