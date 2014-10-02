(function() {
  
  player.addEventListener("click", videoClick, true);
  player.addEventListener("ended", endVideo, true);
  
  function endVideo() {
    player.src = '';
  }
  
  function videoClick() {
    if (!player.src || player.src.indexOf(window.location.pathname) !== -1) {
      fileSelect.click()
    }
  }
  
  // register button listeners
  document.onkeydown = buttonPress;
  
  function buttonPress (e) {
    e = e || window.event;
    var key = e.keyCode;
    if (key == '32') {
      toggleVideo();
      return false;
    }
    if ([37,39].indexOf(key) !== -1) {
      videoSpeed(e, key);
    }
    if ([38,40].indexOf(key) !== -1) {
      videoSize(e, key); 
    }
  }
  
  var showControls = false;
  function keepControls() {
    if (showControls) {
      player.setAttribute("controls", "controls")
      player.addEventListener('timeupdate', keepControls, false)
    }
  }
  
  function toggleVideo(e) {
    showControls = false;
    player.playbackRate = 1;
    if ( player.paused) {
      return player.play();
    }
    player.pause();
  }
  
  function videoSize(e, key) {
    if (!e.shiftKey ) {
      return false;
    }
    switch (key) {
      case 38: // up
        player.webkitRequestFullscreen();
        break;
      case 40: // down
        player.webkitExitFullscreen();
        break;
    }
  }
  
  function videoSpeed(e, key) {
    var speeds = [0.5,1,2,4,6,10]
    var speed = speeds.indexOf(player.playbackRate);
    var newSpeed;
    
    showControls = true;
    keepControls();
    
    switch (key) {
      case 37: // left
        if (e.shiftKey) {
          player.currentTime = player.currentTime - 5;
          break;
        }
        if (speed > 0) {
          newSpeed = speed - 1;
          player.playbackRate = speeds[newSpeed];
        }
        break;
      case 39: // right
        if (e.shiftKey) {
          player.currentTime = player.currentTime + 5;
          break;
        }
        if (speed < 5) {
          newSpeed = speed + 1;
          player.playbackRate = speeds[newSpeed];
        }
        break;
    }
    if (newSpeed && newSpeed == 1) {
      showControls = false;
    }
  }
  
  UpdateTitle = function() {
    var title = player.src.substring(downloadsHref.length);
    header.innerText = title;
    document.title = title;
  }
  
  ChangeVideo = function(e) {
    player.src = fileSelect.value.replace(/C:\\fakepath\\/gi, downloadsHref);
    UpdateTitle();
    fileSelect.blur();
  }
  
  fileSelect.addEventListener("change", ChangeVideo, false);
  
}());
