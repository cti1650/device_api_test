const ds = new DeviceSensor();

function multiGetData() {
  const status = document.querySelector("#status");
  const status2 = document.querySelector("#status2");
  const mapLink = document.querySelector("#map-link");

  if (
    ds.setDeviceMotionEvent(function (data) {
      if (data["error"] === "none") {
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
