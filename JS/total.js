//GLOBAL SCOPE VARIABLE DEFINITION

let members = [],
  filteredMembers = [],
  flagSort = [{
      flag: -1,
      id: "surname",
      up: "fa-sort-alpha-up",
      down: "fa-sort-alpha-down"
    },
    {
      flag: 0,
      id: "name",
      up: "fa-sort-alpha-up",
      down: "fa-sort-alpha-down"
    },
    {
      flag: 0,
      id: "party",
      up: "fa-sort-alpha-up",
      down: "fa-sort-alpha-down"
    },
    {
      flag: 0,
      id: "state",
      up: "fa-sort-alpha-up",
      down: "fa-sort-alpha-down"
    },
    {
      flag: 0,
      id: "seniority",
      up: "fa-sort-numeric-up",
      down: "fa-sort-numeric-down"
    },
    {
      flag: 0,
      id: "percentage",
      up: "fa-sort-numeric-up",
      down: "fa-sort-numeric-down"
    }
  ],
  newSortGlobal = 0,
  statistics = {
    NrOfDemo: 0,
    NrOfRepu: 0,
    NrOfInde: 0,
    AvgOfDemo: 0,
    AvgOfRepu: 0,
    AvgOfInde: 0,
    sortedMembers: []
  },
  SumVotesD = 0,
  SumVotesR = 0,
  SumVotesI = 0;

//LAUNCH!
getData();

//FUNCTIONS DECLARATION

//Fetch the data depending on the page we are in
async function getData() {
  const url = window.location.href.includes("senate") ?
    "https://api.propublica.org/congress/v1/113/senate/members.json" :
    "https://api.propublica.org/congress/v1/113/house/members.json";
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
    const {
      done,
      value
    } = await reader.read();
    if (done) {
      break;
    }
    array.set(value, at);
    at += value.length;
    let progBar = (at / length).toFixed(2) * 100;
    document.getElementById("progressBar").innerHTML = `
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
  members = json.results[0].members;
  filteredMembers = members;
  document.getElementById("progressBar").innerHTML =
    "<div style='display: none'></div>";
  document.getElementById("loadedPage").style.display = "block";
  if (window.location.href.includes("data")) {
    createDropdown();
    createTable(members);
    addListener();
  } else {
    fillStatistics();
    createGlance();
    createLeastEng();
  }
}

//Create the dropdown menu for filtering the states
createDropdown = () => {
  let states = [...new Set(members.map(member => member.state))].sort();
  //Create DOM elements
  let sel = document.getElementById("selState");
  let string = "<option id = 'All States' value = 'all'>All States</option>";
  states.forEach(stato => {
    string += `<option id = ${stato} value = ${stato}>${stato}</option>`;
  });
  sel.innerHTML = string;
};

//Create the data table
let createTable = lista => {
  let piede = document.getElementById("members_foot");
  let table = document.getElementById("members_table");
  let string = "";
  table.innerHTML = "";

  if (lista.length == 0) {
    piede.innerHTML = `
    <tr class="error_foot">
    <td colspan='5'>NO ITEMS TO DISPLAY</td>
    </tr>`;
  } else {
    piede.innerHTML = `    
    <tr class="normal_foot">
    <td colspan="5">END OF LIST</td>
  </tr>`;
  }

  lista.forEach(person => {
    //Adding the Table Rows
    string += `
    <tr>
      <td>
      <a href="${person.url}" target="_blank">${person.first_name} ${(person.middle_name || "")} ${person.last_name}</a>
      </td>
      <td>${person.party}</td>
      <td>${person.state}</td>
      <td>${person.seniority}</td>
      <td>${person.votes_with_party_pct}%</td>
    </tr>`;
  });
  table.innerHTML = string;
};

//Filtering the list: dropdown and checkboxes
let filter = () => {
  filteredMembers = members.filter(
    x =>
    x.state == document.getElementById("selState").value ||
    document.getElementById("selState").value == "all"
  );
  let checks = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
  if (checks.length == 3) {
    alert("Please SHOW at least one party");
  }
  checks.forEach(box => {
    filteredMembers = (filteredMembers.filter(x => (
      x.party != "D" && box.id.includes("demo")) || (
      x.party != "R" && box.id.includes("repu")) || (
      x.party != "I" && box.id.includes("inde"))));
  });
  //Re-sort the list as per last sorting criteria
  let flags = flagSort.map(x => Math.abs(x.flag));
  let sortBy = flags.indexOf(1);
  newSortGlobal = sortBy;
  sortTheData();
  createTable(filteredMembers);
};

// Sorting the table: changing the arrows in the DOM and calling the sorting function
let sort_Table = newSort => {
  let flags = flagSort.map(x => Math.abs(x.flag));
  let oldSort = flags.indexOf(1);
  let elementNew = document.getElementById(flagSort[newSort].id);
  let elementOld = document.getElementById(flagSort[oldSort].id);
  if (newSort == oldSort) {
    if (flagSort[oldSort].flag == -1) {
      elementNew.classList.replace(
        flagSort[oldSort].down,
        flagSort[newSort].up
      );
    } else {
      elementNew.classList.replace(
        flagSort[oldSort].up,
        flagSort[newSort].down
      );
    }
    flagSort[oldSort].flag *= -1;
  } else {
    if (flagSort[oldSort].flag == -1) {
      elementOld.classList.replace(flagSort[oldSort].down, "fa-sort");
    } else {
      elementOld.classList.replace(flagSort[oldSort].up, "fa-sort");
    }
    flagSort[oldSort].flag = 0;
    elementNew.classList.replace("fa-sort", flagSort[newSort].down);
    flagSort[newSort].flag = -1;
  }
  newSortGlobal = newSort;
  sortTheData();
  createTable(filteredMembers);
};

//Sorting
function compare(a, b) {
  console.log(newSortGlobal, flagSort[newSortGlobal].id, flagSort[newSortGlobal].flag)
  switch (flagSort[newSortGlobal].id) {
    case "surname":
      if (a.last_name < b.last_name) return flagSort[newSortGlobal].flag;
      else return -flagSort[newSortGlobal].flag;
    case "name":
      if (a.first_name < b.first_name) return flagSort[newSortGlobal].flag;
      else return -flagSort[newSortGlobal].flag;
    case "party":
      if (a.party < b.party) return flagSort[newSortGlobal].flag;
      else return -flagSort[newSortGlobal].flag;
    case "state":
      if (a.state < b.state) return flagSort[newSortGlobal].flag;
      else return -flagSort[newSortGlobal].flag;
    case "seniority":
      return (a.seniority - b.seniority) * -flagSort[newSortGlobal].flag;;
    case "percentage":
      return (a.votes_with_party_pct - b.votes_with_party_pct) * -flagSort[newSortGlobal].flag;
  }
}
let sortTheData = () => {
  filteredMembers.sort(compare);
};

//CREATE THE STATISTIC DATA

//Sorting missed votes function
function compareKey(a, b) {
  return (a.comparingKey - b.comparingKey);
};

//Fill the array "statistics"
let fillStatistics = () => {
  members.forEach(person => {
    if (person.party == "D") {
      statistics.NrOfDemo++;
      SumVotesD += person.votes_with_party_pct;
    } else if (person.party == "R") {
      statistics.NrOfRepu++;
      SumVotesR += person.votes_with_party_pct;
    } else if (person.party == "I") {
      statistics.NrOfInde++;
      SumVotesI += person.votes_with_party_pct;
    }
    person.comparingKey = window.location.href.includes("attendance") ?
      person.missed_votes_pct :
      person.votes_with_party_pct;
  });
  statistics.AvgOfDemo =
    statistics.NrOfDemo == 0 ?
    0 :
    Math.round((SumVotesD / statistics.NrOfDemo) * 100) / 100;
  statistics.AvgOfRepu =
    statistics.NrOfRepu == 0 ?
    0 :
    Math.round((SumVotesR / statistics.NrOfRepu) * 100) / 100;
  statistics.AvgOfInde =
    statistics.NrOfInde == 0 ?
    0 :
    Math.round((SumVotesI / statistics.NrOfInde) * 100) / 100;
  statistics.sortedMembers = members.slice().sort(compareKey);
};

//TABLES

//At a Glance Table
let createGlance = () => {
  let table = document.getElementById("Table_at_Glance");
  let string = `
      <tr>
          <td>Democrats</td>
          <td>${statistics.NrOfDemo}</td>
          <td>${statistics.AvgOfDemo}%</td>
      </tr>
      <tr>
          <td>Republicans</td>
          <td>${statistics.NrOfRepu}</td>
          <td>${statistics.AvgOfRepu}%</td>
      </tr>
      <tr>
          <td>Independents</td>
          <td>${statistics.NrOfInde}</td>
          <td>${statistics.AvgOfInde}%</td>
      </tr>`;
  table.innerHTML = string;
  table = document.getElementById("Foot_at_Glance");
  string = `
      <tr>
          <td>Total</td>
          <td>${statistics.NrOfDemo +
            statistics.NrOfRepu +
            statistics.NrOfInde}</td>
          <td>${Math.round(
            ((SumVotesD + SumVotesR + SumVotesI) /
              (statistics.NrOfDemo +
                statistics.NrOfRepu +
                statistics.NrOfInde)) *
              100
          ) / 100}%</td>
      </tr>`;
  table.innerHTML = string;
};

//Least and Most Engaged Tables
let createLeastEng = () => {
  let tableLeast = document.getElementById("Table_Least_Eng");
  let tableMost = document.getElementById("Table_Most_Eng");
  let len = statistics.sortedMembers.length;
  let cicle = Math.round(len / 10);
  let lastI = 0;
  let stringLeast = "";
  let stringMost = "";
  for (let i = 0; i < cicle; i++) {
    let personLeast = statistics.sortedMembers[i];
    let personMost = statistics.sortedMembers[len - 1 - i];
    //Least Table
    stringLeast = stringLeast + `
    <tr>
      <td><a href="${personLeast.url}" target="_blank">${personLeast.first_name} ${personLeast.middle_name == null ? " " : personLeast.middle_name} ${personLeast.last_name}</a></td>
      <td>${personLeast.missed_votes}%</td>
      <td>${personLeast.comparingKey}%</td>
    </tr>`;
    //Most Table
    stringMost = stringMost + `
    <tr>
      <td><a href="${personMost.url}" target="_blank">${personMost.first_name} ${personMost.middle_name == null ? " " : personMost.middle_name} ${personMost.last_name}</a></td>
      <td>${personMost.missed_votes}%</td>
      <td>${personMost.comparingKey}%</td>
    </tr>`;
    lastI = i;
  }
  //Check for repetitive Least
  let lastLeast = statistics.sortedMembers[lastI];
  for (let f = lastI + 1; f < len; f++) {
    let nextLeast = statistics.sortedMembers[f];
    if (nextLeast.comparingKey === lastLeast.comparingKey) {
      stringLeast = stringLeast + `
      <tr>
        <td><a href="${nextLeast.url}" target="_blank">${nextLeast.first_name} ${nextLeast.middle_name == null ? " " : nextLeast.middle_name} ${nextLeast.last_name}</a></td>
        <td>${nextLeast.missed_votes}%</td>
        <td>${nextLeast.comparingKey}%</td>
      </tr>`;
    } else {
      break;
    }
  }
  //Check for repetitive Most
  let lastMost = statistics.sortedMembers[len - 1 - lastI];
  for (let f = len - 2 - lastI; f >= 0; f--) {
    let nextMost = statistics.sortedMembers[f];
    if (nextMost.comparingKey === lastMost.comparingKey) {
      stringMost = stringMost + `
      <tr>
        <td><a href="${nextMost.url}" target="_blank">${nextMost.first_name} ${nextMost.middle_name == null ? " " : nextMost.middle_name} ${nextMost.last_name}</a></td>
        <td>${nextMost.missed_votes}%</td>
        <td>${nextMost.comparingKey}%</td>
      </tr>`;
    } else {
      break;
    }
  }
  tableLeast.innerHTML = stringLeast;
  tableMost.innerHTML = stringMost;
};

//Event Listeners
let addListener = () => {
  document.getElementById("filters").addEventListener("change", filter);
  document.getElementById("surname").addEventListener("click", function () {
    sort_Table(0);
  });
  document.getElementById("name").addEventListener("click", function () {
    sort_Table(1);
  });
  document.getElementById("party").addEventListener("click", function () {
    sort_Table(2);
  });
  document.getElementById("state").addEventListener("click", function () {
    sort_Table(3);
  });
  document.getElementById("seniority").addEventListener("click", function () {
    sort_Table(4);
  });
  document.getElementById("percentage").addEventListener("click", function () {
    sort_Table(5);
  });
};