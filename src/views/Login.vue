<template>
  <div class="login-container">
    <!-- Imagen al lado izquierdo -->
    <div class="image-container">
      <img src="../assets/agua4.png" alt="Imagen decorativa" class="side-image" />
    </div>
    <!-- Formulario de inicio de sesión -->
    <div class="login-form">
      <form @submit.prevent="login">
        <h2>Bienvenido</h2>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="input-field"
          />
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>
      </form>
      <p class="register">
        ¿No tienes cuenta?
        <router-link to="/register" class="register-link">Regístrate</router-link>
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
/* Fondo animado: degradado en movimiento */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  /* Fondo degradado animado */
  background: linear-gradient(-45deg, #1e90ff, #ffffff, #1e90ff, #ffffff);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  overflow: hidden;
}

/* Animación de degradado */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  animation: float 4s ease-in-out infinite;
}

.side-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.login-form {
  flex: 1;
  background-color: rgba(35, 58, 99, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  margin-left: 20px;
  animation: slideIn 1s ease-out;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #0369f0;
  box-shadow: 0 0 8px rgba(3, 105, 240, 0.5);
  outline: none;
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
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #61c2f0;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.login-form h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: #fff;
}

.register {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.register-link {
  color: skyblue;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #61c2f0;
}

/* Animaciones adicionales */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    padding: 10px;
  }

  .image-container {
    display: none;
  }

  .login-form {
    margin-left: 0;
    padding: 20px;
  }

  .btn {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .login-form {
    padding: 15px;
  }

  .input-field {
    padding: 8px;
  }

  .btn {
    padding: 14px;
    font-size: 10px;
  }

  .login-form h2 {
    font-size: 20px;
  }

  .register {
    font-size: 14px;
  }
}
</style>
