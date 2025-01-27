<template>
  <div class="content">
    <!-- Encabezado y botón para abrir el modal del formulario -->
    <div class="header-container">
      <h1>Usuarios</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Usuario</button>
      </div>
    </div>
    
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Usuario</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="userId" class="title">ID del Usuario</label>
            <input type="text" id="userId" v-model="currentUser.idUser" />
          </div>
          <div class="form-group">
            <label for="userName" class="title">Nombre del Usuario</label>
            <input type="text" id="userName" v-model="currentUser.name" />
          </div>
          <div class="form-group">
            <label for="userEmail" class="title">Email</label>
            <input type="email" id="userEmail" v-model="currentUser.email" />
          </div>
          <div class="form-group">
            <label for="userRole" class="title">Rol</label>
            <input type="text" id="userRole" v-model="currentUser.role" />
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
            <th>ID del Usuario</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.idUser">
            <td>{{ user.idUser }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(user.idUser)"></i>
              <i class="fas fa-edit" @click="editUser(user.idUser)"></i>
              <i class="fas fa-trash-alt" @click="confirmDelete(user.idUser)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para el formulario de agregar/editar -->
    <Modal
      v-if="showFormModal"
      :show="showFormModal"
      :title="editing ? 'Editar Usuario' : 'Agregar Usuario'"
      @cancel="closeFormModal"
    >
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="form-group">
          <label for="name">Nombre del Usuario</label>
          <input
            type="text"
            id="name"
            v-model="currentUser.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="currentUser.email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Rol</label>
          <input
            type="text"
            id="role"
            v-model="currentUser.role"
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

    <!-- Detalle del Usuario -->
    <div v-if="selectedUser" class="user-details-container">
      <div class="user-details">
        <h2>Detalle del Usuario</h2>
        <p><strong>ID del Usuario:</strong> {{ selectedUser.idUser }}</p>
        <p><strong>Nombre:</strong> {{ selectedUser.name }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Rol:</strong> {{ selectedUser.role }}</p>
        <button @click="selectedUser = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  name: "User",
  components: {
    Modal,
  },
  data() {
    return {
      users: [], // Lista de usuarios
      currentUser: {
        idUser: "",
        name: "",
        email: "",
        role: "",
      },
      editing: false,
      showFormModal: false, // Controla si el modal del formulario está visible
      selectedUser: null, // Controla si hay un usuario seleccionado para mostrar detalles
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    // Cargar datos predefinidos
    loadDummyData() {
      this.users = [
        {
          idUser: "1",
          name: "Usuario 1",
          email: "usuario1@example.com",
          role: "Admin",
        },
        {
          idUser: "2",
          name: "Usuario 2",
          email: "usuario2@example.com",
          role: "Usuario",
        },
      ];
    },
    // Mostrar el modal del formulario para agregar
    showAddForm() {
      this.resetForm();
      this.showFormModal = true;
    },
    // Configurar el formulario para editar un Usuario
    editUser(id) {
      this.editing = true;
      this.currentUser = { ...this.users.find(user => user.idUser === id) };
      this.showFormModal = true;
    },
    // Guardar o agregar un Usuario
    submitForm() {
      if (this.editing) {
        const index = this.users.findIndex(user => user.idUser === this.currentUser.idUser);
        if (index !== -1) this.users[index] = { ...this.currentUser };
      } else {
        this.currentUser.idUser = (this.users.length + 1).toString();
        this.users.push({ ...this.currentUser });
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
      this.currentUser = {
        idUser: "",
        name: "",
        email: "",
        role: "",
      };
      this.editing = false;
    },
    // Mostrar detalles de un Usuario
    viewDetails(id) {
      this.selectedUser = this.users.find(user => user.idUser === id);
    },
    // Confirmar eliminación de un Usuario
    confirmDelete(id) {
      this.users = this.users.filter(user => user.idUser !== id);
    },
  },
};
</script>

<style src="../assets/css/AñadirUsuario.css"></style>