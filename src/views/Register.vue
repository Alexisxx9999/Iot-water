<template>
  <div class="register-container">
    <!-- Imagen incluida directamente -->
    <img src="../assets/agua4.png" alt="Registro IOT Water" />
    <div class="register-form">
      <form @submit.prevent="createUsers">
        <h2>Regístrate</h2>
        <div class="form-group">
          <label for="nombreUsuario">Nombre</label>
          <input
            type="text"
            id="nombreUsuario"
            v-model="user.nombreUsuario"
            required
          />
        </div>
        <div class="form-group">
          <label for="emailUsuario">Correo electrónico</label>
          <input
            type="email"
            id="emailUsuario"
            v-model="user.emailUsuario"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Por favor, ingresa un correo electrónico válido"
          />
        </div>
        <div class="form-group">
          <label for="telefonoUsuario">Teléfono</label>
          <input
            type="text"
            id="telefonoUsuario"
            v-model="user.telefonoUsuario"
            required
            pattern="\d{10}"
            title="El número telefónico debe ser de 10 dígitos"
          />
        </div>
        <div class="form-group">
          <label for="contraseñaUsuario">Contraseña</label>
          <input
            type="password"
            id="contraseñaUsuario"
            v-model="user.contraseñaUsuario"
            required
            minlength="8"
          />
        </div>
        <button type="submit" class="btn btn-primary">Crear cuenta</button>
      </form>
      <p class="login">
        ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Register",
  data() {
    return {
      user: {
        nombreUsuario: "",
        emailUsuario: "",
        telefonoUsuario: "",
        contraseñaUsuario: "",
      },
    };
  },
  methods: {
    createUsers() {
      const requiredFields = [
        "nombreUsuario",
        "emailUsuario",
        "telefonoUsuario",
        "contraseñaUsuario",
      ];

      const isComplete = requiredFields.every(
        (field) => this.user[field] !== ""
      );

      if (isComplete) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "El usuario ha sido registrado correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });

        this.$router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrarse",
          text: "Por favor, completa todos los campos antes de continuar.",
        });
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  background: linear-gradient(to bottom, #1e90ff, #ffffff); /* Fondo degradado */
}

.register-form {
  background-color: #233a63;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
}

img {
  max-width: 500px;
  height: auto;
  margin-bottom: 50px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #0369f0;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 3px;
}

.btn:hover {
  background-color: #61c2f0;
}

.register-form h2 {
  margin-bottom: 20px;
  text-align: center;
}

.login {
  margin-top: 20px;
  text-align: center;
}

.login a {
  color: skyblue;
  text-decoration: none;
}
</style>
