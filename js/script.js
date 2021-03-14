/**
 * Add ingredient field as long as previous field has value
 */
function addIng() {
  let id = ings.length + 1;
  let current = document.getElementById("iSearch" + ings.length);

  if (current.value != "") {
    current.removeEventListener("keyup", buttonChange, false);
    let child = document.createElement("div");
    child.setAttribute("class", "ingredient");
    let label = document.createElement("label");
    label.setAttribute("for", "exclude" + id);
    label.innerHTML = "Exclude";
    child.appendChild(label);
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "exclude" + id);
    let newIng = document.createElement("input");
    newIng.setAttribute("type", "text");
    newIng.setAttribute("class", "iSearch");
    newIng.setAttribute("id", "iSearch" + id);
    newIng.setAttribute("placeholder", "One ingredient per row");
    child.appendChild(check);
    child.appendChild(newIng);
    ing.appendChild(child);
    addButton.setAttribute("class", "gray");
    newIng.addEventListener("keyup", buttonChange, false);
  }
}
/**
 * If the value of latest ingredients field is empty deactivate button
 * @param {string} v
 */
function buttonChange() {
  let current = document.getElementById("iSearch" + ings.length);
  let v = current.value;
  if (v != "") {
    addButton.setAttribute("class", "usefull");
  } else {
    addButton.setAttribute("class", "gray");
  }
}
/**
 * Get form fields and call Ajax request
 * @param e
 */
function getRecepies(e) {
  e.preventDefault();
  let query = "";
  let items = e.target;
  if (items[0].value != "") {
    query += "q=" + items[0].value + "&";
  }
  query += "i=";
  for (let i = 1; i < items.length - 1; i++) {
    if (i % 2 == 0 && items[i].value != "") {
      if (i == items.length - 2) query += items[i].value;
      else query += items[i].value + ",";
    } else {
      if (items[i].checked && items[i + 1].value != "") {
        query += "-";
      }
    }
  }
  if (query != "") {
    getData(query);
  }
}
async function getData(query) {
  results.innerHTML = "";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      let res = data.results;
      res.forEach((element) => {
        let recepie = document.createElement("div");
        recepie.setAttribute("class", "recipe");
        recepie.innerHTML =
          "<a href='" +
          element.href +
          "' target='_blank'><h2>" +
          element.title +
          "</h2></a><p>Ingredients: " +
          element.ingredients +
          "</p>";
        results.appendChild(recepie);
      });
    }
  };
  xhttp.open("GET", URI + query, true);
  xhttp.send();
}

let ing = document.getElementById("ingredients");
let ings = document.getElementsByClassName("ingredient");
let form = document.getElementById("form");
let addButton = document.getElementById("addIngredients");
let ingValue = document.getElementById("iSearch" + ings.length);
let results = document.getElementById("result");
const URI = "http://www.recipepuppy.com/api/?";
if (ingValue.value != "") {
  addButton.setAttribute("class", "usefull");
}
ingValue.addEventListener("keyup", buttonChange, false);
form.addEventListener("submit", getRecepies, true);
