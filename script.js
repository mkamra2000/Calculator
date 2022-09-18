let ipString = "";
let opString = "";
var inputContainer = document.getElementById("input");
var outputContainer = document.getElementById("output");
let symbols = document.getElementsByClassName("symbol");
// Initially all the symbols are disabled
if (ipString.length === 0) {
  document.getElementById("ac").setAttribute("disabled", true);
  document.getElementById("c").setAttribute("disabled", true);
  for (let s of symbols) {
    s.setAttribute("disabled", true);
  }
}
function calculate(id) {
  // Input
  let clickedBtn = document.getElementById(id).innerHTML;
  let flag = false;
  // Clear All the input and output
  if (clickedBtn === "AC") {
    ipString = "";
    opString = "0";
    flag = true;
    document.getElementById("ac").setAttribute("disabled", true);
    document.getElementById("c").setAttribute("disabled", true);
    for (let s of symbols) {
      s.setAttribute("disabled", true);
    }
  }
  // Clear last digit or symbol
  if (clickedBtn === "C") {
    ipString = ipString.substring(0, ipString.length - 1);
    flag = true;
    if (ipString.length === 0) {
      opString = "0";
      document.getElementById("ac").setAttribute("disabled", true);
      document.getElementById("c").setAttribute("disabled", true);
      for (let s of symbols) {
        s.setAttribute("disabled", true);
      }
    }
  }
  if (clickedBtn === "=") {
    flag = true;
    opString = "=" + opString;
    ipString = "";
  }
  if (!flag) {
    if (opString.length > 0 && opString.charAt(0) === "=") {
      ipString = opString.substring(1);
      opString = opString.substring(1);
    }
    // Check two symbols are not consecutive
    if (
      checkSymbol(clickedBtn) &&
      checkSymbol(ipString.charAt(ipString.length - 1))
    ) {
      ipString = ipString.substring(0, ipString.length - 1) + clickedBtn;
    }
    // Decimal Placed
    else if (clickedBtn === document.getElementById("decimal").innerHTML) {
      if (ipString.length === 0) {
        ipString = "0" + clickedBtn;
      } else if (ipString.length != 0) {
        let anotherDecimalFound = false;
        for (let index = ipString.length - 1; index > 0; index--) {
          if (checkSymbol(ipString.charAt(index))) {
            break;
          } else if (ipString.charAt(index) == clickedBtn) {
            anotherDecimalFound = true;
          }
        }
        if (!anotherDecimalFound) {
          ipString += clickedBtn;
        }
      }
    } else {
      ipString += clickedBtn;
    }
  }
  if (ipString.length != 0) {
    document.getElementById("ac").removeAttribute("disabled");
    document.getElementById("c").removeAttribute("disabled");
    for (let s of symbols) {
      s.removeAttribute("disabled");
    }
  }
  // input and output window scroll to right
  inputContainer.scrollLeft = inputContainer.scrollWidth;
  outputContainer.scrollLeft = outputContainer.scrollWidth;
  document.getElementById("input").innerHTML = ipString;
  // Output
  if (
    ipString.length > 0 &&
    !checkSymbol(ipString.charAt(ipString.length - 1))
  ) {
    let correctNumericalString = ipString;
    if (ipString.includes(document.getElementById("minus").innerHTML)) {
      correctNumericalString = correctNumericalString.replaceAll(
        document.getElementById("minus").innerHTML,
        "-"
      );
    }
    if (ipString.includes(document.getElementById("multiply").innerHTML)) {
      correctNumericalString = correctNumericalString.replaceAll(
        document.getElementById("multiply").innerHTML,
        "*"
      );
    }
    if (ipString.includes(document.getElementById("division").innerHTML)) {
      correctNumericalString = correctNumericalString.replaceAll(
        document.getElementById("division").innerHTML,
        "/"
      );
    }
    if (ipString.includes(document.getElementById("decimal").innerHTML)) {
      correctNumericalString = correctNumericalString.replaceAll(
        document.getElementById("decimal").innerHTML,
        "."
      );
    }
    opString = eval(correctNumericalString);
  }
  document.getElementById("output").innerHTML =
    opString.length === 0 ? 0 : opString;
}

// Check Symbol or digit
function checkSymbol(clicked) {
  for (let s of symbols) {
    if (s.innerHTML == clicked) {
      return true;
    }
  }
  return false;
}
