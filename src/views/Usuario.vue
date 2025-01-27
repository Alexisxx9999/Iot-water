<template>
  <div class="content">
    <div class="header-container">
      <h1>Usuarios</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Usuario</button>
      </div>
    </div>

    <!-- Formulario de Usuario -->
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Usuario</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <!-- Nombre del Usuario -->
          <div class="form-group">
            <label for="nombre" class="title">Nombre</label>
            <input
              type="text"
              id="nombre"
              required
              v-model="currentUsuario.nombre"
              class="form-control"
            />
          </div>
          <!-- Apellido -->
          <div class="form-group">
            <label for="apellido" class="title">Apellido</label>
            <input
              type="text"
              id="apellido"
              required
              v-model="currentUsuario.apellido"
              class="form-control"
            />
          </div>
          <!-- Email -->
          <div class="form-group">
            <label for="email" class="title">Email</label>
            <input
              type="email"
              id="email"
              required
              v-model="currentUsuario.email"
              class="form-control"
            />
          </div>
          <!-- Teléfono -->
          <div class="form-group">
            <label for="telefono" class="title">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              v-model="currentUsuario.telefono"
              class="form-control"
            />
          </div>
          <!-- Dirección -->
          <div class="form-group">
            <label for="direccion" class="title">Dirección</label>
            <input
              type="text"
              id="direccion"
              v-model="currentUsuario.direccion"
              class="form-control"
            />
          </div>
          <!-- Botones de acción -->
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

    <!-- Tabla de Usuarios -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-user"></i> Nombre</th>
            <th><i class="fas fa-at"></i> Email</th>
            <th><i class="fas fa-phone"></i> Teléfono</th>
            <th><i class="fas fa-map-marker-alt"></i> Dirección</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.idUsuario">
            <td>{{ usuario.nombre }} {{ usuario.apellido }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.telefono }}</td>
            <td>{{ usuario.direccion }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(usuario.idUsuario)"></i>
              <i class="fas fa-edit" @click="editUsuario(usuario.idUsuario)"></i>
              <i class="fas fa-trash-alt" @click="confirmDelete(usuario.idUsuario)"></i>
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
      message="¿Estás seguro de que quieres eliminar este Usuario?"
      @confirm="deleteUsuario(usuarioToDelete)"
      @cancel="cancelDelete"
    />

    <!-- Detalle de Usuario -->
    <div v-if="selectedUsuario" class="usuario-details-container">
      <div class="usuario-details">
        <h2>Detalle del Usuario</h2>
        <p><strong>Nombre:</strong> {{ selectedUsuario.nombre }} {{ selectedUsuario.apellido }}</p>
        <p><strong>Email:</strong> {{ selectedUsuario.email }}</p>
        <p><strong>Teléfono:</strong> {{ selectedUsuario.telefono }}</p>
        <p><strong>Dirección:</strong> {{ selectedUsuario.direccion }}</p>

        <h4>Información adicional del Usuario</h4>
        <div class="additional-info">
          <p><strong>Descripción:</strong> {{ selectedUsuario.descripcion }}</p>
        </div>

        <button @click="selectedUsuario = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  name: "Usuario",
  components: {
    Modal,
  },
  data() {
    return {
      usuarios: [],
      currentUsuario: {
        idUsuario: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        descripcion: "",
      },
      editing: false,
      showForm: false,
      selectedUsuario: null,
      showModal: false,
      usuarioToDelete: null,
    };
  },
  created() {
    this.loadDummyData();
  },
  methods: {
    loadDummyData() {
      // Datos de usuarios "quemados"
      this.usuarios = [
        { idUsuario: "1", nombre: "Juan", apellido: "Pérez", email: "juan@example.com", telefono: "123456789", direccion: "Calle Falsa 123", descripcion: "Usuario administrador" },
        { idUsuario: "2", nombre: "María", apellido: "Gómez", email: "maria@example.com", telefono: "987654321", direccion: "Avenida Siempre Viva 742", descripcion: "Usuario regular" },
      ];
    },
    submitForm() {
      // Función para agregar o editar usuario
      if (this.editing) {
        const index = this.usuarios.findIndex(usuario => usuario.idUsuario === this.currentUsuario.idUsuario);
        if (index !== -1) {
          this.usuarios[index] = { ...this.currentUsuario }; // Actualizar
        }
      } else {
        this.currentUsuario.idUsuario = (this.usuarios.length + 1).toString(); // Asignar nuevo ID
        this.usuarios.push({ ...this.currentUsuario }); // Agregar nuevo
      }
      this.resetForm();
    },
    resetForm() {
      this.currentUsuario = {
        idUsuario: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        descripcion: "",
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
      this.selectedUsuario = this.usuarios.find(usuario => usuario.idUsuario === id);
    },
    editUsuario(id) {
      this.editing = true;
      this.currentUsuario = { ...this.usuarios.find(usuario => usuario.idUsuario === id) };
      this.showForm = true;
    },
    confirmDelete(id) {
      this.usuarioToDelete = id;
      this.showModal = true;
    },
    deleteUsuario(id) {
      this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== id);
      this.showModal = false;
      this.usuarioToDelete = null;
    },
    cancelDelete() {
      this.showModal = false;
      this.usuarioToDelete = null;
    },
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style src="../assets/css/AñadirUsuario.css"></style>