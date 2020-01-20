<template>
        <div class="row align-items-end container" id="filters">
    <div class="col-6">
      <h2>List filtering:</h2>
      <h3>Choose Parties to be hidden.</h3>
      <label for="demoButt">Toggle Democrats</label>
      <input type="checkbox" id="demoButt" value="D" v-model="checkBoxes" />
      <label for="repuButt">Toggle Republicans</label>
      <input type="checkbox" id="repuButt" value="R" v-model="checkBoxes" />
      <label for="indeButt">Toggle Independents</label>
      <input type="checkbox" id="indeButt" value="I" v-model="checkBoxes" />
    </div>
    <div class="col-6">
      <h3>Choose the State.</h3>
      <select id="selState" v-model="selectedState">
        <option value="all" id="all">All States</option>
        <option v-for="state in states" :key="state" :value="state" :id="state">{{state}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "filtering",
  props:['states'],
  data() {
    return {
      checkBoxes: [],
      selectedState: "all",
    };
  },
  watch: {
    checkBoxes() {
      this.$emit("partyChange", this.checkBoxes);
    },
    selectedState() {
      this.$emit("stateChange", this.selectedState);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
