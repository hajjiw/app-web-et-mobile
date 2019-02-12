let btn = document.getElementById("submit");
let homme = document.getElementById("homme");
let femme = document.getElementById("femme");
let lastname = document.getElementById("lastname");
let firstname = document.getElementById("firstname");
let age = document.getElementById("age");
let password1 = document.getElementById("password");
let password2 = document.getElementById("confpassword");
let errgenre = document.getElementById("errgenre");
let errnom = document.getElementById("errnom");
let errprenom = document.getElementById("errprenom");
let errage = document.getElementById("errage");
let errpasswd = document.getElementsByClassName("errpasswd");
let intext = document.getElementsByClassName("intext");
let emptytext = document.getElementsByClassName("emptytext");
let reset = document.getElementById("reset");
let err = document.getElementsByClassName("err");
let flag = true;

let checkName = (id, err) => {
  if (id.value.length > 2) {
    err.innerHTML = "";
  } else {
    err.innerHTML = "L'entrée doit être plus longue que deux caractères";
    flag = false;
  }
};

let checkGenre = () => {
  if (homme.checked || femme.checked) {
    errgenre.innerHTML = "";
  } else {
    errgenre.innerHTML = "Veuillez séléctionner un genre";
    flag = false;
  }
};

let checkAge = () => {
  if (age.value > 5 && age.value < 140) {
    errage.innerHTML = "";
  } else {
    errage.innerHTML = "Veuillez entrer une âge compris entre 5 et 140";
    flag = false;
  }
};

let checkPasswords = () => {
  if (password1.value !== password2.value) {
    errpasswd[0].innerHTML = "Les mots de passes sont différents";
    errpasswd[1].innerHTML = "Les mots de passes sont différents";
    flag = false;
  } else {
    errpasswd[0].innerHTML = "";
    errpasswd[1].innerHTML = "";
  }
};

let checkIfEmpty = () => {
  for (i = 0; i < intext.length; i++) {
    if (intext[i].value === "") {
      emptytext[i].innerHTML = "Veuillez remplir ce champ";
      flag = false;
    }
  }
};

let resetAction = () => {
  for (i = 0; i < intext.length; i++) {
    intext[i].value = "";
  }
  for (var e in err) {
    e.innerHTML = "";
  }
  if (homme.checked) homme.checked = false;
  if (femme.checked) femme.checked = false;
};

firstname.addEventListener("input", () => {
  checkName(firstname, errprenom);
});

lastname.addEventListener("input", () => {
  checkName(lastname, errnom);
});

age.addEventListener("input", checkAge);

password1.addEventListener("input", checkPasswords);
password2.addEventListener("input", checkPasswords);

btn.addEventListener("click", () => {
  flag = true;
  checkName(firstname, errprenom);
  checkName(lastname, errnom);
  checkAge();
  checkGenre();
  checkPasswords();
  checkIfEmpty();
  if (flag) alert("C'est bon");
  else alert("Erreur");
});

reset.addEventListener("click", resetAction);
