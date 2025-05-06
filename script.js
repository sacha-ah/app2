<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pixel Animation</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #fff;
    }
    canvas {
      display: block;
      margin: auto;
      background: #fff;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>

  <script>
    const imagePaths = [
      "images/img1.jpg",
      "images/img2.jpg",
      "images/img3.jpg" // ajoute autant d'images que tu veux dans le dossier images/
    ];

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function getRandomImagePath() {
      const index = Math.floor(Math.random() * imagePaths.length);
      return imagePaths[index];
    }

    function applyPixelReductionEffect(img, canvasWidth, canvasHeight) {
      const scaleFactor = Math.random() * 0.05 + 0.0001;
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      const smallWidth = Math.max(1, Math.floor(img.width * scaleFactor));
      const smallHeight = Math.max(1, Math.floor(img.height * scaleFactor));

      tempCanvas.width = smallWidth;
      tempCanvas.height = smallHeight;

      tempCtx.drawImage(img, 0, 0, smallWidth, smallHeight);

      ctx.imageSmoothingEnabled = false;
      const displayWidth = img.width * 0.7;
      const displayHeight = img.height * 0.7;
      const x = (canvasWidth - displayWidth) / 2;
      const y = (canvasHeight - displayHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(tempCanvas, 0, 0, smallWidth, smallHeight, x, y, displayWidth, displayHeight);
    }

    function loadAndDisplayImage() {
      const img = new Image();
      img.src = getRandomImagePath();

      img.onload = function () {
        if (Math.random() < 0.85) {
          applyPixelReductionEffect(img, canvas.width, canvas.height);
        } else {
          const displayWidth = img.width * 0.7;
          const displayHeight = img.height * 0.7;
          const x = (canvas.width - displayWidth) / 2;
          const y = (canvas.height - displayHeight) / 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, displayWidth, displayHeight);
        }
      };
    }

    setInterval(loadAndDisplayImage, 400);
  </script>
</body>
</html>
