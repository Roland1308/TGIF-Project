import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    membersSenate: [],
    membersHouse: [],
    list: [],
    piede: "",
    statisticsSenate: {
      NrOfDemo: 0,
      NrOfRepu: 0,
      NrOfInde: 0,
      AvgOfDemo: 0,
      AvgOfRepu: 0,
      AvgOfInde: 0,
      TotalReps: 0,
      TotalPerc: 0
    },
    statisticsHouse: {
      NrOfDemo: 0,
      NrOfRepu: 0,
      NrOfInde: 0,
      AvgOfDemo: 0,
      AvgOfRepu: 0,
      AvgOfInde: 0,
      TotalReps: 0,
      TotalPerc: 0
    },
    leastMembersSenateA: {},
    mostMembersSenateA: {},
    leastMembersHouseA: {},
    mostMembersHouseA: {},
    leastMembersSenateP: {},
    mostMembersSenateP: {},
    leastMembersHouseP: {},
    mostMembersHouseP: {},
    statesSenate: {},
    statesHouse: {},
    states: {},
    selectedState: "all",
    checkBoxes: [],
    barra: {
      showBar: true,
      loadBar: " "
    }
  },

  getters: {
    list: state => {
      let list = state.membersSenate;
      return list;
    },
    barra: state => {
      return state.barra;
    }
  },

  mutations: {
    fillStatistics: (state, payload) => {
      let membersGeneric = payload.json;
      let statisticsGeneric = {
        NrOfDemo: 0,
        NrOfRepu: 0,
        NrOfInde: 0,
        AvgOfDemo: 0,
        AvgOfRepu: 0,
        AvgOfInde: 0,
        TotalReps: 0,
        TotalPerc: 0
      };
      let SumVotesD = 0;
      let SumVotesR = 0;
      let SumVotesI = 0;
      membersGeneric.forEach(person => {
        switch (person.party) {
          case "D":
            statisticsGeneric.NrOfDemo++;
            SumVotesD += person.votes_with_party_pct;
            break;
          case "R":
            statisticsGeneric.NrOfRepu++;
            SumVotesR += person.votes_with_party_pct;
            break;
          case "I":
            statisticsGeneric.NrOfInde++;
            SumVotesI += person.votes_with_party_pct;
            break;
        }
      });
      statisticsGeneric.AvgOfDemo =
        statisticsGeneric.NrOfDemo == 0
          ? 0
          : Math.round((SumVotesD / statisticsGeneric.NrOfDemo) * 100) / 100;
      statisticsGeneric.AvgOfRepu =
        statisticsGeneric.NrOfRepu == 0
          ? 0
          : Math.round((SumVotesR / statisticsGeneric.NrOfRepu) * 100) / 100;
      statisticsGeneric.AvgOfInde =
        statisticsGeneric.NrOfInde == 0
          ? 0
          : Math.round((SumVotesI / statisticsGeneric.NrOfInde) * 100) / 100;
      statisticsGeneric.TotalReps =
        statisticsGeneric.NrOfDemo +
        statisticsGeneric.NrOfRepu +
        statisticsGeneric.NrOfInde;
      statisticsGeneric.TotalPerc =
        Math.round(
          ((SumVotesD + SumVotesR + SumVotesI) / statisticsGeneric.TotalReps) *
            100
        ) / 100;
      //Create Least and Most arrays
      let sortedMembersAttendance = membersGeneric
        .slice()
        .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
      let len = sortedMembersAttendance.length;
      let tenPercent = Math.round(len / 10) - 1;
      let endLeast = tenPercent;
      let endMost = len - 1 - tenPercent;
      //Check for repetitive Least
      let lastLeast = sortedMembersAttendance[tenPercent];
      for (let f = tenPercent; f < len; f++) {
        let nextLeast = sortedMembersAttendance[f];
        if (nextLeast.missed_votes_pct === lastLeast.missed_votes_pct) {
          endLeast++;
        } else {
          break;
        }
      }
      //Check for repetitive Most
      let lastMost = sortedMembersAttendance[len - 1 - tenPercent];
      for (let f = len - 1 - tenPercent; f >= 0; f--) {
        let nextMost = sortedMembersAttendance[f];
        if (nextMost.missed_votes_pct === lastMost.missed_votes_pct) {
          endMost--;
        } else {
          break;
        }
      }
      let leastMembersGenericA = sortedMembersAttendance.slice(0, endLeast);
      let mostMembersGenericA = sortedMembersAttendance
        .slice(endMost + 1, len)
        .reverse();
      let sortedMembersParty = membersGeneric
        .slice()
        .sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
      len = sortedMembersParty.length;
      tenPercent = Math.round(len / 10) - 1;
      endLeast = tenPercent;
      endMost = len - 1 - tenPercent;
      //Check for repetitive Least
      lastLeast = sortedMembersParty[tenPercent];
      for (let f = tenPercent; f < len; f++) {
        let nextLeast = sortedMembersParty[f];
        if (nextLeast.votes_with_party_pct === lastLeast.votes_with_party_pct) {
          endLeast++;
        } else {
          break;
        }
      }
      //Check for repetitive Most
      lastMost = sortedMembersParty[len - 1 - tenPercent];
      for (let f = len - 1 - tenPercent; f >= 0; f--) {
        let nextMost = sortedMembersParty[f];
        if (nextMost.votes_with_party_pct === lastMost.votes_with_party_pct) {
          endMost--;
        } else {
          break;
        }
      }
      let leastMembersGenericP = sortedMembersParty.slice(0, endLeast);
      let mostMembersGenericP = sortedMembersParty
        .slice(endMost + 1, len)
        .reverse();

      if (payload.url.includes("senate")) {
        state.membersSenate = membersGeneric;
        state.leastMembersSenateA = leastMembersGenericA;
        state.mostMembersSenateA = mostMembersGenericA;
        state.leastMembersSenateP = leastMembersGenericP;
        state.mostMembersSenateP = mostMembersGenericP;
        state.statisticsSenate = statisticsGeneric;
        state.statesSenate = [
          ...new Set(state.membersSenate.map(member => member.state))
        ].sort();
      } else {
        state.membersHouse = membersGeneric;
        state.leastMembersHouseA = leastMembersGenericA;
        state.mostMembersHouseA = mostMembersGenericA;
        state.leastMembersHouseP = leastMembersGenericP;
        state.mostMembersHouseP = mostMembersGenericP;
        state.statisticsHouse = statisticsGeneric;
        state.statesHouse = [
          ...new Set(state.membersHouse.map(member => member.state))
        ].sort();
      }
    },

    loadbar: (state, bar) => {
      state.barra = bar;
    },

    funzioneCK: (state, payload) => {
      state.checkBoxes = payload;
      if (window.location.pathname == "/senatedata") {
        state.list = state.membersSenate.filter(
        x => x.state == state.selectedState || state.selectedState == "all"
      );
        } else {
          state.list = state.membersHouse.filter(
            x => x.state == state.selectedState || state.selectedState == "all"
          );
        }
      state.list = state.list.filter(
        x =>
          x.party != state.checkBoxes[0] &&
          x.party != state.checkBoxes[1] &&
          x.party != state.checkBoxes[2]
      );
      state.list.length == 0
        ? (state.piede =
            '<tr class="error_foot"><td colspan="5">NO ITEMS TO DISPLAY</td></tr>')
        : (state.piede =
            '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>');
    },

    
    funzioneST: (state, payload) => {
      state.selectedState = payload;
      if (window.location.pathname == "senatedata") {
        state.list = state.membersSenate.filter(
        x => x.state == state.selectedState || state.selectedState == "all"
      );
        } else {
          state.list = state.membersSenate.filter(
            x => x.state == state.selectedState || state.selectedState == "all"
          );
        }
      state.list = state.list.filter(
        x =>
          x.party != state.checkBoxes[0] &&
          x.party != state.checkBoxes[1] &&
          x.party != state.checkBoxes[2]
      );
      state.list.length == 0
        ? (state.piede =
            '<tr class="error_foot"><td colspan="5">NO ITEMS TO DISPLAY</td></tr>')
        : (state.piede =
            '<tr class="normal_foot"><td colspan="5">END OF LIST</td></tr>');
    }
  },

  actions: {
    async readData(context, payload) {
      const decoder = new TextDecoder("utf-8");
      let response = await fetch(payload.url, {
        method: "GET",
        headers: {
          "X-API-Key": "WVbDG0ZYtQmlLL3xpisypjMqHwegu1M7WDrWXUGO"
        }
      });
      let length = response.headers.get("Content-Length");
      if (!length) {
        // something was wrong with response, just give up
        return await response.arrayBuffer();
      }
      let array = new Uint8Array(length);
      let at = 0; // to index into the array
      let reader = response.body.getReader();
      for (;;) {
        let barra = {
          showBar: true,
          loadBar: " "
        };
        let { done, value } = await reader.read();
        if (done) {
          break;
        }
        array.set(value, at);
        at += value.length;
        let progBar = (at / length).toFixed(2) * 100;
        barra.showBar = progBar < 100;
        barra.loadBar = `
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
        context.commit("loadbar", barra);
      }
      this.json = JSON.parse(decoder.decode(array));
      payload.json = this.json.results[0].members;
      context.commit('fillStatistics', payload);
    },
    funzioneCK(context, payload) {
      context.commit('funzioneCK', payload);
    },
    funzioneST(context, payload) {
      context.commit('funzioneST', payload);
    }
  },

  modules: {}
});
