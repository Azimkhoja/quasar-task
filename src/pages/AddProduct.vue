<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 500px">
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="number"
          v-model="formProduct.product_type_id"
          label="Product Type ID"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter a product type ID',
          ]"
        />

        <q-input
          filled
          v-model="formProduct.name_uz"
          label="Product Name"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please enter a product name',
          ]"
        />
        <q-input
          filled
          type="number"
          v-model="formProduct.cost"
          label="Product Cost"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please enter a product price',
          ]"
        />
        <q-input
          filled
          type="text"
          v-model="formProduct.address"
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import moment from "moment";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const $q = useQuasar();
const data = productStore();

const formProduct = ref({
  product_type_id: null,
  name_uz: "",
  cost: null,
  address: "",
  created_date: moment().format(),
});

const onSubmit = async () => {
  await data.addProduct(formProduct.value);

  router.push({ name: "IndexPage" });
  $q.notify({
    message: data.message,
    icon: "check",
    color: "positive",
  });
};
</script>
