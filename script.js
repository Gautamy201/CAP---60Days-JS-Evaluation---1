const fetchData = document.querySelector(".fetchdata_contener");
const depatmet = document.getElementById("Department");
const gender = document.getElementById("Gender");
const sortBySalary = document.getElementById("shortBySalary");

let count = 1;

async function fatchApi() {
  const Response = await fetch(
    "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees"
  );
  const data = await Response.json();
  const apiData = data.data;
  return apiData;
}
fatchApi().then((data) => {
  data.map((emp) => {
    fetcDataDisplay(emp, count);
    count++;
  });
});

depatmet.onchange = function () {
  fetchData.innerHTML = "";
  count = 1;
  fatchApi().then((data) => {
    data.map((emp) => {
      if (emp.department === this.value) {
        fetcDataDisplay(emp, count);
        count++;
      }
      if (this.value === "all") {
        fetcDataDisplay(emp, count);
        count++;
      }
    });
  });
};

gender.onchange = function () {
  fetchData.innerHTML = "";
  count = 1;
  fatchApi().then((data) => {
    data.map((emp) => {
      if (emp.gender === this.value) {
        fetcDataDisplay(emp, count);
        count++;
      }
      if (this.value === "all") {
        fetcDataDisplay(emp, count);
        count++;
      }
    });
  });
};

sortBySalary.onchange = function () {
  fetchData.innerHTML = "";
  count = 1;
  fatchApi().then((data) => {
    if (this.value === "default") {
      data.map((emp) => {
        fetcDataDisplay(emp, count);
        count++;
      });
    }
    data.sort(function (a, b) {
      return a.salary - b.salary;
    });
    if (this.value === "lowtoheigh") {
      data.map((emp) => {
        fetcDataDisplay(emp, count);
        count++;
      });
    }
    if (this.value === "heightolow") {
      data.reverse().map((emp) => {
        fetcDataDisplay(emp, count);
        count++;
      });
    }
  });
};

fatchApi();

function fetcDataDisplay(data, count) {
  fetchData.innerHTML += `<div class="fetch-data">
        <div class="sr">${count}</div>
        <div class="name">${data.name}</div>
        <div class="gender">${data.gender}</div>
        <div class="deparmet">${data.department}</div>
        <div class="salary">${data.salary}</div>
      </div>`;
}
