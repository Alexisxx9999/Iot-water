<template>
  <div class="login-container">
    <!-- Contenedor de la imagen (eliminado) -->
     <img src="../assets/agua4.png">
    <div class="login-form">
      <form @submit.prevent="login">
        <h2>Bienvenido</h2>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>
      </form>
      <p class="register">
        ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const validEmail = "usuario@example.com";
      const validPassword = "123456";

      if (this.email === validEmail && this.password === validPassword) {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          showConfirmButton: false,
          timer: 1500,
        });

        this.$router.push("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.",
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  background: linear-gradient(to bottom, #1E90FF, #FFFFFF); /* Degradado */
}

.login-form {
  background-color: #233a63;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
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

.login-form h2 {
  margin-bottom: 20px;
  text-align: center;
}

.register {
  margin-top: 20px;
  text-align: center;
}

.register a {
  color: skyblue;
  text-decoration: none;
}
</style>
