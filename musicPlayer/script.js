const playlistContainerTag = document.getElementsByClassName(
    "playlistContainer"
)[0];

const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
    {trackId:"music/Dua_Lipa_Don_t_Start_Now.mp3", title:"Dua Lipa - Dont Start Now"},
    {trackId:"music/Dua_Lipa_Levitating.mp3", title:"Dua Lipa - Levitating"},
    {trackId:"music/Imagine_Dragons_Believer.mp3", title:"Imagine Dragon - Believer"},
    {trackId:"music/Pharrell_Williams_Happy.mp3", title:"Pharrell Williams - Happy"},
];

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        playSong();
    });
    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playlistContainerTag.append(trackTag);
}
let duration = 0;
let durationText = "00:00"
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);
});

 audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
 });

 const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500/duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
 }


 const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
 };

 let isPlaying = false;
 let currentPlayingIndex = 0;

 playButtonTag.addEventListener("click",() => {
    
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentTime === 0) {
        playSong();
    } else {
        audioTag.play()
        playAndPauseButton();
    }
    
 });

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause()
    playAndPauseButton();
    
});

previousButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === 0) {
        return;
    };
    currentPlayingIndex -= 1;
    playSong();

});

nextButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === tracks.length -1){
        return;
    }
    currentPlayingIndex += 1;
    playSong();
});

const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    playAndPauseButton();
}

 const playAndPauseButton = () => {
    if(isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
 };