<template>
  <div class="principale">
    <h2>Congressmen</h2>
    <p>
      The major power of the House is to pass federal legislation that affects
      the entire country, although its bills must also be passed by the Senate
      and further agreed to by the U.S. President before becoming law (unless
      both the House and Senate re-pass the legislation with a two-thirds
      majority in each chamber). The House has some exclusive powers: the
      power to initiate revenue bills, to impeach officials (impeached
      officials are subsequently tried in the Senate), and to elect the U.S.
      President in case there is no majority in the Electoral College.
    </p>
    <p>
      Each U.S. state is represented in the House in proportion to its
      population as measured in the census, but every state is entitled to at
      least one representative.
    </p>
    <div id="loadedPage">
      <div class="row align-items-end container" id="filters">
         <filtering></filtering>
      </div>
      <!--Table-->
      <table class="table table-bordered table-hover table-sm">
<!--         <thead>
          <tr>
            <th>
              Congressman:
              <i id="name" :class="flagSort[1].arrow" v-on:click="sortColumn(1)">First Name</i>,
              <i id="surname" :class="flagSort[0].arrow" v-on:click="sortColumn(0)">Last Name</i>
            </th>
            <th>
              <i id="party" :class="flagSort[2].arrow" v-on:click="sortColumn(2)">Party</i>
            </th>
            <th>
              <i id="state" :class="flagSort[3].arrow" v-on:click="sortColumn(3)">State</i>
            </th>
            <th>
              <i id="seniority" :class="flagSort[4].arrow" v-on:click="sortColumn(4)">Seniority</i>
            </th>
            <th>
              <i
                id="percentage"
                :class="flagSort[5].arrow"
                v-on:click="sortColumn(5)"
              >Percentage of votes</i>
            </th>
          </tr>
        </thead> -->
        <tbody id="members_table">
          <tr v-for="(person, idx) in list" :key="idx">
            <td>
              <a v-bind:href="person.url" target="_blank">
                {{person.first_name}} {{person.middle_name}}
                {{person.last_name}}
              </a>
            </td>
            <td>{{person.party}}</td>
            <td>{{person.state}}</td>
            <td>{{person.seniority}}</td>
            <td>{{person.votes_with_party_pct}}%</td>
          </tr>
        </tbody>
        <tfoot id="members_foot" v-html="piede"></tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import filtering from "./filtering"

export default {
  name: "housedata",
  components: {
    filtering
  },

    created() {
    this.$store.state.list = this.membersHouse
    this.$store.state.states = this.statesHouse;
  },

  computed: {
    statesHouse() {
      return this.$store.state.statesHouse;
    },
    membersHouse() {
      return this.$store.state.membersHouse;
    },
    piede() {
      return this.$store.state.piede;
    },
    list() {
      return this.$store.state.list;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
