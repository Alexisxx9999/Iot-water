<template>
  <div class="content-total">
    <nav class="nav-bar">
      <router-link to="/dashboard">
        <div class="logo">
          <img src="../assets/logo.png" alt="Logo" />
          <span class="logo-name">IOT WATER</span>
        </div>
      </router-link>

      <nav>
        <ul class="menu-horizontal">
          <li>
            <a href="#">
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
      </nav>
    </nav>

    <div class="sidebar">
      <aside class="side-menu">
        <div class="profile-info"></div>
        <ol class="Navbar">
          <li v-for="item in menuItems" :key="item.path">
            <router-link :to="item.path">
              <i :class="item.icon"></i> {{ item.name }}
            </router-link>
          </li>
        </ol>
      </aside>
    </div>
    
    <main class="main-content">
      <!-- Aquí va el contenido de la vista -->
    </main>
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
    };
  },
};
</script>

<style scoped>
/* Estilos de la barra de navegación superior */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px; /* Ajustar la altura para que sea más delgada */
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 35px; /* Ajustar el tamaño del logo */
  margin-right: 5px;
}

.menu-horizontal {
  list-style: none;
  display: flex;
  align-items: center;
}

.menu-horizontal > li > a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: black;
  text-decoration: none;
}

.menu-horizontal > li > a .nav-text {
  margin-left: 5px;
}

.menu-horizontal > li:hover {
  background-color: rgba(6, 25, 100, 0.5);
}

.menu-vertical {
  position: absolute;
  display: none;
  list-style: none;
  width: 163px;
  background-color: rgba(169, 169, 169, 0.5);
}

.menu-horizontal li:hover .menu-vertical {
  display: block;
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

/* Estilos del menú lateral */
* {
  padding: 0;
  box-sizing: border-box;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.content-total {
  display: flex;
  height: 100vh; /* Asegurarse de que ocupa toda la altura de la ventana */
  margin-top: 40px; /* Para evitar que el contenido se superponga a la barra de navegación */
}

.side-menu {
  width: 100%;
  min-width: 15%;
  max-width: 220px;
  background: rgb(0, 26, 49);
  position: fixed;
  z-index: 100;
  height: calc(100vh - 40px); /* Altura total menos la altura de la barra de navegación */
  display: flex;
  flex-direction: column;
}

.sidebar .Navbar {
  width: 100%;
  padding: 0 10px;
  list-style: none;
  margin-top: 10px; /* Reducir el espacio superior */
}

.sidebar .Navbar li {
  width: 100%;
  display: inline-flex;
  margin: 5px 0;
}

.sidebar .Navbar li a {
  width: 100%;
  display: inline-flex;
  text-decoration: none;
  text-transform: capitalize;
  color: white;
  padding: 5px 8px;
  border-radius: 10px;
}

.sidebar .Navbar li:hover a {
  background: rgba(150, 175, 198, 1);
  color: #fff;
}

.sidebar .Navbar li a i {
  margin: auto 0;
  font-size: 20px;
  width: 40px;
  text-align: center;
}

.sidebar .Navbar li a p {
  font-size: 20px;
  transform: scale(1);
  transform-origin: left;
  transition: 0.3s;
}

/* Estilos para el contenido principal */
.main-content {
  margin-left: 220px; /* Espacio para la barra lateral */
  padding: 20px;
  height: calc(100vh - 40px); /* Altura total menos la altura de la barra de navegación */
  overflow-y: auto; /* Permitir desplazamiento si el contenido es largo */
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

  .side-menu {
    position: relative;
    width: 100%;
    height: auto;
    min-width: 100%;
    max-width: 100%;
    transition: none; /* Desactivar la transición */
    margin-top: 50px; /* Añadir margen superior para espaciar del nav-bar */
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    margin-left: 0; /* Sin margen para móviles */
    padding: 10px;
    height: auto; /* Ajustar altura para móviles */
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
    font-size: 24px; /* Aumentar el tamaño de fuente en pantallas grandes */
  }
}
</style>