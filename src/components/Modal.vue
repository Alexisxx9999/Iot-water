<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="cancel">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title">{{ title }}</h3>
        <slot></slot>
        <!-- Contenido dinámico -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    title: String,
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeyPress);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
    handleKeyPress(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
  },
};
</script>

<style scoped>
/* Fondo del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* Color más oscuro para el fondo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.4s ease-out; /* Transición al abrir el fondo */
}

/* Contenedor del modal */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  width: 400px;
  max-width: 90%;
  text-align: center;
  transform: scale(0.8); /* Empieza más pequeño para el efecto de transición */
  animation: scaleUp 0.4s ease-out forwards; /* Animación de escala */
}

/* Título del modal */
.modal h3 {
  margin-bottom: 20px;
  color: #333;
}

/* Botones */
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacio entre los botones ajustado a 20px */
  margin-top: 20px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

.btn-confirm {
  background-color: #00468c; /* Azul marino */
  color: white;
}

.btn-confirm:hover {
  background-color: #000000; /* Azul más oscuro al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación */
}

.btn-cancel {
  background-color: #e0e0e0; /* Gris suave */
  color: #333;
}

.btn-cancel:hover {
  background-color: #c6c6c6; /* Gris más oscuro al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación */
}

/* Animaciones de entrada y salida */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Animaciones del modal */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
