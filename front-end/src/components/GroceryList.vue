<template>
  <div>
    <section class="groceryList">
        <!-- <h2>{{this.$root.$data.user.firstName}} {{this.$root.$data.user.lastName}} <button @click="logout">Logout</button></h2> -->
      <div class="listItem" v-for="item in groceryList" v-bind:key="item._id">
        <div class="itemInfo">
          <input type="checkbox" v-model="item.isPurchased" @click.prevent="purchased(item)"/>
          <label v-bind:class="{ completed: item.isPurchased }">{{ item.text }}   </label>
          <button type="submit" @click.prevent="deleteItem(item)">Delete</button>
        </div>
        
      </div>
      <br/><br/><br/>
      <button type="submit" @click.prevent="deletePurchased">Delete Purchased Items</button>
      <hr/>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GroceryList',
  props: {
    groceryList: Array
  },
  methods: {
    async purchased(item) {
      try {
        await axios.put("/api/groceryList/" + item._id, {
          isPurchased: !item.isPurchased
        });
        item.isPurchased = !item.isPurchased;
        return true;
      }catch(error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/groceryList/" + item._id);
        this.groceryList = this.groceryList.filter(s => s._id != item._id);
        return true;
      } catch (error){
        console.log(error);
      }
    },
    async deletePurchased() {
      try {
        for(let i = 0; i < this.groceryList.length; ++i){
          if(this.groceryList[i].isPurchased === true)
            await axios.delete("/api/groceryList/" + this.groceryList[i]._id);
        }
        this.groceryList = this.groceryList.filter(s => s.isPurchased === false);
        return true;
      }catch(error){
        console.log(error);
      }
    }
  }
  
    

}
</script>
