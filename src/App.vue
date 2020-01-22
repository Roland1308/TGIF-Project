<template>
  <div id="app">
    <appheader></appheader>
    <div id="progressBar" v-html="barra.loadBar" v-if="barra.showBar"></div>
    <router-view></router-view>
    <appfooter></appfooter>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

import appheader from "./components/header.vue";
import appfooter from "./components/footer.vue";

export default {
  name: "app",
  components: {
    appheader,
    appfooter
  },

  created() {
    this.readData({
      url: "https://api.propublica.org/congress/v1/113/senate/members.json",
      json: ""
    });

    this.readData({
      url: "https://api.propublica.org/congress/v1/113/house/members.json",
      json: ""
    });
  },

  computed: {
    ...mapGetters(["barra"])
  },

  methods: {
    ...mapActions(["readData"]),
  }
};
</script>

<style>
.col-8,
.principale {
  padding-top: 20px;
}
div > img {
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
.nav-link {
  background-color: rgb(221, 221, 221);
}
.dropdown-item.router-link-exact-active {
  color: white !important;
  background-color: #007bff !important;
}
.centered,
th:nth-child(n + 2),
td:nth-child(n + 2) {
  text-align: center;
}
#Foot_at_Glance,
.normal_foot {
  background-color: rgb(134, 185, 255);
  border-top: 2px black solid;
}
.normal_foot,
.error_foot {
  text-align: center;
  font-weight: bold;
}
.error_foot {
  background-color: rgb(230, 116, 116);
}
h2 {
  font-size: 1.4rem !important;
}
h3 {
  font-size: 1rem !important;
}
button,
select {
  margin-bottom: 10px !important;
}
.fas,
label,
input:hover {
  cursor: pointer !important;
}
input {
  margin-left: 4px !important;
  margin-right: 8px !important;
}
.fa-sort {
  color: rgb(155, 155, 155) !important;
}
</style>
