<template>
  <q-page padding>
    <q-table
      :rows="products"
      :columns="columns"
      row-key="name"
      separator="cell"
    >
      <template v-slot:top>
        <span class="text-h5">Products</span>
        <q-space />
        <q-btn color="primary" label="Add new Product" @click="addProduct" />
      </template>

      <template v-slot:body-cell-edit="props">
        <q-td>
          <q-btn
            icon="edit"
            color="green-8"
            dense
            size="md"
            @click="editProduct(props.row.id)"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-delete="props">
        <q-td>
          <q-btn
            :props="props"
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="deleteProduct(props.row.id)"
            
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
const columns = [
  {
    name: "product_id",
    required: true,
    label: "Product ID",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
  },
  {
    name: "type_id",
    align: "left",
    label: "Type ID",
    field: "product_type_id",
  },
  {
    name: "name_uz",
    align: "left",
    label: "Product name",
    field: "name_uz",
    sortable: true,
  },
  { name: "cost", align: "left", label: "Cost", field: "cost" },
  { name: "address", align: "left", label: "Address", field: "address" },

  { name: "edit", align: "left", label: "Edit", field: "edit" },
  { name: "delete", align: "left", label: "Delete", field: "delete" },
];

import { onMounted, ref } from "vue";
import { productStore } from "../store/productStore";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();

const products = ref([]);
const prods = productStore();

onMounted(() => {
  getProducts();
});
// barcha productlarni olish uchun 
const getProducts = async () => {
  await prods.getproducts();
  products.value = prods.productList;
};

// yangi product qoshish uchun 
const addProduct = async () => {
  router.push({ name: "AddProduct" });
};

// productni update qilish uchun 
const editProduct = async (id) => {
  router.push({ name: "EditProduct", params: {id}});
  
}

// productni bazadan o'chirish qilish uchun 
const deleteProduct = async (id) => {
  $q.dialog({
    title: "Delete",
    message: "Are you shure?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await prods.deleteProduct(id);
    $q.notify({
      message: prods.message,
      icon: "check",
      color: "positive",
      position: "top"
    });
    await prods.getproducts();
    products.value = prods.productList;
  });
};
</script>
