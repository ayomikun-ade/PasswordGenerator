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
const strengthBars = document.querySelectorAll(".bar");

slider.addEventListener("input", () => {
  length.textContent = slider.value;
});

generateBtn.addEventListener("click", (event) => {
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
  let strength = 0;

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

  strength += includeUppercase.checked ? 1 : 0;
  strength += includeLowercase.checked ? 1 : 0;
  strength += includeNumbers.checked ? 1 : 0;
  strength += includeSymbols.checked ? 1 : 0;

  strength += Math.min(Math.ceil(slider.value / 8), 1);

  updateRatingBars(strength);

  return genPass;
}

function updateRatingBars(strength) {
  strengthBars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
  });

  for (let i = 0; i < strength; i++) {
    strengthBars[i].style.backgroundColor = getBarColor(strength);
  }

  strengthRating.textContent = getStrengthRating(strength);
}

function getStrengthRating(strength) {
  if (strength === 4) {
    return "Very Strong";
  } else if (strength >= 3) {
    return "Strong";
  } else if (strength <= 2) {
    return "Moderate";
  } else if (strength <= 1) {
    return "Weak";
  } else {
    return "Very Weak";
  }
}

function getBarColor(strength) {
  if (strength === 4) {
    return "var(--green)";
  } else if (strength >= 3) {
    return "var(--light-yellow)";
  } else if (strength >= 2) {
    return "var(--dark-orange)";
  } else if (strength >= 1) {
    return "var(--light-orange)";
  } else {
    return "var(--dark-gray)";
  }
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
