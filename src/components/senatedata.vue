<template>
  <div class="principale">
    <h2>Senators</h2>
    <p>
      First convened in 1789, the composition and powers of the Senate are
      established in Article One of the U.S. Constitution. Each state is
      represented by two senators, regardless of population, who serve
      staggered six-year terms. The Senate has several exclusive powers not
      granted to the House, including consenting to treaties as a precondition
      to their ratification and consenting to or confirming appointments of
      Cabinet secretaries, federal judges, other federal executive officials,
      military officers, regulatory officials, ambassadors, and other federal
      uniformed officers, as well as trial of federal officials impeached by
      the House.
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
              Senator:
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
  name: "senatedata",
  components: {
    filtering
  },

  created() {
    this.$store.state.list = this.membersSenate;
    this.$store.state.states = this.statesSenate;
  },

  computed: {
    statesSenate() {
      return this.$store.state.statesSenate;
    },
    membersSenate() {
      return this.$store.state.membersSenate;
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
