let blown = false;

function showSurprise() {
  document.getElementById("cake").src = "static/3.png";
  document.querySelector("button").style.display = "none";
  document.querySelector("h1").textContent = "🎉 Surprise! 🎉";
  var audio = document.getElementById('bg-music');
  if (audio) {
    audio.play();
  }
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 512;
  const data = new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser);

  function detect() {
    analyser.getByteFrequencyData(data);
    let avg = data.reduce((a, b) => a + b) / data.length / 256;
    if (avg > 0.1 && !blown) {
      blown = true;
      document.getElementById("cake").src = "static/2.png";
      document.querySelector("button").style.display = "inline-block";
      document.querySelector("h1").textContent = "Make a wish ✨";
    }
    requestAnimationFrame(detect);
  }

  detect();
});
