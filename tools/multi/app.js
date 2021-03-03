const ds = new DeviceSensor();

function multiGetData() {
  const status = document.querySelector("#status");
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
}
