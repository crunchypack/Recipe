/**
 * Get formdata and save txtfile
 *
 */
function saveFile(e) {
  e.preventDefault();
  let reg = new RegExp(
    "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
  );
  let info = e.target;
  let title = info[0].value;
  let ingredients = info[1].value;
  let website = info[2].value;
  if (title != "" && ingredients != "" && website != "" && reg.test(website)) {
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
  } else {
    res.setAttribute("class", "failure");
    res.innerHTML = "Please fill in the form correctly";
    if (title == "") {
      dish.setAttribute("class", "incorr");
    }
    if (ingredients == "") {
      ingField.setAttribute("class", "incorr");
    }
    if (website == "") {
      web.setAttribute("class", "incorr");
    }
  }
}
let form = document.getElementById("contact-form");
let uri = "https://lobonode.ddns.net/api/message";
let dish = document.getElementById("dish");
let ingField = document.getElementById("contactIng");
let web = document.getElementById("ref");
let res = document.getElementById("formres");
form.addEventListener("submit", saveFile, true);
