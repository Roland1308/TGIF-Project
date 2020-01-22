<template>
  <div>
    <div class="row">
      <div class="col-6 principale">
        <h2>Party Loyalty</h2>
        <p>
          Those who consider themselves to be strong partisans, strong Democrats and
          strong Republicans respectively, tend to be the most faithful in voting for
          their party's nominee for office and legislation that backs their party's
          agenda.
        </p>
      </div>
      <div class="col-6 principale">
        <h2 class="centered">House at a glance</h2>
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Party</th>
              <th>Number of Reps</th>
              <th>% Voted with Party</th>
            </tr>
          </thead>
          <tbody id="Table_at_Glance">
            <tr>
              <td>Democrats</td>
              <td>{{statisticsHouse.NrOfDemo}}</td>
              <td>{{statisticsHouse.AvgOfDemo + "%"}}</td>
            </tr>
            <tr>
              <td>Republicans</td>
              <td>{{statisticsHouse.NrOfRepu}}</td>
              <td>{{statisticsHouse.AvgOfRepu + "%"}}</td>
            </tr>
            <tr>
              <td>Independents</td>
              <td>{{statisticsHouse.NrOfInde}}</td>
              <td>{{statisticsHouse.AvgOfInde + "%"}}</td>
            </tr>
          </tbody>
          <tfoot id="Foot_at_Glance">
            <tr>
              <td>Total</td>
              <td>{{statisticsHouse.TotalReps}}</td>
              <td>{{statisticsHouse.TotalPerc + "%"}}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row align-items-start">
      <div class="col-6">
        <h2>Least Loyal (Bottom 10% of Party)</h2>
        <table class="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number Party Votes</th>
              <th>% Party Votes</th>
            </tr>
          </thead>
          <tbody id="Table_Least_Eng">
            <tr v-for="(person, idx) in leastMembersHouseP" :key="idx">
              <td>
                <a v-bind:href="person.url" target="_blank">
                  {{person.first_name}} {{person.middle_name}}
                  {{person.last_name}}
                </a>
              </td>
              <td>{{person.missed_votes}}</td>
              <td>{{person.votes_with_party_pct}}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <h2>Most Loyal (Top 10% of Party)</h2>
        <table class="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number Party Votes</th>
              <th>% Party Votes</th>
            </tr>
          </thead>
          <tbody id="Table_Most_Eng">
            <tr v-for="(person, idx) in mostMembersHouseP" :key="idx">
              <td>
                <a v-bind:href="person.url" target="_blank">
                  {{person.first_name}} {{person.middle_name}}
                  {{person.last_name}}
                </a>
              </td>
              <td>{{person.missed_votes}}</td>
              <td>{{person.votes_with_party_pct}}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "houseparty",

computed: {
    statisticsHouse() {
      return this.$store.state.statisticsHouse;
    },
    leastMembersHouseP() {
      return this.$store.state.leastMembersHouseP;
    },
    mostMembersHouseP() {
      return this.$store.state.mostMembersHouseP;
    }
  },

  methods: {}
};
</script>

<style>
</style>
