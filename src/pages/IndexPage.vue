<template>
  <q-page padding>
    <q-table :rows="products" :columns="columns" row-key="name" separator="cell">
      <template v-slot:top>
        <span class="text-h5">Products</span>
        <q-space />
        <q-btn color="primary" label="Add new Product" @click="addProduct" />
      </template>

      <template v-slot:body-cell-edit="props">
    
        <q-td>
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="editProduct(props.row.id)"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-delete="props">
        <!-- <q-td :props="products">
          {{ rows.name }}
        </q-td> -->
        <q-td>
          <q-btn
            :props="props"
            icon="delete"
            color="negative"
            dense
            size="sm"
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
    field: 'id',
    format: (val) => `${val}`,
  },
  {
    name: "type_id",
    align: "left",
    label: "Type ID",
    field: "product_type_id",
  },
  { name: "name_uz",align: "left",  label: "Product name", field: "name_uz", sortable: true },
  { name: "cost", align: "left", label: "Cost", field: "cost" },
  { name: "address", align: "left", label: "Address", field: "address" },

  { name: "edit", align: "left", label: "Edit", field: "edit" },
  { name: "delete", align: "left", label: "Delete", field: "delete" },
];

import { onMounted, ref } from 'vue';
import { productStore } from '../store/productStore';
import { useRouter } from 'vue-router'
const router = useRouter()

const products = ref([])

const prods = productStore()
onMounted(() => {
  getProducts()
})


const getProducts = async () =>  {
  
  products.value = await prods.getproducts()
 }
 const addProduct = async () => {
  console.log('push');
    router.push({name:'AddProduct'})
    // const res = await prods.addProduct()

 }

 const deleteProduct = async (id) => {
      console.log(id, 'id')
     
        $q.dialog({
          title: 'Delete',
          message: 'Are you shure?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await prods.deleteProduct(id)
          
          $q.notify({
            message: 'Successfully deleted',
            icon: 'check',
            color: 'positive'
          })
          await getPosts()
        })
    }
</script>
