'use strict';

function muteOrUnmuteYourMedia(room, kind, action) {
    console.log("Media Event => ", kind, action)
    if(kind === 'data')
        return;
    const publications = kind === 'audio' ? room.localParticipant.audioTracks : room.localParticipant.videoTracks;

    publications.forEach(function(publication) {
        if (action === 'mute') {
            publication.track.disable();
        } else {
            publication.track.enable();
        }
    });
}

function muteYourVideo(room, btnref) {
    btnref.classList.add('muted');
    btnref.innerHTML = '<i class="fa-solid fa-video-slash"></i>';
    muteOrUnmuteYourMedia(room, 'video', 'mute');
}

function unmuteYourVideo(room, btnref) {
    btnref.classList.remove('muted');
    btnref.innerHTML = '<i class="fa-solid fa-video"></i>';
    muteOrUnmuteYourMedia(room, 'video', 'unmute');
  }

function muteYourAudio(room, btnref) {
    btnref.classList.add('muted');
    btnref.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
    muteOrUnmuteYourMedia(room, 'audio', 'mute');
}

function unmuteYourAudio(room, btnref) {
    btnref.classList.remove('muted');
    btnref.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    muteOrUnmuteYourMedia(room, 'audio', 'unmute');
}

exports.muteYourVideo = muteYourVideo;
exports.unmuteYourVideo = unmuteYourVideo;
exports.muteYourAudio = muteYourAudio;
exports.unmuteYourAudio = unmuteYourAudio;