<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <slot></slot> <!-- Usar slot para mostrar contenido personalizado -->
      <div class="modal-buttons">
        <button @click="confirm" class="btn">Confirmar</button>
        <button @click="cancel" class="btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "title"],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-buttons {
  display: flex;
  justify-content: space-between; /* Espaciado entre botones */
  margin-top: 20px; /* Espacio superior para botones */
}

.btn {
  background-color: #00033d;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 7px;
  cursor: pointer; /* Cambiar el cursor a pointer para indicar clickeable */
}

.btn:hover {
  background-color: rgb(0, 1, 73);
}
</style>