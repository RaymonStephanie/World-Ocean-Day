let API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/data' : 'https://server.raymonstephanie.vercel.app/data'

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  if (results[0].label === "Plastic") {
    navigator.geolocation.getCurrentPosition((position) => {
      var l1 = position.coords.latitude;
      var l2 = position.coords.longitude;
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          "latitude" : l1,
          "longitude" : l2
        }),
        headers: {
          "Content-Type":"application/json"
        },
      });
    });
  }
  classifyVideo();
}