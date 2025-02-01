<template>
  <div :class="['card', bgColorClass]">
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">{{ value }}</div>
      <div class="card-icon">
        <i :class="icon"></i>
      </div>
    </div>
    <div class="card-footer">
      <router-link :to="enlace">
        <p>ver mas &RightArrow;</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true,
    },
    enlace: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    bgColorClass: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 23%;
  height: 150px;
  border-radius: 8px;
  box-shadow: 5px 8px 8px rgba(0, 0, 0, 0.1);
  color: black;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */
}

.card:hover {
  transform: translateY(-5px); /* Efecto de levantar la tarjeta */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
}

.card-content {
  text-align: center;
  padding: 5px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  padding: 5px;
  transition: color 0.3s ease; /* Transición suave para el título */
}

.card-value {
  font-size: 20px;
  margin: 8px 0;
  float: left;
  transition: color 0.3s ease; /* Transición suave para el valor */
}

.card-footer {
  background-color: white;
  width: 100%;
  display: block;
  text-align: center;
  height: 40px;
  text-decoration: none;
}

.card-footer a {
  text-decoration: none;
  color: inherit; /* Hereda el color del texto */
}

.card-icon {
  font-size: 45px;
  transition: color 0.3s ease; /* Transición suave para el ícono */
}

/* Colores de fondo al pasar el cursor */
.card.bg-orange:hover {
  background-color: #e67e22; /* Naranja más oscuro */
  color: white; /* Texto blanco */
}

.card.bg-light-orange:hover {
  background-color: #e67e50; /* Naranja claro más oscuro */
  color: white; /* Texto blanco */
}

.card.bg-brown:hover {
  background-color: #6e5b4b; /* Marrón más oscuro */
  color: white; /* Texto blanco */
}

.card.bg-yellow:hover {
  background-color: #f1c40f; /* Amarillo más oscuro */
  color: black; /* Texto negro */
}

/* Cambiar el color del ícono y el texto al pasar el cursor */
.card:hover .card-icon,
.card:hover .card-title,
.card:hover .card-value {
  color: inherit; /* Hereda el color definido en el hover */
}
</style>