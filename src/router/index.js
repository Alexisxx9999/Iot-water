// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Gateway from "../views/Gateway.vue";

import Usuario from "../views/Usuario.vue";

import Medidor from "../views/Medidor.vue";

import Cliente from "../views/Cliente.vue";
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
        path: "gateway",
        name: "Gateway",
        component: Gateway,
      },

      {
        path: "usuario",
        name: "Usuario",
        component: Usuario,
      },

      {
        path: "medidor",
        name: "Medidor",
        component: Medidor,
      },

      {
        path: "cliente",
        name: "Cliente",
        component: Cliente,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
