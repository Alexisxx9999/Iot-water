<template>
  <div class="content">
    <div class="header-container">
      <h1>Gateways</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir adopcion</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} adopcion 😸</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
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
            <th><i class="fas fa-calendar-alt"></i> Fecha:</th>
            <th><i class="fas fa-user"></i> Nombre de Mascota</th>
            <th><i class="fas fa-id-card-alt"></i> Dueño</th>
            <th><i class="fas fa-at"></i> Descripcion</th>
            <th><i class="fas fa-at"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in adopciones" :key="pet.idAdopcion">
            <td>{{ pet.createAdopcion }}</td>
            <td>{{ getPetName(pet.idMascota) }}</td>
            <td>{{ getUserName(pet.idUsuario) }}</td>
            <td>{{ pet.descripcion }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(pet.idAdopcion)"></i>
              <i class="fas fa-edit" @click="editPet(pet.idAdopcion)"></i>
              <i
                class="fas fa-trash-alt"
                @click="deletePet(pet.idAdopcion)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="goBack" class="back-button">Regresar</button>
    <!-- Modal para confirmación de eliminación -->
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que quieres eliminar esta adopcion?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <!-- Sección para mostrar el detalle de la mascota -->
    <div v-if="selectedPet" class="pet-details-container">
      <div class="pet-details">
        <h2>Detalle de la Adopcion</h2>
        <p>
          <strong>Fecha de Adopcion: </strong> {{ selectedPet.createAdopcion }}
        </p>
        <p>
          <strong>Descripcion de Adopcion: </strong>
          {{ selectedPet.descripcion }}
        </p>

        <h4>Informacion de la mascota adoptada 😻</h4>
        <div class="mascota">
          <div class="inf-mascota">
            <p>
              <strong>Nombre de la mascota: </strong>
              {{ getPetDetails(selectedPet.idMascota).nombreMascota }}
            </p>
            <p>
              <strong>Sexo: </strong>
              {{ getPetDetails(selectedPet.idMascota).sexo }}
            </p>
            <p>
              <strong>Especie de la mascota </strong>
              {{ getPetDetails(selectedPet.idMascota).idTipoMascota }}
            </p>
            <p>
              <strong>descripcion de la mascota </strong>
              {{ getPetDetails(selectedPet.idMascota).descripcion }}
            </p>
          </div>
        </div>
        <h4>Informacion general del dueño 👧</h4>
        <div class="usuario">
          <div class="imageUsuario">
            <img src="" alt="imagen del usuario" />
          </div>
          <div class="inf-usuario">
            <p>
              <strong>Nombres y apellidos: </strong>
              {{ getUserDetails(selectedPet.idUsuario).nombreUsuario }}
              {{ getUserDetails(selectedPet.idUsuario).apellidoUsuario }}
            </p>
            <p>
              <strong>telefono: </strong>
              {{ getUserDetails(selectedPet.idUsuario).telefonoUsuario }}
            </p>
            <p>
              <strong>Ubicacion: </strong>
              {{ getUserDetails(selectedPet.idUsuario).ubicacionUsuario }}
            </p>

            <p>
              <strong>Email del Dueño: </strong>
              {{ getUserDetails(selectedPet.idUsuario).emailUsuario }}
            </p>
          </div>
        </div>

        <button @click="selectedPet = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from "../components/ImageUploader.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "Gateway",
  components: {
    ImageUploader,
    Modal,
  },
  data() {
    return {
      pets: [],
      users: [],
      adopciones: [],
      currentPet: {
        idMascota: "",
        idAdopcion: "",
        idUsuario: "",
        descripcion: "",

        createAdopcion: "",
      },
      editing: false,
      showForm: false,
      selectedPet: null,
      showModal: false,
      petToDelete: null,
      shouldShowImageUploader: false,
    };
  },
  watch: {
    $route(to) {
      this.updateImageUploaderProps(to);
    },
  },
  methods: {
    updateImageUploaderProps(route) {
      // Actualiza los props según la ruta actual
      if (route.name === "Mascotas") {
        this.shouldShowImageUploader = true;
      } else if (route.name === "Usuarios") {
        this.shouldShowImageUploader = true;
      } else if (route.name === "Adopciones") {
        this.shouldShowImageUploader = true;
      } else if (route.name === "Vacunas") {
        this.shouldShowImageUploader = true;
      } else {
        this.shouldShowImageUploader = false; // Ocultar ImageUploader en otras vistas
      }
    },

    async getPets() {
      try {
        const response = await instance.get("/mascotas");
        console.log(response.data);
        this.pets = response.data;
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    },
    async submitForm() {
      try {
        const csrfToken = await this.obtenerCsrfToken();
        instance.defaults.headers.common["X-CSRF-Token"] = csrfToken;

        if (this.editing) {
          await instance.patch(
            `/adopciones/${this.currentPet.idAdopcion}`,
            this.currentPet
          );
        } else {
          await instance.post("/adopciones", this.currentPet);
        }
        this.getAdopciones();
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    async getUsers() {
      try {
        const response = await instance.get("/usuarios");
        console.log(response.data);
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    },
    async getAdopciones() {
      try {
        const response = await instance.get("/adopciones");
        console.log(response.data);
        this.adopciones = response.data;
      } catch (error) {
        console.error("Error fetching adopciones:", error);
      }
    },
    getPetName(idMascota) {
      const pet = this.pets.find((p) => p.idMascota === idMascota);
      return pet ? pet.nombreMascota : "Nombre no disponible";
    },

    getUserName(idUsuario) {
      const user = this.users.find((u) => u.idUsuario === idUsuario);
      return user
        ? `${user.nombreUsuario} ${user.apellidoUsuario}`
        : "Nombre no disponible";
    },
    editPet(id) {
      this.editing = true;
      this.currentPet = {
        ...this.adopciones.find((pet) => pet.idAdopcion === id),
      };
      this.showForm = true;
    },
    getPetDetails(idMascota) {
      return this.pets.find((p) => p.idMascota === idMascota) || {};
    },

    getUserDetails(idUsuario) {
      return this.users.find((u) => u.idUsuario === idUsuario) || {};
    },
    viewDetails(id) {
      this.selectedPet = this.adopciones.find((pet) => pet.idAdopcion === id);
    },

    async deletePet(id) {
      this.petToDelete = id;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        await instance.delete(`/adopciones/${this.petToDelete}`);
        this.getAdopciones();
        this.showModal = false;
        this.petToDelete = null;
      } catch (error) {
        console.error("Error deleting adopcion:", error);
      }
    },
    cancelDelete() {
      this.showModal = false;
      this.petToDelete = null;
    },
    resetForm() {
      this.currentPet = {
        idMascota: "",
        idAdopcion: "",
        idUsuario: "",
        descripcion: "",
        createAdopcion: "",
      };
      this.editing = false;
      this.showForm = false;
    },
    showAddForm() {
      this.resetForm();
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
      this.showForm = false;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getAdopciones();
    this.getPets();
    this.getUsers();
    this.updateImageUploaderProps(this.$route);
  },
};
</script>

<style src="../assets/css/AñadirGateway.css"></style>
