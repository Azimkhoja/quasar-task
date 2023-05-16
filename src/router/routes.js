const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "IndexPage",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "add-product",
        name: "AddProduct",
        component: () => import("pages/AddProduct.vue"),
      },
      {
        path: "edit-product/:id",
        name: "EditProduct",
        component: () => import("pages/EditProduct.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
