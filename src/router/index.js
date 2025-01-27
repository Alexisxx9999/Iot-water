// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AñadirGateway from "../views/AñadirGateway.vue";
import EditarGateway from "../views/EditarGateway.vue";
import DetalleGateway from "../views/DetalleGateway.vue";
import AñadirUsuario from "../views/AñadirUsuario.vue";
import EditarUsuario from "../views/EditarUsuario.vue";
import VerUsuario from "../views/VerUsuario.vue";
import AñadirMedidor from "../views/AñadirMedidor.vue";
import EditarMedidor from "../views/EditarMedidor.vue";
import VerMedidor from "../views/VerMedidor.vue";
import AñadirCliente from "../views/AñadirCliente.vue";
import EditarCliente from "../views/EditarCliente.vue";
import DetalleCliente from "../views/DetalleCliente.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "añadir-gateway",
        name: "AñadirGateway",
        component: AñadirGateway,
      },
      {
        path: "editar-gateway",
        name: "EditarGateway",
        component: EditarGateway,
      },
      {
        path: "detalle-gateway",
        name: "DetalleGateway",
        component: DetalleGateway,
      },
      {
        path: "añadir-usuario",
        name: "AñadirUsuario",
        component: AñadirUsuario,
      },
      {
        path: "editar-usuario",
        name: "EditarUsuario",
        component: EditarUsuario,
      },
      { path: "ver-usuario", name: "VerUsuario", component: VerUsuario },
      {
        path: "añadir-medidor",
        name: "AñadirMedidor",
        component: AñadirMedidor,
      },
      {
        path: "editar-medidor",
        name: "EditarMedidor",
        component: EditarMedidor,
      },
      { path: "ver-medidor", name: "VerMedidor", component: VerMedidor },
      {
        path: "añadir-cliente",
        name: "AñadirCliente",
        component: AñadirCliente,
      },
      {
        path: "editar-cliente",
        name: "EditarCliente",
        component: EditarCliente,
      },
      {
        path: "detalle-cliente",
        name: "DetalleCliente",
        component: DetalleCliente,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
