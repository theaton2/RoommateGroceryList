<template>
  <div class="home">
    <grocery-list :groceryList="groceryList"/>
    <p v-if="error">{{error}}</p>
    <router-link to="/personal">Personal List</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import GroceryList from '../components/GroceryList.vue';

export default {
  name: "Home",
  components: {
    GroceryList,
  },
  data() {
    return {
      groceryList: [],
      error: '',
    }
  },
  created() {
    this.getGroceryList();
  },
  

  methods: {
    async getGroceryList() {
      try {
        let response = await axios.get("/api/groceryList/all");
        this.groceryList = response.data;
      }catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
};
</script>
