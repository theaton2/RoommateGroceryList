<template>
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
</template>

<script> 
import axios from 'axios';
export default {
  data() {
    return {
      itemDescription: '',
      isPurchased: false
    }
  },
  methods: {
    async addItem() {
      if (!this.itemDescription)
        return 

      try {
        await axios.post("/api/groceryList", {
          text: this.itemDescription,
          isPurchased: this.isPurchased
        });
        this.itemDescription = '';
      }catch (error) {
        console.log(error);
      }
    }
  }
}

</script>