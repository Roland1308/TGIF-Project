<template>
  <div id="app">
    <appheader></appheader>
    <div id="progressBar" v-html="loadBar" v-if="showBar"></div>
    <router-view
      :membersHouse="membersHouse"
      :membersSenate="membersSenate"
      :statisticsSenate="statisticsSenate"
      :statisticsHouse="statisticsHouse"
      :leastMembersSenate="leastMembersSenate"
      :mostMembersSenate="mostMembersSenate"
      :leastMembersHouse="leastMembersHouse"
      :mostMembersHouse="mostMembersHouse"
      :leastMembersSenateParty="leastMembersSenateParty"
      :mostMembersSenateParty="mostMembersSenateParty"
      :leastMembersHouseParty="leastMembersHouseParty"
      :mostMembersHouseParty="mostMembersHouseParty"
      :statesSenate="statesSenate"
      :statesHouse="statesHouse"
      :flagSort="flagSort"
    ></router-view>
    <appfooter></appfooter>
  </div>
</template>

<script>
import appheader from "./components/header.vue";
import appfooter from "./components/footer.vue";

export default {
  name: "app",
  components: {
    appheader,
    appfooter
  },
  data() {
    return {
      membersSenate: "",
      membersHouse: "",
      statisticsSenate: {},
      statisticsHouse: {},
      leastMembersSenate: {},
      mostMembersSenate: {},
      leastMembersHouse: {},
      mostMembersHouse: {},
      leastMembersSenateParty: {},
      mostMembersSenateParty: {},
      leastMembersHouseParty: {},
      mostMembersHouseParty: {},
      statesSenate: {},
      statesHouse: {},
      statistics: {},
      showBar: true,
      loadBar: "",
      flagSort: [{
        flag: -1,
        id: "surname",
        up: "fas fa-sort-alpha-up",
        down: "fas fa-sort-alpha-down",
        no: "fas fa-sort",
        arrow: "fas fa-sort-alpha-down"
      },
      {
        flag: 0,
        id: "name",
        up: "fas fa-sort-alpha-up",
        down: "fas fa-sort-alpha-down",
        no: "fas fa-sort",
        arrow: "fas fa-sort"
      },
      {
        flag: 0,
        id: "party",
        up: "fas fa-sort-alpha-up",
        down: "fas fa-sort-alpha-down",
        no: "fas fa-sort",
        arrow: "fas fa-sort"
      },
      {
        flag: 0,
        id: "state",
        up: "fas fa-sort-alpha-up",
        down: "fas fa-sort-alpha-down",
        no: "fas fa-sort",
        arrow: "fas fa-sort"
      },
      {
        flag: 0,
        id: "seniority",
        up: "fas fa-sort-numeric-up",
        down: "fas fa-sort-numeric-down",
        no: "fas fa-sort",
        arrow: "fas fa-sort"
      },
      {
        flag: 0,
        id: "percentage",
        up: "fas fa-sort-numeric-up",
        down: "fas fa-sort-numeric-down",
        no: "fas fa-sort",
        arrow: "fas fa-sort"
      }
    ]};
  },

  created() {
    this.readData();
  },

  methods: {
    async readData() {
      const decoder = new TextDecoder("utf-8");
      let response = await fetch(
        "https://api.propublica.org/congress/v1/113/senate/members.json",
        {
          method: "GET",
          headers: {
            "X-API-Key": "WVbDG0ZYtQmlLL3xpisypjMqHwegu1M7WDrWXUGO"
          }
        }
      );
      let length = response.headers.get("Content-Length");
      if (!length) {
        // something was wrong with response, just give up
        return await response.arrayBuffer();
      }
      let array = new Uint8Array(length);
      let at = 0; // to index into the array
      let reader = response.body.getReader();
      for (;;) {
        let { done, value } = await reader.read();
        if (done) {
          break;
        }
        array.set(value, at);
        at += value.length;
        let progBar = (at / length).toFixed(2) * 100;
        this.showBar = progBar < 100;
        this.loadBar = `
            <div
                style="width: ${progBar}%; height: 40px; padding-top: 5px;
                 background: repeating-linear-gradient(
                  45deg,
                  rgb(${255 - 1.59 * progBar}, ${1.09 * progBar}, ${1.88 *
          progBar}),
                  rgb(${255 - 1.59 * progBar}, ${1.09 * progBar}, ${1.88 *
          progBar}) 10px,
                  rgb(${255 - 1.85 * progBar}, ${0.82 * progBar}, ${1.52 *
          progBar}) 10px,
                  rgb(${255 - 1.85 * progBar}, ${0.82 * progBar}, ${1.52 *
          progBar}) 20px
                ); color: white; text-align: center;"
              >
                Loading...
              </div>`;
      }
      let json = JSON.parse(decoder.decode(array));
      this.membersSenate = json.results[0].members;
      this.fillStatistics(this.membersSenate);
      this.statisticsSenate = this.statistics;
      this.leastMembersSenate = this.leastMembers;
      this.mostMembersSenate = this.mostMembers.reverse();
      this.leastMostParty(this.membersSenate);
      this.leastMembersSenateParty = this.leastMembers;
      this.mostMembersSenateParty = this.mostMembers.reverse();
      this.createDropdown(this.membersSenate);
      this.statesSenate = this.states;

      response = await fetch(
        "https://api.propublica.org/congress/v1/113/house/members.json",
        {
          method: "GET",
          headers: {
            "X-API-Key": "WVbDG0ZYtQmlLL3xpisypjMqHwegu1M7WDrWXUGO"
          }
        }
      );
      length = response.headers.get("Content-Length");
      if (!length) {
        // something was wrong with response, just give up
        return await response.arrayBuffer();
      }
      array = new Uint8Array(length);
      at = 0; // to index into the array
      reader = response.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        array.set(value, at);
        at += value.length;
        let progBar = (at / length).toFixed(2) * 100;
        this.showBar = progBar < 100;
        this.loadBar = `
            <div
                style="width: ${progBar}%; height: 40px; padding-top: 5px;
                 background: repeating-linear-gradient(
                  45deg,
                  rgb(${255 - 1.59 * progBar}, ${1.09 * progBar}, ${1.88 *
          progBar}),
                  rgb(${255 - 1.59 * progBar}, ${1.09 * progBar}, ${1.88 *
          progBar}) 10px,
                  rgb(${255 - 1.85 * progBar}, ${0.82 * progBar}, ${1.52 *
          progBar}) 10px,
                  rgb(${255 - 1.85 * progBar}, ${0.82 * progBar}, ${1.52 *
          progBar}) 20px
                ); color: white; text-align: center;"
              >
                Loading...
              </div>`;
      }
      json = JSON.parse(decoder.decode(array));
      this.membersHouse = json.results[0].members;
      this.fillStatistics(this.membersHouse);
      this.statisticsHouse = this.statistics;
      this.leastMembersHouse = this.leastMembers;
      this.mostMembersHouse = this.mostMembers.reverse();
      this.leastMostParty(this.membersHouse);
      this.leastMembersHouseParty = this.leastMembers;
      this.mostMembersHouseParty = this.mostMembers.reverse();
      this.createDropdown(this.membersHouse);
      this.statesHouse = this.states;
    },

    //Create the options for the states' dropdown filtering menu
    createDropdown(members) {
      this.states = [
        ...new Set(members.map(member => member.state))
      ].sort();
      return this.states;
    },

    //Fill the arrays "statistics"
    fillStatistics(members) {
      this.statistics = {
        NrOfDemo: 0,
        NrOfRepu: 0,
        NrOfInde: 0,
        AvgOfDemo: 0,
        AvgOfRepu: 0,
        AvgOfInde: 0,
        TotalReps: 0,
        TotalPerc: 0
      };
      this.SumVotesD = 0;
      this.SumVotesR = 0;
      this.SumVotesI = 0;
      members.forEach(person => {
        switch (person.party) {
          case "D":
            this.statistics.NrOfDemo++;
            this.SumVotesD += person.votes_with_party_pct;
            break;
          case "R":
            this.statistics.NrOfRepu++;
            this.SumVotesR += person.votes_with_party_pct;
            break;
          case "I":
            this.statistics.NrOfInde++;
            this.SumVotesI += person.votes_with_party_pct;
            break;
        }
      });
      this.statistics.AvgOfDemo =
        this.statistics.NrOfDemo == 0
          ? 0
          : Math.round((this.SumVotesD / this.statistics.NrOfDemo) * 100) / 100;
      this.statistics.AvgOfRepu =
        this.statistics.NrOfRepu == 0
          ? 0
          : Math.round((this.SumVotesR / this.statistics.NrOfRepu) * 100) / 100;
      this.statistics.AvgOfInde =
        this.statistics.NrOfInde == 0
          ? 0
          : Math.round((this.SumVotesI / this.statistics.NrOfInde) * 100) / 100;
      this.statistics.TotalReps =
        this.statistics.NrOfDemo +
        this.statistics.NrOfRepu +
        this.statistics.NrOfInde;
      this.statistics.TotalPerc =
        Math.round(
          ((this.SumVotesD + this.SumVotesR + this.SumVotesI) /
            this.statistics.TotalReps) *
            100
        ) / 100;
      //Create Least and Most arrays
      let sortedMembers = members
        .slice()
        .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
      let len = sortedMembers.length;
      let tenPercent = Math.round(len / 10) - 1;
      let endLeast = tenPercent;
      let endMost = len - 1 - tenPercent;
      //Check for repetitive Least
      let lastLeast = sortedMembers[tenPercent];
      for (let f = tenPercent; f < len; f++) {
        let nextLeast = sortedMembers[f];
        if (nextLeast.missed_votes_pct === lastLeast.missed_votes_pct) {
          endLeast++;
        } else {
          break;
        }
      }
      //Check for repetitive Most
      let lastMost = sortedMembers[len - 1 - tenPercent];
      for (let f = len - 1 - tenPercent; f >= 0; f--) {
        let nextMost = sortedMembers[f];
        if (nextMost.missed_votes_pct === lastMost.missed_votes_pct) {
          endMost--;
        } else {
          break;
        }
      }
      this.leastMembers = sortedMembers.slice(0, endLeast);
      this.mostMembers = sortedMembers.slice(endMost + 1, len);
      return [this.statistics, this.leastMembers, this.mostMembers];
    },

    //Create Least and Most for Party
    leastMostParty(members) {
      let sortedMembers = members
        .slice()
        .sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
      let len = sortedMembers.length;
      let tenPercent = Math.round(len / 10) - 1;
      let endLeast = tenPercent;
      let endMost = len - 1 - tenPercent;
      //Check for repetitive Least
      let lastLeast = sortedMembers[tenPercent];
      for (let f = tenPercent; f < len; f++) {
        let nextLeast = sortedMembers[f];
        if (nextLeast.votes_with_party_pct === lastLeast.votes_with_party_pct) {
          endLeast++;
        } else {
          break;
        }
      }
      //Check for repetitive Most
      let lastMost = sortedMembers[len - 1 - tenPercent];
      for (let f = len - 1 - tenPercent; f >= 0; f--) {
        let nextMost = sortedMembers[f];
        if (nextMost.votes_with_party_pct === lastMost.votes_with_party_pct) {
          endMost--;
        } else {
          break;
        }
      }
      this.leastMembers = sortedMembers.slice(0, endLeast);
      this.mostMembers = sortedMembers.slice(endMost + 1, len);
      return [this.leastMembers, this.mostMembers];
    }
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
