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
  if (title != "" && ingredients != "" && website != "") {
    if (select.selectedIndex == 0) {
      let headers = {
        "Content-Type": "application/json",
        "Access-Control-Origin": "https://lobonode.ddns.net",
      };
      let data = {
        title: title,
        ingredients: ingredients,
        website: website,
      };
      console.log(data);
      fetch(uri + "recipe", {
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
            res.setAttribute("class", "success");
            res.innerHTML = "Recipe added!";
            return;
          } else if (data.code == 11000) {
            res.setAttribute("class", "failure");
            res.innerHTML = "Recipe has been sent before!";
            return;
          } else {
            res.setAttribute("class", "failure");
            res.innerHTML = "Something went wrong, try again later.";
            return;
          }
        });
    } else {
      let headers = {
        "Content-Type": "application/json",
        "Access-Control-Origin": "https://lobonode.ddns.net",
      };
      let data = {
        name: title,
        message: ingredients,
        email: website,
      };
      console.log(data);
      fetch(uri + "message", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message == "message recieved") {
            dish.value = "";
            ingField.value = "";
            web.value = "";
            res.setAttribute("class", "success");
            res.innerHTML = "message sent!";
            return;
          } else {
            res.setAttribute("class", "failure");
            res.innerHTML = "Something went wrong, try again later.";
            return;
          }
        });
    }
  } else {
    res.setAttribute("class", "failure");
    res.innerHTML = "Please fill in the form correctly";
  }
}

function changeForm(e) {
  if (e.target.value == "msg") {
    let fields = document.getElementsByClassName("contact-field");
    fields[0].children[0].innerHTML = "Name";
    fields[1].children[0].innerHTML = "Message";
    fields[2].children[0].innerHTML = "Email";

    let mail = fields[2].children[1];
    mail.removeAttribute("pattern");
    mail.setAttribute("type", "email");
    mail.setAttribute("placeholder", "name@email.com");
  } else {
    let fields = document.getElementsByClassName("contact-field");
    fields[0].children[0].innerHTML = "Title";
    fields[1].children[0].innerHTML = "Ingredients";
    fields[2].children[0].innerHTML = "Website";

    let mail = fields[2].children[1];
    mail.setAttribute("type", "text");
    mail.setAttribute(
      "pattern",
      "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
    );
    mail.setAttribute("placeholder", "http(s)://");
  }
}
let form = document.getElementById("contact-form");
let uri = "https://lobonode.ddns.net/api/";
let dish = document.getElementById("dish");
let ingField = document.getElementById("contactIng");
let web = document.getElementById("ref");
let res = document.getElementById("formres");
let select = document.getElementById("type");

select.addEventListener("change", changeForm, true);
dish.classList.remove("incorr");
ingField.classList.remove("incorr");
web.classList.remove("incorr");
form.addEventListener("submit", saveFile, true);
