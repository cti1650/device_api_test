class DeviceSensor {
  constructor() {
    this.state = {
      motion: {},
    };
  }
  setDeviceMotionEvent(func) {
    let rep = {};
    if (DeviceMotionEvent.requestPermission) {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", function (event) {
              if (!event.accelerationIncludingGravity) {
                rep = { error: "event.accelerationIncludingGravity is null" };
                // alert("event.accelerationIncludingGravity is null");
              }
              rep = {
                x: event.accelerationIncludingGravity.x,
                y: event.accelerationIncludingGravity.y,
                z: event.accelerationIncludingGravity.z,
                error: "none",
              };
              func(rep);
            });
            return true;
          }
        })
        .catch((rep = { error: console.error }));
    } else {
      rep = { error: "DeviceMotionEvent.requestPermission is not found" };
      // alert("DeviceMotionEvent.requestPermission is not found");
    }
    func(rep);
    return false;
  }
  setDeviceOrientationEvent() {
    const requestDeviceMotionPermission = async () => {
      // ジャイロセンサーが使えるかどうか
      if (window.DeviceOrientationEvent) {
        // ios13以上
        if (
          DeviceOrientationEvent.requestPermission &&
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", deviceorientation);
          } else {
            window.alert("許可されていません");
          }
        } else {
          // ios13未満
          window.addEventListener("deviceorientation", deviceorientation);
        }
      } else {
        window.alert("対応していません");
      }
      return false;
    };

    let alpha = 0,
      beta = 0,
      gamma = 0;

    const deviceorientation = (dat) => {
      // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
      alpha = Math.round(dat.alpha * -1 * 100) / 100;
      beta = Math.round(dat.beta * -1 * 100) / 100;
      gamma = Math.round(dat.gamma * -1 * 100) / 100;
      if (Math.round(beta) === 0) {
        window.navigator.vibrate(200);
      }
    };

    const handlePress = async () => {
      try {
        await requestDeviceMotionPermission();
      } catch (e) {
        console.error(e);
        window.alert("対応していません");
      }

      const timer = window.setInterval(() => {
        document.getElementById(
          "txt"
        ).innerHTML = `alpha: ${alpha}<br>beta: ${beta}<br>gamma: ${gamma}`;
      }, 200);
    };
  }
}
