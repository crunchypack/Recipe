/**
 * Get formdata and save txtfile
 *
 */
function saveFile(e) {
  e.preventDefault();
  let info = e.target;
  let title = info[0].value;
  let ingredients = info[1].value;
  let website = info[2].value;
  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "https://lobonode.ddns.net",
  };
  let data = {
    title: title,
    ingredients: ingredients,
    website: website,
  };
  fetch(uri, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message == "recipe recieved") {
        dish.value = "";
        ingField.value = "";
        web.value = "";
        res.setAttribute("class", "succes");
        res.innerHTML = "Recipe added!";
      } else if (data.code == 11000) {
        res.setAttribute("class", "failure");
        res.innerHTML = "Recipe has been sent before!";
      } else {
        res.setAttribute("class", "failure");
        res.innerHTML = "Something went wrong, try again later.";
      }
    });
}
let form = document.getElementById("contact-form");
let uri = "https://lobonode.ddns.net/api/message";
let dish = document.getElementById("dish");
let ingField = document.getElementById("contactIng");
let web = document.getElementById("ref");
let res = document.getElementById("formres");
form.addEventListener("submit", saveFile, true);
