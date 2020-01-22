<template>
  <div class="row align-items-end container" id="filters">
    <div class="col-6">
      <h2>List filtering:</h2>
      <h3>Choose Parties to be hidden.</h3>
      <label for="demoButt">Toggle Democrats</label>
      <input type="checkbox" id="demoButt" value="D" v-model="localBoxes" />
      <label for="repuButt">Toggle Republicans</label>
      <input type="checkbox" id="repuButt" value="R" v-model="localBoxes" />
      <label for="indeButt">Toggle Independents</label>
      <input type="checkbox" id="indeButt" value="I" v-model="localBoxes" />
    </div>
    <div class="col-6">
      <h3>Choose the State.</h3>
      <select id="selState" v-model="localState">
        <option value="all" id="all">All States</option>
        <option v-for="state in states" :key="state" :value="state" :id="state">{{state}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "filtering",

  data() {
    return {
      localBoxes: [],
      localState: "all",
    };
  },

  computed: {
    states() {
      return this.$store.state.states;
    }
  },

  methods: {
    ...mapActions([
      'funzioneCK',
      'funzioneST'
      ])
  },

  watch: {
    localBoxes() {
      this.funzioneCK(this.localBoxes);
    },
    localState() {
      this.funzioneST(this.localState);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
