<template>
  <div class="content-total">
    <!-- Barra de navegación superior -->
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

    <!-- Botón para alternar la barra lateral en móviles -->
    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Barra lateral -->
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
        {
          name: "Usuario",
          path: "/dashboard/usuario",
          icon: "fas fa-user-plus",
        },
        {
          name: "Medidor",
          path: "/dashboard/medidor",
          icon: "fas fa-tachometer-alt",
        },
        {
          name: "Cliente",
          path: "/dashboard/cliente",
          icon: "fas fa-user-plus",
        },
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
  background-color: #0a192f;
  border-bottom: 2px solid #00d1ff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Altura fija */
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 209, 255, 0.3);
  animation: slideInDown 0.5s ease-in-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-bar:hover {
  background-color: #0a2342;
  box-shadow: 0 4px 15px rgba(0, 209, 255, 0.5);
}

/* Estilos del logo */
.logo {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d1ff;
  text-shadow: 0 0 5px #00d1ff, 0 0 10px #00d1ff;
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
  position: relative;
}

.menu-horizontal > li > a {
  display: flex;
  align-items: center;
  padding: 10px 35px;
  color: #00d1ff;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease; 
  
}

.menu-horizontal > li > a:hover {
  color: #00ff88;
  text-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88;
  transform: scale(1.05);
}

.menu-vertical {
  position: absolute;
  display: none;
  list-style: none;
  width: 160px;
  background-color: #0a2342;
  z-index: 100;
  transition: opacity 0.3s ease;
  top: 100%;
  left: 0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 209, 255, 0.3);
}

.menu-horizontal > li:hover .menu-vertical {
  display: block;
}

.menu-vertical li:hover {
  background-color: #00d1ff;
}

.menu-vertical li a {
  display: flex;
  align-items: center;
  color: #00d1ff;
  padding: 10px 5px;
  text-decoration: none;
  text-shadow: 0 0 5px #00d1ff, 0 0 10px #00d1ff;
}

.menu-vertical li a:hover {
  color: #00ff88;
  text-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88;
}

/* Estilos del menú lateral */
.content-total {
  display: flex;
}

.toggle-sidebar {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #00d1ff;
  cursor: pointer;
  margin: 5px;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  transition: color 0.3s ease;
}

.toggle-sidebar:hover {
  color: #00ff88;
}

.sidebar {
  width: 200px;
  background: #0a192f;
  position: fixed;
  z-index: 100;
  height: 100vh;
  display: flex;
  flex-direction: column;
  top: 60px; /* Alinear con la barra de navegación */
  transition: transform 0.3s ease;
  border-right: 2px solid #00d1ff;
  box-shadow: 0 0 10px rgba(0, 209, 255, 0.3);
  animation: slideInLeft 0.5s ease-in-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar.is-hidden {
  transform: translateX(-100%);
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
  color: #93ebff;
  padding: 10px 15px;
  border-radius: 10px;
  align-items: center;
  transition: background 0.3s, color 0.2s, text-shadow 0.2s;
  text-shadow: 0 0 2px #00d1ff, 0 0 10px #a5eeff;
}

.sidebar .Navbar li a:hover {
  background: rgba(0, 209, 255, 0.1);
  color: #7dfbc0;
  text-shadow: 0 0 2px #00ff88, 0 0 10px #00ff88;
}

.sidebar .Navbar li a i {
  margin-right: 5px;
  color: #00d1ff;
  text-shadow: 0 0 5px #a3eeff, 0 0 10px #00d1ff;
}

.sidebar .Navbar li a:hover i {
  color: #99f9cc;
  text-shadow: 0 0 5px #61ffb5, 0 0 10px #a6ffd5;
}

/* Estilos responsivos */
@media (max-width: 700px) {
  .nav-bar {
    flex-direction: column;
    height: auto;
  }

  .menu-horizontal {
    flex-direction: column;
  }

  .toggle-sidebar {
    display: block;
  }

  .sidebar {
    width: 100%;
    height: auto;
    transition: none;
    margin-top: 0;
    top: 60px;
  }

  .sidebar.is-hidden {
    display: none;
  }
}

@media (min-width: 2560px) {
  .nav-bar {
    height: 60px; /* Altura fija incluso en pantallas grandes */
  }

  .logo img {
    height: 40px; /* Tamaño del logo fijo */
  }

  .menu-horizontal > li > a {
    padding: 10px 15px; /* Padding fijo */
    font-size: 16px; /* Tamaño de fuente fijo */
  }

  .sidebar .Navbar li a {
    font-size: 14px; /* Tamaño de fuente fijo */
  }
}
</style>