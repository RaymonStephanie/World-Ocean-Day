  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/hkBRjA5BZ/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();
    flippedVideo = ml5.flipImage(video);
    classifyVideo();
  }

  function draw() {
    background(0);

    image(flippedVideo, 0, 0);

    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }