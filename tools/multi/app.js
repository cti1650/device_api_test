const ds = new DeviceSensor();

function multiGetData() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  if (
    ds.setDeviceMotionEvent(function (data) {
      status.innerHTML = data["error"];
    })
  ) {
    alert("done");
  }
}
