let ball = document.getElementById("ball");
let btn = document.getElementById("btnHello");

let change = () => {
  if (btn.value === "Ballon 1") {
    btn.value = "Ballon 2";
    ball.src = "ball1.svg";
  } else if (btn.value === "Ballon 2") {
    btn.value = "Ballon 1";
    ball.src = "ball2.svg";
  }
};

btn.addEventListener("click", change);
