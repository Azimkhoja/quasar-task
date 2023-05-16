import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const productStore = defineStore("productStore", {
  state: () => ({ productList: [], isLoading: true, message: null }),
  actions: {
    async getproducts() {
      try {
        const response = await axios.get(
          "http://94.158.54.194:9092/api/product"
          );

        this.productList = await response.data;
          return response.data
      } catch (e) {
        console.log(e);
        this.productList = null;
        this.message = '';
      }
    },
    async addProduct(payload) {
      try {
        const response = await axios.post('http://94.158.54.194:9092/api/product',payload);
        this.message = response.data

      } catch (error) {
        console.log(error);
        this.message = '';
      }
    },
    async getByID (id) {
      try {
        const response = await axios.get('http://94.158.54.194:9092/api/product/' + id)
        this.productList = response.data
        this.productListStatus.forEach((value) => {
          console.log(value);
        })
        console.log(response);
      } catch (error) {
        
      }
    },
    async updateProduct(payload) {
      try {
        const response = await axios.put(`http://94.158.54.194:9092/api/product`, payload)
        this.message = response.data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id) {
      try {
        const result = await axios.delete(
          `http://94.158.54.194:9092/api/product/${id}`
        );
        this.message = result.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
