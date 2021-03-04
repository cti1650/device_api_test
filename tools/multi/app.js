const ds = new DeviceSensor();

function multiGetData() {
  const status = document.querySelector("#status");
  const status2 = document.querySelector("#status2");
  const counter = document.querySelector("#count");
  const mapLink = document.querySelector("#map-link");
  let count = 0;

  if (
    ds.setDeviceMotionEvent(function (data) {
      if (data["error"] === "none") {
        if (Math.sqrt(data["x"] ^ (2 + data["y"]) ^ (2 + data["z"]) ^ 2) > 5) {
          count++;
          counter.innerHTML = count;
        }
        status.innerHTML =
          "x:" + data["x"] + "<br>y:" + data["y"] + "<br>z:" + data["z"];
      } else {
        status.innerHTML = data["error"];
      }
    })
  ) {
    alert("done");
  }
  if (
    ds.setDeviceOrientationEvent(function (data) {
      if (data["error"] === "none") {
        status2.innerHTML =
          "alpha:" +
          data["alpha"] +
          "<br>beta:" +
          data["beta"] +
          "<br>gamma:" +
          data["gamma"];
      } else {
        status2.innerHTML = data["error"];
      }
    })
  ) {
    alert("done");
  }
}
