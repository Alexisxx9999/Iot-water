<template>
  <div class="register-container">
    <!-- Imagen incluida directamente sin contenedor extra -->
    <img src="../assets/agua4.png" alt="Registro IOT Water" class="register-image" />
    
    <!-- Formulario de registro -->
    <div class="register-form">
      <form @submit.prevent="createUsers">
        <h2>Regístrate</h2>
        <div class="form-group">
          <label for="nombreUsuario">Nombre</label>
          <input type="text" id="nombreUsuario" v-model="user.nombreUsuario" required />
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
      const isComplete = requiredFields.every((field) => this.user[field] !== "");

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
/* Contenedor principal con degradado animado */
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* Fondo degradado animado */
  background: linear-gradient(-45deg, #1e90ff, #ffffff, #1e90ff, #ffffff);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  padding: 20px;
  box-sizing: border-box;
  gap: 40px;
  flex-wrap: wrap;
}

/* Animación para el degradado de fondo */
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

/* Imagen sin contenedor extra con animación flotante */
.register-image {
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  animation: float 4s ease-in-out infinite;
}

/* Animación flotante */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Formulario de registro con animación de entrada */
.register-form {
  background-color: rgba(35, 58, 99, 0.95);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: white;
  max-width: 400px;
  width: 100%;
  animation: slideIn 1s ease-out;
}

/* Animación de entrada para el formulario */
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

/* Estilos de los grupos del formulario */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #0369f0;
  box-shadow: 0 0 8px rgba(3, 105, 240, 0.5);
}

/* Botón */
.btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #0369f0;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #61c2f0;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

/* Título y enlace de login */
.register-form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.login {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.login a {
  color: skyblue;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.login a:hover {
  color: #61c2f0;
}

/* Media Queries */

/* Para pantallas hasta 768px */
@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    padding: 10px;
    gap: 20px;
  }
  /* Ocultar imagen en móviles (si prefieres mostrarla, comenta la siguiente línea) */
  .register-image {
    display: none;
  }
  .register-form {
    margin-left: 0;
    padding: 20px;
  }
  .btn {
    font-size: 14px;
  }
}

/* Para pantallas hasta 480px */
@media (max-width: 480px) {
  .register-form {
    padding: 15px;
  }
  .form-group input {
    padding: 8px;
  }
  .btn {
    padding: 14px;
    font-size: 10px;
  }
  .register-form h2 {
    font-size: 20px;
  }
  .login {
    font-size: 14px;
  }
}
</style>
