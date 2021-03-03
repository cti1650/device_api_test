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
};

let alpha = 0,
  beta = 0,
  gamma = 0;

const deviceorientation = (dat) => {
  // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
  alpha = dat.alpha * -1;
  beta = dat.beta * -1;
  gamma = dat.gamma * -1;
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
  });
};
