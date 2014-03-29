// Modified from https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia

let constraints = { video: true, audio: false };

function gotStream(localMediaStream) {
  let video = document.querySelector('video');
  video.src = window.URL.createObjectURL(localMediaStream);
  video.play();
}

function gotError(err) {
  console.log("The following error occured: " + err);
}

function main() {
  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);
  navigator.getMedia(constraints, gotStream, gotError);
}

function capture() {
  let video = document.querySelector('video');
  let canvas = document.querySelector('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, video.width, video.height);
  let data = canvas.toDataURL('image/png');
  let img = document.querySelector('img');
  img.setAttribute('src', data);
}

function mutate() {
  let img = document.querySelector('img');
  let result = Pixastic.process(img, "desaturate");
  console.log("result: " + result);
  let outcanvas = document.getElementById('outcanvas');
  outcanvas.putImageData(result.getImageData());
  Pixtastic.revert(img);
}

main();
