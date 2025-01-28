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
  padding: 5px 10px; /* Espaciado ajustado */
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Altura ajustada */
  z-index: 1000;
  transition: background-color 0.3s; /* Animación al cambiar el color de fondo */
}

.nav-bar:hover {
  background-color: rgba(240, 240, 240, 0.9); /* Cambia el fondo al pasar el cursor */
}

/* Media Queries para pantallas grandes */
@media (max-width: 1400px) {
  .nav-bar {
    height: 70px; /* Aumenta la altura en pantallas más grandes */
  }
}

@media (max-width: 1200px) {
  .nav-bar {
    height: 60px; /* Ajusta la altura de la barra de navegación */
  }
}

@media (max-width: 1024px) {
  .nav-bar {
    padding: 5px 15px; /* Ajusta el espaciado en pantallas medianas */
  }
}

@media (max-width: 768px) {
  .nav-bar {
    height: 50px; /* Reduce la altura de la barra de navegación en pantallas móviles */
    padding: 5px 10px; /* Ajusta el espaciado en pantallas pequeñas */
  }

  .nav-bar .logo {
    font-size: 1.5rem; /* Reduce el tamaño del logo en pantallas móviles */
  }

  .nav-bar .menu {
    font-size: 1rem; /* Ajusta el tamaño de los elementos del menú */
  }
}

@media (max-width: 480px) {
  .nav-bar {
    height: 45px; /* Reduce la altura aún más para pantallas muy pequeñas */
    padding: 5px 8px; /* Ajusta el espaciado para dispositivos más pequeños */
  }

  .nav-bar .logo {
    font-size: 1.2rem; /* Logo aún más pequeño */
  }

  .nav-bar .menu {
    font-size: 0.9rem; /* Tamaño de los elementos del menú más pequeños */
  }
}

.logo {
  display: flex;
  align-items: center;
  transition: transform 0.3s, opacity 0.3s; /* Animación para el logo */
}

.logo:hover {
  transform: scale(1.1); /* Aumenta el tamaño del logo al pasar el cursor */
  opacity: 0.9; /* Cambia la opacidad del logo al pasar el cursor */
}

.logo img {
  height: 40px; /* Ajustar el tamaño del logo */
  margin-right: 5px;
}

/* Media Queries para pantallas grandes */
@media (max-width: 1400px) {
  .logo img {
    height: 50px; /* Aumenta el tamaño del logo en pantallas grandes */
  }
}

@media (max-width: 1200px) {
  .logo img {
    height: 45px; /* Ajusta el tamaño del logo para pantallas medianas */
  }
}

@media (max-width: 1024px) {
  .logo img {
    height: 40px; /* Mantiene el tamaño estándar del logo */
  }
}

@media (max-width: 768px) {
  .logo img {
    height: 35px; /* Reduce el tamaño del logo en pantallas móviles */
  }
}

@media (max-width: 480px) {
  .logo img {
    height: 30px; /* Reduce aún más el tamaño del logo para pantallas muy pequeñas */
  }
}

.user-menu {
  display: flex;
  align-items: center;
}

.menu-horizontal {
  list-style: none;
  display: flex;
  align-items: center;
}

.menu-horizontal > li {
  position: relative; /* Para el menú vertical */
}

.menu-horizontal > li > a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: black;
  text-decoration: none;
  transition: color 0.3s, transform 0.2s; /* Animación de color y transformación */
}

.menu-horizontal > li > a:hover {
  color: #007bff; /* Cambia el color al pasar el cursor */
  transform: scale(1.05); /* Efecto de aumento al pasar el cursor */
}

.menu-horizontal > li:hover .menu-vertical {
  display: block;
}

.menu-vertical {
  position: absolute;
  display: none;
  list-style: none;
  width: 163px;
  background-color: rgba(169, 169, 169, 0.5);
  z-index: 100; /* Asegúrate que esté sobre otros elementos */
  transition: opacity 0.3s; /* Animación de opacidad */
}

.menu-vertical li:hover {
  background-color: rgba(169, 169, 169, 0.5);
}

.menu-vertical li a {
  display: flex;
  align-items: center;
  color: black;
  padding: 10px 15px;
  text-decoration: none;
}

/* Media Queries para pantallas grandes */
@media (max-width: 1400px) {
  .menu-horizontal {
    gap: 20px; /* Ajusta el espacio entre los elementos */
  }

  .menu-vertical {
    width: 200px; /* Aumenta el ancho del menú vertical para pantallas más grandes */
  }
}

/* Media Queries para pantallas medianas */
@media (max-width: 1024px) {
  .menu-horizontal {
    gap: 15px; /* Reduce el espacio entre los elementos */
  }

  .menu-vertical {
    width: 150px; /* Ajusta el ancho del menú vertical */
  }
}

/* Media Queries para pantallas pequeñas */
@media (max-width: 768px) {
  .menu-horizontal {
    flex-direction: column; /* Cambia a vista vertical */
    gap: 10px; /* Reduce el espacio entre los elementos */
  }

  .menu-vertical {
    width: 100%; /* Menú vertical se ajusta al 100% de ancho */
    position: static; /* El menú vertical se posiciona debajo del item */
  }

  .menu-horizontal > li {
    width: 100%; /* Asegura que cada elemento ocupe el 100% */
  }

  .menu-horizontal > li > a {
    padding: 8px 12px; /* Ajusta el espaciado */
  }
}

/* Media Queries para dispositivos móviles pequeños */
@media (max-width: 480px) {
  .menu-horizontal {
    flex-direction: column; /* Ajusta a columna en pantallas muy pequeñas */
  }

  .menu-vertical {
    width: 100%; /* El menú vertical ocupa el 100% del ancho */
  }

  .menu-horizontal > li > a {
    padding: 6px 10px; /* Reduce el espaciado en pantallas pequeñas */
  }
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
  background: rgb(0, 26, 49);
  position: fixed;
  z-index: 100;
  height: 100vh; /* Altura total de la barra lateral */
  display: flex;
  flex-direction: column;
  top: 60px; /* Alinear con la barra de navegación */
  transition: transform 0.3s ease; /* Transición suave */
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
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  align-items: center;
  transition: background 0.3s, color 0.3s; /* Animación de fondo y color */
}

.sidebar .Navbar li:hover a {
  background: rgba(150, 175, 198, 1);
  color: #fff;
}

.sidebar .Navbar li a i {
  margin-right: 5px; /* Espacio entre el icono y el texto */
}

.sidebar .Navbar li a p {
  font-size: 14px; /* Ajustar el tamaño de la fuente */
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