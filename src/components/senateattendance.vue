<template>
    <div>
      <div class="row">
        <div class="col-6 principale">
          <h2>Attendance</h2>
          <p>
            The Constitution specifies that a majority of members constitutes
            a quorum to do business in each house. Representatives and
            senators rarely force the presence of a quorum by demanding quorum
            calls; thus, in most cases, debates continue even if a majority is
            not present.
          </p>
          <p>
            The Senate uses roll-call votes; a clerk calls out the names of
            all the senators, each senator stating "aye" or "no" when his or
            her name is announced. The House reserves roll-call votes for the
            most formal matters, as a roll-call of all 435 representatives
            takes quite some time; normally, members vote by electronic
            device. In the case of a tie, the motion in question fails. In the
            Senate, the Vice President may (if present) cast the tiebreaking
            vote.
          </p>
        </div>
        <div class="col-6 principale">
          <h2 class="centered">Senate at a glance</h2>
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
                <td>{{statisticsSenate.NrOfDemo}}</td>
                <td>{{statisticsSenate.AvgOfDemo + "%"}}</td>
              </tr>
              <tr>
                <td>Republicans</td>
                <td>{{statisticsSenate.NrOfRepu}}</td>
                <td>{{statisticsSenate.AvgOfRepu + "%"}}</td>
              </tr>
              <tr>
                <td>Independents</td>
                <td>{{statisticsSenate.NrOfInde}}</td>
                <td>{{statisticsSenate.AvgOfInde + "%"}}</td>
              </tr>
            </tbody>
            <tfoot id="Foot_at_Glance">
              <tr>
                <td>Total</td>
                <td>{{statisticsSenate.TotalReps}}</td>
                <td>{{statisticsSenate.TotalPerc + "%"}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-6">
          <h2>Least Engaged (Bottom 10% Attendance)</h2>
          <table class="table table-striped table-bordered table-hover table-sm">
            <thead class="stick">
              <tr>
                <th class="stick">Name</th>
                <th class="stick">Number of Missed Votes</th>
                <th class="stick">% Missed</th>
              </tr>
            </thead>
            <tbody id="Table_Least_Eng">
                <tr v-for="(person, idx) in leastMembersSenate" :key="idx">
                    <td><a v-bind:href="person.url" target="_blank">{{person.first_name}} {{person.middle_name}}
                    {{person.last_name}}</a></td>
                    <td>{{person.missed_votes}}</td>
                    <td>{{person.missed_votes_pct}}%</td>
                </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6">
          <h2>Most Engaged (Top 10% Attendance)</h2>
          <table class="table table-striped table-bordered table-hover table-sm">
            <thead class="stick">
              <tr>
                <th class="stick">Name</th>
                <th class="stick">Number of Missed Votes</th>
                <th class="stick">% Missed</th>
              </tr>
            </thead>
            <tbody id="Table_Most_Eng">
                <tr v-for="(person, idx) in mostMembersSenate" :key="idx">
                    <td><a v-bind:href="person.url" target="_blank">{{person.first_name}} {{person.middle_name}}
                    {{person.last_name}}</a></td>
                    <td>{{person.missed_votes}}</td>
                    <td>{{person.missed_votes_pct}}%</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: 'senateattendance',
    props: [
        'statisticsSenate',
        'leastMembersSenate',
        'mostMembersSenate'],

  data() {
    return {
    };
  },

  methods: {
  }
};
</script>

<style scoped>
.stick {
    position: sticky;
    top: 0px;
    background-color: rgb(221, 221, 221);
    border-bottom: 2px solid #dee2e6;
  }
</style>