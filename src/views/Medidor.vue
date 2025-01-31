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
    <!-- agregar y editar medidores -->
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Medidor</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="meterId" class="title">ID del Medidor</label>
            <input type="number" id="meterId" v-model="currentMeter.idMeter" />
          </div>
          <div class="form-group">
            <label for="meterName" class="title">Codigo </label>
            <input type="number" id="meterName" v-model="currentMeter.name" />
          </div>
          <div class="form-group">
            <label for="meterLocation" class="title">Ubicación</label>
            <input
              type="text"
              id="meterLocation"
              v-model="currentMeter.location"
            />
          </div>
          <div class="form-group">
            <label for="meterType" class="title">Modelo</label>
            <input type="text" id="meterType" v-model="currentMeter.type" />
          </div>
          <div class="form-group">
            <label for="id_cliente" class="title">id_cliente</label>
            <input
              type="number"
              id="id_cliente"
              v-model="currentMeter.id_cliente"
            />
          </div>
          <div class="form-group">
            <label for="id_gateway" class="title">id_gateway</label>
            <input
              type="number"
              id="id_gateway"
              v-model="currentMeter.id_gateway"
            />
          </div>
          <div class="form-group">
            <label for="estado" class="title">estado</label>
            <input type="text" id="estado" v-model="currentMeter.estado" />
          </div>
          <div class="form-group">
            <label for="fecha" class="title">fecha de instalacion</label>
            <input
              type="text"
              id="fecha"
              v-model="currentMeter.fecha_instalacion"
            />
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
    <!-- tabla de medidores -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID del Medidor</th>
            <th>Codigo</th>
            <th>Ubicación</th>
            <th>Modelo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meter in meters" :key="meter.idMeter">
            <td>{{ meter.idMeter }}</td>
            <td>{{ meter.name }}</td>
            <td>{{ meter.location }}</td>
            <td>{{ meter.type }}</td>
            <td>{{ meter.estado }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(meter.idMeter)"></i>
              <i class="fas fa-edit" @click="editMeter(meter.idMeter)"></i>
              <i
                class="fas fa-trash-alt"
                @click="confirmDelete(meter.idMeter)"
              ></i>
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
          <label for="name">Codigo del medidor</label>
          <input
            type="number"
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
          <label for="type">Modelo</label>
          <input
            type="number"
            id="type"
            v-model="currentMeter.type"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="type">id del cliente</label>
          <input
            type="number"
            id="type"
            v-model="currentMeter.id_cliente"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="type">id del gateway</label>
          <input
            type="number"
            id="type"
            v-model="currentMeter.id_gateway"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="estado">estado</label>
          <select
            name="estado"
            id="estado"
            v-model="currentMeter.estado"
            class="form-control"
            required
          >
            <option value="activo">activo</option>
            <option value="inactivo">inactivo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type">fecha de instalacion</label>
          <input
            type="date"
            id="type"
            v-model="currentMeter.fecha_instalacion"
            class="form-control"
            required
          />
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

    <!-- Detalle del Medidor -->
    <div v-if="selectedMeter" class="meter-details-container">
      <div class="meter-details">
        <h2>Detalle del Medidor</h2>
        <p><strong>ID del Medidor:</strong> {{ selectedMeter.idMeter }}</p>
        <p><strong>Codigo</strong> {{ selectedMeter.name }}</p>
        <p><strong>Ubicación:</strong> {{ selectedMeter.location }}</p>
        <p><strong>Modelo:</strong> {{ selectedMeter.type }}</p>
        <p><strong>id_gateway:</strong> {{ selectedMeter.id_gateway }}</p>
        <p><strong>id_cliente:</strong> {{ selectedMeter.id_cliente }}</p>
        <p><strong>Estado:</strong> {{ selectedMeter.estado }}</p>
        <p>
          <strong>Fecha de instalacion:</strong>
          {{ selectedMeter.fecha_instalacion }}
        </p>
        <button @click="selectedMeter = null" class="back-button">
          Cerrar
        </button>
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
        id_cliente: "",
        id_gateway: "",
        estado: "",
        fecha_instalacion: "",
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
          estado: "activo",
          id_gateway: "23",
          id_cliente: "21312",
          fecha_instalacion: "2024-08-9",
        },
        {
          idMeter: "2",
          name: "Medidor 2",
          location: "Zona B",
          type: "Tipo B",
          estado: "inactivo",
          id_gateway: "1000",
          id_cliente: "1000",
          fecha_instalacion: "2024-08-9",
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
      this.currentMeter = {
        ...this.meters.find((meter) => meter.idMeter === id),
      };
      this.showFormModal = true;
    },
    // Guardar o agregar un Medidor
    submitForm() {
      if (this.editing) {
        const index = this.meters.findIndex(
          (meter) => meter.idMeter === this.currentMeter.idMeter
        );
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
      this.selectedMeter = this.meters.find((meter) => meter.idMeter === id);
    },
    // Confirmar eliminación de un Medidor
    confirmDelete(id) {
      this.meters = this.meters.filter((meter) => meter.idMeter !== id);
    },
  },
};
</script>

<style src="../assets/css/AñadirMedidor.css"></style>
