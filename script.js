const allBtns = [...document.getElementsByClassName("btn")];

let strToDisplay = "";

const displaElm = document.querySelector(".display");
console.log(displaElm);

const operators = ["%", "/", "*", "+", "-"];

let lastOperator = "";

const audio = new Audio(
  "./audio/toy-story-short-happy-audio-logo-short-cartoony-intro-outro-music-125627.mp3"
);

allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    displaElm.style.background = "";
    displaElm.style.color = "";
    displaElm.classList.remove("prank");

    const val = btn.innerText;

    if (val === "AC") {
      strToDisplay = "";
      disply(strToDisplay);
      return;
    }

    if (val === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return disply(strToDisplay);
    }

    if (val === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        //remove the last char from the strToDisplay

        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }

    if (val === ".") {
      const indexOfLastOp = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(indexOfLastOp);

      if (lastNumberSet.includes(".")) {
        return;
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    if (operators.includes(val)) {
      lastOperator = val;
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        //remove the last char from the strToDisplay

        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    strToDisplay += val;
    disply(strToDisplay);
  });
});

const disply = (str) => {
  displaElm.innerText = str || "0.00";
};

const total = () => {
  // random number
  const extraVal = randomNumber();

  if (extraVal) {
    audio.play();
    displaElm.style.background = "red";
    displaElm.style.color = "white";
    displaElm.classList.add("prank");
  }

  // const ttl = eval(strToDisplay);
  const ttl = eval(strToDisplay) + extraVal;
  disply(ttl);
  strToDisplay = ttl.toString();
};

// creates a random number
const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num < 9 ? num : 0;
};
