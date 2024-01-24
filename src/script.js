const slider = document.querySelector(".slider");
const length = document.querySelector(".length");

const includeUppercase = document.querySelector("#upper");
const includeLowercase = document.querySelector("#lower");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");

const generateBtn = document.querySelector(".generate");
const passwordDisplay = document.querySelector(".password");
const copyBtn = document.querySelector(".password-copy");
const copied = document.querySelector(".copied");

const strengthRating = document.querySelector(".rating-text");
const strengthBars = document.querySelector(".bar");

slider.addEventListener("input", () => {
  length.textContent = slider.value;
});

generateBtn.addEventListener("click", () => {
  event.preventDefault();
  passwordDisplay.textContent = generatePass();
});

let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let numbers = "1234567890";
let symbols = "!@#$%^&*()<>?";

function generatePass() {
  let genPass = "";
  let allChars = "";

  allChars += includeUppercase.checked ? uppercase : "";
  allChars += includeLowercase.checked ? lowercase : "";
  allChars += includeNumbers.checked ? numbers : "";
  allChars += includeSymbols.checked ? symbols : "";

  if (allChars == "" || allChars.length == 0) {
    return alert("Please select ast least one password condition!");
  }

  let i = 1;
  while (i <= slider.value) {
    genPass += allChars.charAt(Math.floor(Math.random() * allChars.length));
    i++;
  }

  return genPass;
}

copyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    passwordDisplay.textContent != "" ||
    passwordDisplay.textContent.length >= 1
  ) {
    navigator.clipboard.writeText(passwordDisplay.textContent);
    copied.textContent = "COPIED!";

    setTimeout(() => {
      copied.textContent = "";
    }, 3000);
  }
});
