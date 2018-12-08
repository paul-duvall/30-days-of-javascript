// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// function for the play button
function togglePlay() {
  if(video.paused){
    video.play();
  } else {
    video.pause();
  }
}

// Update play button to pause and visa versa
function updateButton(){
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.dir(video);
}

// Skip forward and backward in the video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handles the volume / playback rate range bars
function handleRangeUpdate(){
  video[this.name] = this.value;
  console.log(this.value, this.name);
}

// Updates the progress bar
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Allow user to manually update the current point on the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


// Hook up event listeners
// When video clicked, play or pause the video AND update the toggle button
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Event listener for the toggle play/pause button
toggle.addEventListener('click', togglePlay);

// Event listeners for the skip forward and backwards buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Event listener for the ranges
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// Event listeners to update the progress bar
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);