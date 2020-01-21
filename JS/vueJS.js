Vue.component(`navbar`, {
  template: `
    <nav>
      <div>
        <div class="d-flex mb-2">
          <a class="navbar-brand p-2 mr-auto" href="index.html"><img src="./Images/MyTgif.jpg"
              alt="Transparent Government in Fact" width="500" /></a>
          <p class="p-2 align-self-center">
            <a href="mailto:info@tgif.net"><img src="./Images/emailus.png" alt="Transparent Government in Fact"
                width="150" /></a>
          </p>
        </div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a :class="homeClass" :href="homeLink">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a :class="dataClass" data-toggle="dropdown" href="#">Congress 113</a>
            <div class="dropdown-menu">
              <a :class="dataSenateClass" :href="dataSenateLink">Senate</a>
              <a :class="dataHouseClass" :href="dataHouseLink">House</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a :class="attendanceClass" data-toggle="dropdown" href="#">Attendance</a>
            <div class="dropdown-menu">
              <a :class="attendanceSenateClass" :href="attendanceSenateLink">Senate</a>
              <a :class="attendanceHouseClass" :href="attendanceHouseLink">House</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a :class="partyClass" data-toggle="dropdown" href="#">Party Loyalty</a>
            <div class="dropdown-menu">
              <a :class="partySenateClass" :href="partySenateLink">Senate</a>
              <a :class="partyHouseClass" :href="partyHouseLink">House</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>`,

  data() {
    return {
      homeClass: window.location.href.includes("index")
        ? "nav-link active"
        : "nav-link",
      homeLink: window.location.href.includes("index")
        ? "javascript:void(0)"
        : "./index.html",
      dataSenateClass: window.location.href.includes("senate-vue-data")
        ? "dropdown-item active"
        : "dropdown-item",
      dataSenateLink: window.location.href.includes("senate-vue-data")
        ? "javascript:void(0)"
        : "./senate-vue-data.html",
      dataHouseClass: window.location.href.includes("house-vue-data")
        ? "dropdown-item active"
        : "dropdown-item",
      dataHouseLink: window.location.href.includes("house-vue-data")
        ? "javascript:void(0)"
        : "./house-vue-data.html",
      dataClass: window.location.href.includes("data")
        ? "nav-link dropdown-toggle active"
        : "nav-link dropdown-toggle",
      attendanceSenateClass: window.location.href.includes(
        "senate-vue-attendance-stats"
      )
        ? "dropdown-item active"
        : "dropdown-item",
      attendanceSenateLink: window.location.href.includes(
        "senate-vue-attendance-stats"
      )
        ? "javascript:void(0)"
        : "./senate-vue-attendance-stats.html",
      attendanceHouseClass: window.location.href.includes(
        "house-vue-attendance-stats"
      )
        ? "dropdown-item active"
        : "dropdown-item",
      attendanceHouseLink: window.location.href.includes(
        "house-vue-attendance-stats"
      )
        ? "javascript:void(0)"
        : "./house-vue-attendance-stats.html",
      attendanceClass: window.location.href.includes("attendance")
        ? "nav-link dropdown-toggle active"
        : "nav-link dropdown-toggle",
      partySenateClass: window.location.href.includes("senate-vue-party")
        ? "dropdown-item active"
        : "dropdown-item",
      partySenateLink: window.location.href.includes("senate-vue-party")
        ? "javascript:void(0)"
        : "./senate-vue-party-loyalty-stats.html",
      partyHouseClass: window.location.href.includes("house-vue-party")
        ? "dropdown-item active"
        : "dropdown-item",
      partyHouseLink: window.location.href.includes("house-vue-party")
        ? "javascript:void(0)"
        : "./house-vue-party-loyalty-stats.html",
      partyClass: window.location.href.includes("party")
        ? "nav-link dropdown-toggle active"
        : "nav-link dropdown-toggle"
    };
  }
});

let app = new Vue({
  el: "#myVue",

  data: {
    states: [],
    selectedState: "all",
    loadBar: "",
    showBar: false,
    members: [],
    checkBoxes: [],
    piede: '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>',
    statistics: {
      NrOfDemo: 0,
      NrOfRepu: 0,
      NrOfInde: 0,
      AvgOfDemo: 0,
      AvgOfRepu: 0,
      AvgOfInde: 0
    },
    SumVotesD: 0,
    SumVotesR: 0,
    SumVotesI: 0,
    TotalReps: 0,
    TotalPerc: 0,
    stringLeast: "",
    stringMost: "",
    arrowName: "fas fa-sort",
    arrowSurname: "fas fa-sort-alpha-down",
    arrowParty: "fas fa-sort",
    arrowState: "fas fa-sort",
    arrowSeniority: "fas fa-sort",
    arrowPercentage: "fas fa-sort",
    oldColumn: 0,

    flagSort: [
      {
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
    ]
  },

  methods: {
    //Fetch the data depending on the page we are in
    async getData() {
      const url = window.location.href.includes("senate")
        ? "https://api.propublica.org/congress/v1/113/senate/members.json"
        : "https://api.propublica.org/congress/v1/113/house/members.json";
      const decoder = new TextDecoder("utf-8");
      let json = [];
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-Key": "WVbDG0ZYtQmlLL3xpisypjMqHwegu1M7WDrWXUGO"
        }
      });
      const length = response.headers.get("Content-Length");
      if (!length) {
        // something was wrong with response, just give up
        return await response.arrayBuffer();
      }
      const array = new Uint8Array(length);
      let at = 0; // to index into the array
      const reader = response.body.getReader();
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
      this.members = json.results[0].members;
      if (window.location.href.includes("data")) {
        this.createDropdown();
      } else {
        this.fillStatistics();
        this.createLeastMost();
      }
    },

    //Create the options for the states' dropdown filtering menu
    createDropdown() {
      this.states = [
        ...new Set(this.members.map(member => member.state))
      ].sort();
    },

    //Fill the array "statistics"
    fillStatistics() {
      this.members.forEach(person => {
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
        person.comparingKey = window.location.href.includes("attendance")
          ? person.missed_votes_pct
          : person.votes_with_party_pct;
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
      this.statistics.sortedMembers = this.members
        .slice()
        .sort((a, b) => a.comparingKey - b.comparingKey);
      this.TotalReps =
        this.statistics.NrOfDemo +
        this.statistics.NrOfRepu +
        this.statistics.NrOfInde;
      this.TotalPerc =
        Math.round(
          ((this.SumVotesD + this.SumVotesR + this.SumVotesI) /
            this.TotalReps) *
            100
        ) / 100;
    },

    //Create DOM for Least and Most tables
    createLeastMost() {
      len = this.statistics.sortedMembers.length;
      cicle = Math.round(len / 10);
      lastI = 0;
      for (let i = 0; i < cicle; i++) {
        personLeast = this.statistics.sortedMembers[i];
        personMost = this.statistics.sortedMembers[len - 1 - i];
        //Least Table
        this.stringLeast += `<tr><td><a href="${
          personLeast.url
        }" target="_blank">${personLeast.first_name} ${
          personLeast.middle_name == null ? " " : personLeast.middle_name
        } ${personLeast.last_name}</a>`;
        this.stringLeast += `<td>${personLeast.missed_votes}</td>`;
        this.stringLeast += `<td>${personLeast.comparingKey}%</td></tr>`;
        //Most Table
        this.stringMost += `<tr><td><a href="${
          personMost.url
        }" target="_blank">${personMost.first_name} ${
          personMost.middle_name == null ? " " : personMost.middle_name
        } ${personMost.last_name}</a>`;
        this.stringMost += `<td>${personMost.missed_votes}</td>`;
        this.stringMost += `<td>${personMost.comparingKey}%</td></tr>`;
        this.lastI = i;
      }
      //Check for repetitive Least
      let lastLeast = this.statistics.sortedMembers[this.lastI];
      for (let f = this.lastI + 1; f < len; f++) {
        nextLeast = this.statistics.sortedMembers[f];
        if (nextLeast.comparingKey === lastLeast.comparingKey) {
          this.stringLeast += `<tr><td><a href="${
            nextLeast.url
          }" target="_blank">${nextLeast.first_name} ${
            nextLeast.middle_name == null ? " " : nextLeast.middle_name
          } ${nextLeast.last_name}</a>`;
          this.stringLeast += `<td>${nextLeast.missed_votes}</td>`;
          this.stringLeast += `<td>${nextLeast.comparingKey}%</td></tr>`;
        } else {
          break;
        }
      }
      //Check for repetitive Most
      let lastMost = this.statistics.sortedMembers[len - 1 - this.lastI];
      for (let f = len - 2 - this.lastI; f >= 0; f--) {
        let nextMost = this.statistics.sortedMembers[f];
        if (nextMost.comparingKey === lastMost.comparingKey) {
          this.stringMost += `<tr><td><a href="${
            nextMost.url
          }" target="_blank">${nextMost.first_name} ${
            nextMost.middle_name == null ? " " : nextMost.middle_name
          } ${nextMost.last_name}</a>`;
          this.stringMost += `<td>${nextMost.missed_votes}</td>`;
          this.stringMost += `<td>${nextMost.comparingKey}%</td></tr>`;
        } else {
          break;
        }
      }
    },

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
        this.members.reverse();
        this.flagSort[column].flag *= -1;
        this.flagSort[column].arrow =
          this.flagSort[column].flag == -1
            ? this.flagSort[column].down
            : this.flagSort[column].up;
      }
      this.filteredMembers = this.members;
    },
    sortedArray: function(y) {
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
      return this.members.sort(compare);
    }
  },

  computed: {
    //Filter for checkBoxes and dropdown
    filteredMembers: {
      get() {
        filtered = this.members.filter(
          x => x.state == this.selectedState || this.selectedState == "all"
        );
        filtered = filtered.filter(
          x =>
            x.party != this.checkBoxes[0] &&
            x.party != this.checkBoxes[1] &&
            x.party != this.checkBoxes[2]
        );
        filtered.length == 0
          ? (this.piede =
              '<tr class="error_foot"><td colspan="5">NO ITEMS TO DISPLAY</td></tr>')
          : (this.piede =
              '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>');
        return filtered;
      },
      set() {
        return;
      }
    }
  },

  created() {
    members = this.getData();
  }
});
