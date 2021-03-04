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
                x:
                  Math.round(event.accelerationIncludingGravity.x * 1000) /
                  1000,
                y:
                  Math.round(event.accelerationIncludingGravity.y * 1000) /
                  1000,
                z:
                  Math.round(event.accelerationIncludingGravity.z * 1000) /
                  1000,
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
  async setDeviceOrientationEvent(func) {
    let rep = {};
    // ジャイロセンサーが使えるかどうか
    if (window.DeviceOrientationEvent) {
      // ios13以上
      if (
        DeviceOrientationEvent.requestPermission &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === "granted") {
          window.addEventListener("deviceorientation", function (dat) {
            // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
            rep = {
              alpha: Math.round(dat.alpha * -1 * 1000) / 1000,
              beta: Math.round(dat.beta * -1 * 1000) / 1000,
              gamma: Math.round(dat.gamma * -1 * 1000) / 1000,
            };
            func(rep);
          });
          return true;
        } else {
          // window.alert("許可されていません");
          rep = { error: "許可されていません" };
        }
      } else {
        // ios13未満
        window.addEventListener("deviceorientation", function (dat) {
          // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
          rep = {
            alpha: Math.round(dat.alpha * -1 * 1000) / 1000,
            beta: Math.round(dat.beta * -1 * 1000) / 1000,
            gamma: Math.round(dat.gamma * -1 * 1000) / 1000,
          };
          func(rep);
        });
        return true;
      }
    } else {
      // window.alert("対応していません");
      rep = { error: "対応していません" };
    }
    func(rep);
    return false;
  }
}
