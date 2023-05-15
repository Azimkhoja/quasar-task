<template>
  <q-page>

    <div class="q-pa-xl" style="max-width: 500px">
      
      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      >
      <q-input
      filled
      v-model="formProduct.product_type_id"
      label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="formProduct.name_uz"
        label="Your age *"
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <q-input
        filled
        type="number"
        v-model="formProduct.cost"
        label="Your age *"
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <q-input
        filled
        type="number"
        v-model="formProduct.address"
        label="Your age *"
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    
  </div>
</q-page>
</template>

<script setup>
import {ref} from 'vue'
const formProduct = ref({
      product_type_id: 0,
      name_uz: '',
      cost: 0,
      address: '',
      created_date: ''
    })

</script>
