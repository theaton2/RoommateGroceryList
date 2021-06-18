<template>
  <div class="personal">
    <div class="items" v-if="user">
      <h2>{{user.firstName}} {{user.lastName}} <button type="submit" v-on:click.prevent="logout">Logout</button></h2>
      <div class="heroin">
        <div class="heroinCircle">
          <form class="dirty-form">
            <fieldset>
              <legend>Add an Item description</legend>
              <input placeholder="Item" v-model="itemDescription">
            </fieldset>
            <fieldset>
              <button type="submit" @click.prevent="addItem">Add</button>
            </fieldset>
          </form>
        </div>
      </div>
      <grocery-list :groceryList="groceryList"/>
    </div>
    <Login v-else/>

  </div>
</template>

<script> 
import axios from 'axios';
import Login from '../components/Login.vue';
import GroceryList from '../components/GroceryList.vue';

export default {
  name: 'personal',
  components: { 
    GroceryList,
    Login 
  },
  data() {
    return {
      groceryList: [],
      error: '',
      itemDescription: '',
      isPurchased: false
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
   
  },

  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      await this.getGroceryList();
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  

  methods: {
    async getGroceryList() {
      try {
        let response = await axios.get("/api/groceryList");
        this.groceryList = response.data;
      }catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async addItem() {
      if (!this.itemDescription)
        return 

      try {
        await axios.post("/api/groceryList", {
          text: this.itemDescription,
          isPurchased: this.isPurchased
        });
        this.itemDescription = '';
        await this.getGroceryList();
      }catch (error) {
        console.log(error);
      }
    },
    
  }
  
}

</script>