<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 500px">
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="number"
          v-model="editProduct.product_type_id"
          label="Product Type ID"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter a product type ID',
          ]"
        />

        <q-input
          filled
          v-model="editProduct.name_uz"
          label="Product Name"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please enter a product name',
          ]"
        />
        <q-input
          filled
          type="number"
          v-model="editProduct.cost"
          label="Product Cost"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please enter a product price',
          ]"
        />
        <q-input
          filled
          type="text"
          v-model="editProduct.address"
          label="Address"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please enter a product address',
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { productStore } from "src/store/productStore";
import { ref , onMounted} from "vue";
import { useQuasar } from "quasar";
import moment from "moment";
import { useRouter , useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const data = productStore();

const editProduct = ref({
  product_type_id: null,
  name_uz: "",
  cost: null,
  address: "",
  created_date: moment().format(),
});

onMounted(async () => {
      getProduct(route.params.id)
    })

    
const getProduct = async () => {
  const res = await data.getproducts()
  const product  = res.filter( value => {
    return value.id  == +route.params.id
  })
  editProduct.value = product[0]
}
const onSubmit = async () => {
    await data.updateProduct(editProduct.value)
    router.push({ name: "IndexPage" });
    $q.notify({
      message: data.message,
      icon: "check",
      color: "blue-4",
    });
  
};
</script>
