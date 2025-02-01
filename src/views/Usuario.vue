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

    <!-- Formulario de agregar/editar usuario -->
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Usuario</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="idUser" class="title">ID del Usuario</label>
            <input
              type="text"
              id="idUser"
              v-model="currentUser.idUser"
              required
            />
          </div>
          <div class="form-group">
            <label for="name" class="title">Nombre del Usuario</label>
            <input type="text" id="name" v-model="currentUser.name" required />
          </div>
          <div class="form-group">
            <label for="email" class="title">Email</label>
            <input
              type="email"
              id="email"
              v-model="currentUser.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="role" class="title">Rol</label>
            <input type="text" id="role" v-model="currentUser.role" required />
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

    <!-- Tabla de usuarios -->
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
              <i
                class="fas fa-trash-alt"
                @click="confirmDelete(user.idUser)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para agregar/editar usuario -->
    <Modal
      v-if="showFormModal"
      :show="showFormModal"
      :title="editing ? 'Editar Usuario' : 'Agregar Usuario'"
      @cancel="closeFormModal"
      @confirm="submitForm"
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

    <!-- Modal de Confirmación de eliminación -->
    <Modal
      v-if="showDeleteModal"
      :show="showDeleteModal"
      title="Confirmar Eliminación"
      @cancel="closeDeleteModal"
      @confirm="deleteUser"
    >
      <p>¿Estás seguro de que deseas eliminar este usuario?</p>
    </Modal>
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
      showFormModal: false, // Modal para agregar/editar usuario
      selectedUser: null, // Usuario seleccionado para mostrar detalles
      showDeleteModal: false, // Modal de confirmación de eliminación
      userToDelete: null, // Almacena el ID del usuario a eliminar
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    // Cargar datos dummy para los usuarios
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
    // Mostrar el modal para agregar un nuevo usuario
    showAddForm() {
      this.resetForm();
      this.showFormModal = true;
    },
    // Configurar el formulario para editar un usuario
    editUser(id) {
      this.editing = true;
      this.currentUser = { ...this.users.find((user) => user.idUser === id) };
      this.showFormModal = true;
    },
    // Enviar el formulario (agregar o editar)
    submitForm() {
      if (this.editing) {
        const index = this.users.findIndex(
          (user) => user.idUser === this.currentUser.idUser
        );
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
    // Mostrar detalles de un usuario
    viewDetails(id) {
      this.selectedUser = this.users.find((user) => user.idUser === id);
    },
    // Confirmar eliminación de un usuario
    confirmDelete(id) {
      this.userToDelete = id;
      this.showDeleteModal = true;
    },
    // Eliminar un usuario
    deleteUser() {
      this.users = this.users.filter(
        (user) => user.idUser !== this.userToDelete
      );
      this.closeDeleteModal();
    },
    // Cerrar el modal de confirmación de eliminación
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.userToDelete = null;
    },
  },
};
</script>

<style src="../assets/css/AñadirUsuario.css"></style>
