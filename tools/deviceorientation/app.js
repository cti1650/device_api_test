var ball = document.querySelector(".ball");
var garden = document.querySelector(".garden");
var output = document.querySelector(".output");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var x = event.beta; // -180 から 180 の範囲で角度を示す
  var y = event.gamma; // -90 から 90 の範囲で角度を示す

  output.innerHTML = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  // デバイスをひっくり返したくはないため、
  // x の値を -90 から 90 の範囲に制限する
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }

  // 計算を容易にするため、x および y の値の範囲を
  // 0 から 180 に変換する
  x += 90;
  y += 90;

  // 10 は、ボールのサイズの半分である。
  // これにより、配置場所をボールの中心に合わせる
  ball.style.top = (maxX * x) / 180 - 10 + "px";
  ball.style.left = (maxY * y) / 180 - 10 + "px";
}

window.addEventListener("deviceorientation", handleOrientation);
