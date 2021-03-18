window.onload = () => {
  const video = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");

  /** カメラ設定 */
  const constraints = {
    audio: false,
    video: {
      width: 300,
      height: 200,
      facingMode: "user", // フロントカメラを利用する
      // facingMode: { exact: "environment" }  // リアカメラを利用する場合
    },
  };

  /**
   * カメラを<video>と同期
   */
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch((err) => {
      console.log(err.name + ": " + err.message);
    });

  /**
   * シャッターボタン
   */
  document.querySelector("#shutter").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");

    video.pause();
    setTimeout(() => {
      video.play(); // カメラ再開
    }, 500);

    // canvasに画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  });
};
