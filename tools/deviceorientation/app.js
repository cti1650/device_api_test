window.addEventListener("devicemotion", function (event) {
  var x = event.accelerationIncludingGravity.x;
  var y = event.accelerationIncludingGravity.y;
  var z = event.accelerationIncludingGravity.z;

  var result1 = document.getElementById("result_acc");
  result1.innerHTML =
    "重力加速度<br />" +
    "X：" +
    x.toFixed(2) +
    "(m/s^2)<br />" +
    "Y：" +
    y.toFixed(2) +
    "(m/s^2)<br />" +
    "Z：" +
    z.toFixed(2) +
    "(m/s^2)<br />";
});

window.addEventListener(
  "deviceorientation",
  function (event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    var result2 = document.getElementById("result_gyro");
    result2.innerHTML =
      "ジャイロセンサー<br />" +
      "alpha：" +
      alpha.toFixed(2) +
      "°<br />" +
      "beta ：" +
      beta.toFixed(2) +
      "°<br />" +
      "gamma：" +
      gamma.toFixed(2) +
      "°<br />";
  },
  false
);
