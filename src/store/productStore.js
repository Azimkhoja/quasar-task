import {defineStore} from 'pinia'
import axios from 'axios'

export const productStore = defineStore('productStore', {
    state: () => (
        {productList: [], isLoading: true, status: null}
    ),
    actions: {
        async getproducts() {
            try {
                const response = await axios.get('http://94.158.54.194:9092/api/product')
                console.log(1);
                    return response.data
            } catch (e) {
                console.log(e)
                this.status = e.message;
            }
        },
        async addProduct () {
          try {
            const response = await axios.post(payload)
            if(response.status === 200){
              this.status = response.data.message;
            }
          } catch (error) {
            console.log(error)
            this.status = error.message
            
          }
        },
        async updateProduct() {
          try {
            
          } catch (error) {
            console.log(error);
          }
        },
        async deleteProduct(id) {
          try {
            const result = await axios.delete(`http://94.158.54.194:9092/api/products/${id}`)
            console.log(result);
            
          } catch (error) {
            console.log(error);
          }
        }
    },
})