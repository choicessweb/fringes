
  $(document).ready( function() { // when using a video player library, e.g JW Player, use `window.onload` instead

  var $player = $('#video-player');
  var $playerWidth = $player.width();
  var $playerHeight = $player.height();

  function resizeCanvas() {
    $('#video-ambilight').attr('width', $playerWidth);
    $('#video-ambilight').attr('height', $playerHeight);
  }
  resizeCanvas();

  var canvas = document.getElementById('video-ambilight');
  var ctx = canvas.getContext('2d');
  var video = document.getElementById('video');

  // Note how the video poster is (double-)included in HTML as an actual, hidden <img>, so we can draw an "ambilight" bg from it on pageload already. As video's poster property (`videoObject.poster`) returns the URL of the poster image file as a string, cannot use that w/ canvas' `drawImage()` method which expects an image object.
  var poster = document.getElementById('video-poster');
  ctx.drawImage(poster, 0, 0, $playerWidth, $playerHeight);

  // Draw the current frame of the video on <canvas> ..
  var timer;
  video.addEventListener('play', function() {
    timer = window.setInterval(function() {
      ctx.drawImage(video, 0, 0, $playerWidth, $playerHeight);
    }, 30); // .. every 30 milliseconds
  }, false);
  video.addEventListener('pause', function() { window.clearInterval(timer); }, false);
  video.addEventListener('ended', function() { window.clearInterval(timer); }, false);

});

