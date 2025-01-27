<template>
  <div class="content">
    <!-- Encabezado y botón para abrir el modal del formulario -->
    <div class="header-container">
      <h1>Medidores</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Medidor</button>
      </div>
    </div>
    
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Medidor</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="meterId" class="title">ID del Medidor</label>
            <input type="text" id="meterId" v-model="currentMeter.idMeter" />
          </div>
          <div class="form-group">
            <label for="meterName" class="title">Nombre del Medidor</label>
            <input type="text" id="meterName" v-model="currentMeter.name" />
          </div>
          <div class="form-group">
            <label for="meterLocation" class="title">Ubicación</label>
            <input type="text" id="meterLocation" v-model="currentMeter.location" />
          </div>
          <div class="form-group">
            <label for="meterType" class="title">Tipo de Medidor</label>
            <input type="text" id="meterType" v-model="currentMeter.type" />
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
            <th>ID del Medidor</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meter in meters" :key="meter.idMeter">
            <td>{{ meter.idMeter }}</td>
            <td>{{ meter.name }}</td>
            <td>{{ meter.location }}</td>
            <td>{{ meter.type }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(meter.idMeter)"></i>
              <i class="fas fa-edit" @click="editMeter(meter.idMeter)"></i>
              <i class="fas fa-trash-alt" @click="confirmDelete(meter.idMeter)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para el formulario de agregar/editar -->
    <Modal
      v-if="showFormModal"
      :show="showFormModal"
      :title="editing ? 'Editar Medidor' : 'Agregar Medidor'"
      @cancel="closeFormModal"
    >
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="form-group">
          <label for="name">Nombre del Medidor</label>
          <input
            type="text"
            id="name"
            v-model="currentMeter.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="location">Ubicación</label>
          <input
            type="text"
            id="location"
            v-model="currentMeter.location"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="type">Tipo de Medidor</label>
          <input
            type="text"
            id="type"
            v-model="currentMeter.type"
            class="form-control"
            required
          />
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">
            {{ editing ? "Guardar" : "Agregar" }}
          </button>
          <button type="button" @click="closeFormModal" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>

    <!-- Detalle del Medidor -->
    <div v-if="selectedMeter" class="meter-details-container">
      <div class="meter-details">
        <h2>Detalle del Medidor</h2>
        <p><strong>ID del Medidor:</strong> {{ selectedMeter.idMeter }}</p>
        <p><strong>Nombre:</strong> {{ selectedMeter.name }}</p>
        <p><strong>Ubicación:</strong> {{ selectedMeter.location }}</p>
        <p><strong>Tipo:</strong> {{ selectedMeter.type }}</p>
        <button @click="selectedMeter = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  name: "Meter",
  components: {
    Modal,
  },
  data() {
    return {
      meters: [], // Lista de medidores
      currentMeter: {
        idMeter: "",
        name: "",
        location: "",
        type: "",
      },
      editing: false,
      showFormModal: false, // Controla si el modal del formulario está visible
      selectedMeter: null, // Controla si hay un medidor seleccionado para mostrar detalles
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    // Cargar datos predefinidos
    loadDummyData() {
      this.meters = [
        {
          idMeter: "1",
          name: "Medidor 1",
          location: "Zona A",
          type: "Tipo A",
        },
        {
          idMeter: "2",
          name: "Medidor 2",
          location: "Zona B",
          type: "Tipo B",
        },
      ];
    },
    // Mostrar el modal del formulario para agregar
    showAddForm() {
      this.resetForm();
      this.showFormModal = true;
    },
    // Configurar el formulario para editar un Medidor
    editMeter(id) {
      this.editing = true;
      this.currentMeter = { ...this.meters.find(meter => meter.idMeter === id) };
      this.showFormModal = true;
    },
    // Guardar o agregar un Medidor
    submitForm() {
      if (this.editing) {
        const index = this.meters.findIndex(meter => meter.idMeter === this.currentMeter.idMeter);
        if (index !== -1) this.meters[index] = { ...this.currentMeter };
      } else {
        this.currentMeter.idMeter = (this.meters.length + 1).toString();
        this.meters.push({ ...this.currentMeter });
      }
      this.closeFormModal();
    },
    // Cerrar el modal del formulario
    closeFormModal() {
      this.resetForm();
      this.showFormModal = false;
    },
    // Reiniciar el formulario
    resetForm() {
      this.currentMeter = {
        idMeter: "",
        name: "",
        location: "",
        type: "",
      };
      this.editing = false;
    },
    // Mostrar detalles de un Medidor
    viewDetails(id) {
      this.selectedMeter = this.meters.find(meter => meter.idMeter === id);
    },
    // Confirmar eliminación de un Medidor
    confirmDelete(id) {
      this.meters = this.meters.filter(meter => meter.idMeter !== id);
    },
  },
};
</script>

<style src="../assets/css/AñadirMedidor.css"></style>