<template>
  <div class="content-total">
    <nav class="nav-bar">
      <router-link to="/dashboard" class="logo">
        <img src="../assets/agua4.png" alt="Logo" />
        <span class="logo-name">IOT WATER</span>
      </router-link>

      <div class="user-menu">
        <ul class="menu-horizontal">
          <li>
            <a href="#" class="user-link">
              <i class="fas fa-user-circle"></i>
              <span class="nav-text">{{ userName }}</span>
            </a>
            <ul class="menu-vertical">
              <li>
                <router-link to="/">
                  <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <div class="sidebar" :class="{ 'is-hidden': !isSidebarVisible }">
      <aside class="side-menu">
        <ol class="Navbar">
          <li v-for="item in menuItems" :key="item.path">
            <router-link :to="item.path">
              <i :class="item.icon"></i> {{ item.name }}
            </router-link>
          </li>
        </ol>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      userName: "Usuario Admin",
      menuItems: [
        { name: "Dashboard", path: "/dashboard", icon: "fas fa-tv" },
        { name: "Gateway", path: "/dashboard/gateway", icon: "fas fa-plug" },
        { name: "Usuario", path: "/dashboard/usuario", icon: "fas fa-user-plus" },
        { name: "Medidor", path: "/dashboard/medidor", icon: "fas fa-tachometer-alt" },
        { name: "Cliente", path: "/dashboard/cliente", icon: "fas fa-user-plus" },
      ],
      isSidebarVisible: true, // Controla la visibilidad de la barra lateral
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Alternar visibilidad
    },
  },
};
</script>

<style scoped>
/* Estilos de la barra de navegación superior */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; /* Espaciado ajustado */
  background-color: #0a192f; /* Fondo oscuro para resaltar los colores neon */
  border-bottom: 2px solid #00d1ff; /* Borde neon azul */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Altura ajustada */
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Animaciones suaves */
  box-shadow: 0 2px 10px rgba(0, 209, 255, 0.3); /* Sombra neon azul */
}

.nav-bar:hover {
  background-color: #0a2342; /* Cambia el fondo al pasar el cursor */
  box-shadow: 0 4px 15px rgba(0, 209, 255, 0.5); /* Sombra más pronunciada al pasar el cursor */
}

/* Estilos del logo */
.logo {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease; /* Animación para el logo */
}

.logo:hover {
  transform: scale(1.1); /* Aumenta el tamaño del logo al pasar el cursor */
  opacity: 0.9; /* Cambia la opacidad del logo al pasar el cursor */
}

.logo img {
  height: 40px; /* Ajustar el tamaño del logo */
  margin-right: 10px; /* Espacio entre el logo y el texto */
}

.logo-name {
  font-size: 1.5rem; /* Tamaño del texto del logo */
  font-weight: bold;
  color: #00d1ff; /* Color neon azul para el texto del logo */
  text-shadow: 0 0 5px #00d1ff, 0 0 10px #00d1ff; /* Efecto neon */
}

/* Estilos del menú de usuario */
.user-menu {
  display: flex;
  align-items: center;
}

.menu-horizontal {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.menu-horizontal > li {
  position: relative; /* Para el menú vertical */
}

.menu-horizontal > li > a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #00d1ff; /* Color neon azul para el texto del menú */
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease; /* Animación de color y transformación */
  text-shadow: 0 0 5px #00d1ff, 0 0 10px #00d1ff; /* Efecto neon */
}

.menu-horizontal > li > a:hover {
  color: #00ff88; /* Cambia el color al pasar el cursor (neon verde) */
  text-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88; /* Efecto neon al pasar el cursor */
  transform: scale(1.05); /* Efecto de aumento al pasar el cursor */
}

.menu-vertical {
  position: absolute;
  display: none;
  list-style: none;
  width: 160px;
  background-color: #0a2342; /* Fondo oscuro para el menú vertical */
  z-index: 100; /* Asegúrate que esté sobre otros elementos */
  transition: opacity 0.3s ease; /* Animación de opacidad */
  top: 100%; /* Posición debajo del elemento padre */
  left: 0;
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 209, 255, 0.3); /* Sombra neon azul */
}

.menu-horizontal > li:hover .menu-vertical {
  display: block; /* Muestra el menú vertical al pasar el cursor */
}

.menu-vertical li:hover {
  background-color: #00d1ff; /* Cambia el fondo al pasar el cursor (neon azul) */
}

.menu-vertical li a {
  display: flex;
  align-items: center;
  color: #00d1ff; /* Color neon azul para el texto del menú vertical */
  padding: 10px 15px;
  text-decoration: none;
  text-shadow: 0 0 5px #00d1ff, 0 0 10px #00d1ff; /* Efecto neon */
}

.menu-vertical li a:hover {
  color: #00ff88; /* Cambia el color al pasar el cursor (neon verde) */
  text-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88; /* Efecto neon al pasar el cursor */
}

/* Estilos del menú lateral */
* {
  padding: 0;
  box-sizing: border-box;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.content-total {
  display: flex;
}

.toggle-sidebar {
  display: none; /* Ocultar el botón en pantallas grandes */
}

.sidebar {
  width: 200px; /* Ancho más espacioso para la barra lateral */
  background: #0a192f; /* Fondo oscuro para la barra lateral */
  position: fixed;
  z-index: 100;
  height: 100vh; /* Altura total de la barra lateral */
  display: flex;
  flex-direction: column;
  top: 60px; /* Alinear con la barra de navegación */
  transition: transform 0.3s ease; /* Transición suave */
  border-right: 2px solid #00d1ff; /* Borde neon azul */
  box-shadow: 0 0 10px rgba(0, 209, 255, 0.3); /* Sombra neon azul */
}

.sidebar.is-hidden {
  transform: translateX(-100%); /* Desaparece hacia la izquierda */
}

.sidebar .Navbar {
  width: 100%;
  padding: 0;
  list-style: none;
}

.sidebar .Navbar li {
  width: 100%;
  display: flex;
  margin: 5px 0;
}

.sidebar .Navbar li a {
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #93ebff; /* Color neon azul para el texto del menú lateral */
  padding: 10px 15px;
  border-radius: 10px;
  align-items: center;
  transition: background 0.3s, color 0.2s, text-shadow 0.2s; /* Animación de fondo, color y brillo */
  text-shadow: 0 0 2px #00d1ff, 0 0 10px #a5eeff; /* Efecto neon */
}

.sidebar .Navbar li a:hover {
  background: rgba(0, 209, 255, 0.1); /* Fondo semi-transparente al pasar el cursor */
  color: #7dfbc0; /* Cambia el color al pasar el cursor (neon verde) */
  text-shadow: 0 0 2px #00ff88, 0 0 10px #00ff88; /* Efecto neon al pasar el cursor */
}

.sidebar .Navbar li a i {
  margin-right: 5px; /* Espacio entre el icono y el texto */
  color: #00d1ff; /* Color neon azul para los iconos */
  text-shadow: 0 0 5px #a3eeff, 0 0 10px #00d1ff; /* Efecto neon */
}

.sidebar .Navbar li a:hover i {
  color: #99f9cc; /* Cambia el color al pasar el cursor (neon verde) */
  text-shadow: 0 0 5px #61ffb5, 0 0 10px #a6ffd5; /* Efecto neon al pasar el cursor */
}

/* Estilos para el contenido principal */
.main-content {
  margin-left: 200px; /* Espacio para la barra lateral más ancha */
  padding: 20px;
  margin-top: 60px; /* Alinear el contenido más abajo, por debajo de la barra de navegación */
}

/* Estilos responsivos */
@media (max-width: 700px) {
  .nav-bar {
    flex-direction: column;
    height: auto; /* Ajustar altura para móviles */
  }

  .menu-horizontal {
    flex-direction: column; /* Cambiar a columna para dispositivos pequeños */
  }

  .toggle-sidebar {
    display: block; /* Mostrar botón en pantallas pequeñas */
    background: none;
    border: none;
    font-size: 24px;
    color: black;
    cursor: pointer;
    margin: 5px;
  }

  .sidebar {
    position: fixed; /* Mantener la barra lateral en posición fija */
    width: 100%;
    height: auto;
    transition: none; /* Desactivar la transición */
    margin-top: 0; /* Sin margen superior para móviles */
    top: 60px; /* Alinear con la barra de navegación */
  }

  .sidebar.is-hidden {
    display: none; /* Ocultar la barra lateral */
  }

  .main-content {
    margin-left: 0; /* Sin margen para móviles */
    padding: 10px;
    height: auto; /* Ajustar altura para móviles */
    margin-top: 60px; /* Alinear contenido con la barra de navegación */
  }
}

@media (min-width: 2560px) {
  .nav-bar {
    height: 60px; /* Mayor altura para pantallas 4K */
  }

  .logo img {
    height: 50px; /* Aumentar tamaño del logo en pantallas grandes */
  }

  .menu-horizontal > li > a {
    padding: 15px 25px; /* Mayor padding en pantallas grandes */
    font-size: 18px; /* Aumentar tamaño de fuente en pantallas grandes */
  }

  .sidebar .Navbar li a {
    font-size: 16px; /* Aumentar el tamaño de fuente en pantallas grandes */
  }
}
</style>