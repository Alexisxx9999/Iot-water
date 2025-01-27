<template>
  <div class="content">
    <!-- Encabezado y botón para abrir el modal del formulario -->
    <div class="header-container">
      <h1>Clientes</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Cliente</button>
      </div>
    </div>
    
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Cliente</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="clientId" class="title">ID del Cliente</label>
            <input type="text" id="clientId" v-model="currentClient.idClient" />
          </div>
          <div class="form-group">
            <label for="clientName" class="title">Nombre del Cliente</label>
            <input type="text" id="clientName" v-model="currentClient.name" />
          </div>
          <div class="form-group">
            <label for="clientEmail" class="title">Email del Cliente</label>
            <input type="email" id="clientEmail" v-model="currentClient.email" />
          </div>
          <div class="form-group">
            <label for="clientPhone" class="title">Teléfono del Cliente</label>
            <input type="text" id="clientPhone" v-model="currentClient.phone" />
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
            <th>ID del Cliente</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.idClient">
            <td>{{ client.idClient }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(client.idClient)"></i>
              <i class="fas fa-edit" @click="editClient(client.idClient)"></i>
              <i class="fas fa-trash-alt" @click="confirmDelete(client.idClient)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para el formulario de agregar/editar -->
    <Modal
      v-if="showFormModal"
      :show="showFormModal"
      :title="editing ? 'Editar Cliente' : 'Agregar Cliente'"
      @cancel="closeFormModal"
    >
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="form-group">
          <label for="name">Nombre del Cliente</label>
          <input
            type="text"
            id="name"
            v-model="currentClient.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="currentClient.email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            v-model="currentClient.phone"
            class="form-control"
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

    <!-- Detalle del Cliente -->
    <div v-if="selectedClient" class="client-details-container">
      <div class="client-details">
        <h2>Detalle del Cliente</h2>
        <p><strong>ID del Cliente:</strong> {{ selectedClient.idClient }}</p>
        <p><strong>Nombre:</strong> {{ selectedClient.name }}</p>
        <p><strong>Email:</strong> {{ selectedClient.email }}</p>
        <p><strong>Teléfono:</strong> {{ selectedClient.phone }}</p>
        <button @click="selectedClient = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  name: "Client",
  components: {
    Modal,
  },
  data() {
    return {
      clients: [], // Lista de clientes
      currentClient: {
        idClient: "",
        name: "",
        email: "",
        phone: "",
      },
      editing: false,
      showFormModal: false, // Controla si el modal del formulario está visible
      selectedClient: null, // Controla si hay un cliente seleccionado para mostrar detalles
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    // Cargar datos predefinidos
    loadDummyData() {
      this.clients = [
        {
          idClient: "1",
          name: "Cliente 1",
          email: "cliente1@example.com",
          phone: "123-456-7890",
        },
        {
          idClient: "2",
          name: "Cliente 2",
          email: "cliente2@example.com",
          phone: "098-765-4321",
        },
      ];
    },
    // Mostrar el modal del formulario para agregar
    showAddForm() {
      this.resetForm();
      this.showFormModal = true;
    },
    // Configurar el formulario para editar un Cliente
    editClient(id) {
      this.editing = true;
      this.currentClient = { ...this.clients.find(client => client.idClient === id) };
      this.showFormModal = true;
    },
    // Guardar o agregar un Cliente
    submitForm() {
      if (this.editing) {
        const index = this.clients.findIndex(client => client.idClient === this.currentClient.idClient);
        if (index !== -1) this.clients[index] = { ...this.currentClient };
      } else {
        this.currentClient.idClient = (this.clients.length + 1).toString();
        this.clients.push({ ...this.currentClient });
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
      this.currentClient = {
        idClient: "",
        name: "",
        email: "",
        phone: "",
      };
      this.editing = false;
    },
    // Mostrar detalles de un Cliente
    viewDetails(id) {
      this.selectedClient = this.clients.find(client => client.idClient === id);
    },
    // Confirmar eliminación de un Cliente
    confirmDelete(id) {
      this.clients = this.clients.filter(client => client.idClient !== id);
    },
  },
};
</script>

<style src="../assets/css/AñadirCliente.css"></style>