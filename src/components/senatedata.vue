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
        <filtering
          :states="this.statesSenate"
          v-on:partyChange="funzioneCK"
          v-on:stateChange="funzioneST"
        ></filtering>
      </div>
      <!--Table-->
      <table class="table table-bordered table-hover table-sm">
        <thead>
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
        </thead>
        <tbody id="members_table">
          <tr v-for="(person, idx) in this.list" :key="idx">
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
import filtering from "./filtering";
export default {
  name: "senatedata",
  props: [
    "membersSenate",
    "statesSenate",
    "flagSort"
  ],
  components: {
    filtering
  },
  data() {
    return {
      list: this.membersSenate,
      checkBoxes: [],
      selectedState: "all",
      piede: '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>',
      oldColumn: 0
    };
  },
  methods: {
    //Sort
    sortColumn(column) {
      if (column != this.oldColumn) {
        this.flagSort[this.oldColumn].flag = 0;
        this.flagSort[this.oldColumn].arrow = this.flagSort[this.oldColumn].no;
        this.flagSort[column].flag = -1;
        this.flagSort[column].arrow = this.flagSort[column].down;
        this.oldColumn = column;
        this.sortedArray(column);
      } else {
        this.membersSenate.reverse();
        this.flagSort[column].flag *= -1;
        this.flagSort[column].arrow = this.flagSort[column].flag == -1 ?
          this.flagSort[column].down :
          this.flagSort[column].up;
      }
      this.filteredMembers = this.membersSenate;
    },
    sortedArray: function (y) {
      function compare(a, b) {
        switch (y) {
          case 0:
            if (a.last_name < b.last_name) return -1;
            else return 1;
          case 1:
            if (a.first_name < b.first_name) return -1;
            else return 1;
          case 2:
            if (a.party < b.party) return -1;
            else return 1;
          case 3:
            if (a.state < b.state) return -1;
            else return 1;
          case 4:
            return a.seniority - b.seniority;
          case 5:
            return a.votes_with_party_pct - b.votes_with_party_pct;
        }
      }
      return this.membersSenate.sort(compare);
    },

    funzioneCK(check) {
      this.checkBoxes = check;
      this.list = this.membersSenate.filter(
        x => x.state == this.selectedState || this.selectedState == "all"
      );
      this.list = this.list.filter(
        x =>
          x.party != this.checkBoxes[0] &&
          x.party != this.checkBoxes[1] &&
          x.party != this.checkBoxes[2]
      );
      this.list.length == 0
        ? (this.piede =
            '<tr class="error_foot"><td colspan="5">NO ITEMS TO DISPLAY</td></tr>')
        : (this.piede =
            '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>');
      return this.list;
    },

    funzioneST(stato) {
      this.selectedState = stato;
      this.list = this.membersSenate.filter(
        x => x.state == this.selectedState || this.selectedState == "all"
      );
      this.list = this.list.filter(
        x =>
          x.party != this.checkBoxes[0] &&
          x.party != this.checkBoxes[1] &&
          x.party != this.checkBoxes[2]
      );
      this.list.length == 0
        ? (this.piede =
            '<tr class="error_foot"><td colspan="5">NO ITEMS TO DISPLAY</td></tr>')
        : (this.piede =
            '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>');
      return this.list;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  thead th {
    /* display: table-header-group; */
    position: sticky;
    top: 0px;
    background-color: rgb(221, 221, 221);
    border-bottom: 2px solid #dee2e6;
  }
</style>
