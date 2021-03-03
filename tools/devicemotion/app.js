function deviceMotionRequest() {
  if (DeviceMotionEvent.requestPermission) {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", function (event) {
            if (!event.accelerationIncludingGravity) {
              alert("event.accelerationIncludingGravity is null");
              return;
            }
            document.getElementById("x").innerHTML =
              event.accelerationIncludingGravity.x;
            document.getElementById("y").innerHTML =
              event.accelerationIncludingGravity.y;
            document.getElementById("z").innerHTML =
              event.accelerationIncludingGravity.z;
          });
        }
      })
      .catch(console.error);
  } else {
    alert("DeviceMotionEvent.requestPermission is not found");
  }
}
