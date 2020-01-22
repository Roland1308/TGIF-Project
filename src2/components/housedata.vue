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
        <filtering
          :states="this.statesHouse"
          v-on:partyChange="funzioneCK"
          v-on:stateChange="funzioneST"
        ></filtering>
      </div>
      <!--Table-->
      <table class="table table-bordered table-hover table-sm">
        <thead>
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
  name: "housedata",
  props: [
    "membersHouse",
    "statesHouse",
    "flagSort"
    ],
  components: {
    filtering
  },
  data() {
    return {
      list: this.membersHouse,
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
        this.membersHouse.reverse();
        this.flagSort[column].flag *= -1;
        this.flagSort[column].arrow = this.flagSort[column].flag == -1 ?
          this.flagSort[column].down :
          this.flagSort[column].up;
      }
      this.filteredMembers = this.membersHouse;
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
      return this.membersHouse.sort(compare);
    },
    funzioneCK(check) {
      this.checkBoxes = check;
      this.list = this.membersHouse.filter(
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
      this.list = this.membersHouse.filter(
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
    position: sticky;
    top: 0px;
    background-color: rgb(221, 221, 221);
    border-bottom: 2px solid #dee2e6;
  }
</style>
