const video = document.getElementById("video")
const play = document.getElementById("play")
const stop = document.getElementById("stop")
const progress = document.getElementById("progress")
const timespan = document.getElementById("timespan")

video.addEventListener("click", toggleStatus)
video.addEventListener("play", updateIcon)
video.addEventListener("pause", updateIcon)
video.addEventListener("timeupdate", updateTime)

play.addEventListener("click", toggleStatus)
stop.addEventListener("click", stopVideo)
progress.addEventListener("change", updateProgress)

function toggleStatus() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function updateIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  }
}

function updateTime() {
  progress.value = (video.currentTime / video.duration) * 100

  let mins = Math.floor(video.currentTime / 60)
  if (mins < 10) {
    mins = "0" + String(mins)
  }

  let secs = Math.floor(video.currentTime % 60)
  if (secs < 10) {
    secs = "0" + String(secs)
  }

  timespan.innerHTML = `${mins}:${secs}`
}

function updateProgress() {
  video.currentTime = (+progress.value * video.duration) / 100
}

function stopVideo() {
  video.currentTime = 0
  video.pause()
}
