const input = document.getElementById("input");
const output = document.getElementById("output");

//  all buttons with class "btn"
const buttons = document.querySelectorAll(".btn");

let str = [];
let ans = [];

//disply the input num and operator in screen what ever usewr types
//render input area
function renderinput() {
  // input.value="";
  input.value = str.join("");
}


//render output area
function renderoutput() {
  // output.textContent="";
  output.textContent = ans.join("");
}



buttons.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    const content = buttons.innerText;
    const id = buttons.id;

    if (
      buttons.classList.contains("operator") ||
      buttons.classList.contains("num")
    ) {
      // Replace X with * for multiplication
      str.push(content === "X" ? "*" : content);
      renderinput();
    } else if (buttons.classList.contains("function")) {
      switch (id) {
        case "result":
          const expression = str.join("").replace(/\s+/g, ""); // convert array to string //  Remove all spaces from the input expression

          //  Check if the cleaned expression only contains valid characters
          // Valid characters: digits, +, -, *, /, ., (, )
          const isValidExpression = /^[0-9+\-*/().]+$/.test(expression);

          if (!isValidExpression) {
            ans = ["Invalid expression."];
            renderoutput();
            return;
          }

          try {
            const result = eval(expression);

            if (result === Infinity || result === -Infinity) {
              ans = ["Cannot divide a number by 0."];
            } else {
              ans = [result];
            }
          } catch (error) {
            ans = ["Invalid expression."];
          }

          renderoutput();
          break;

        case "delete":
          str.length = 0;
          ans.length = 0;
          renderinput();
          renderoutput();
          break;

        case "backspace":
          str.pop();
          renderinput();
          break;
      }
    }
  });
});


// Listen to user typing in input field
input.addEventListener("input", () => {
  str = input.value.split(""); // Update str[] with the typed characters
});

