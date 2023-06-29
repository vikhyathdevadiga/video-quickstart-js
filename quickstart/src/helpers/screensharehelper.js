'use strict';
var Video = require('twilio-video');

let screenTrack;
function shareScreenHandler(room, screenShareBtn) {
  if (!screenTrack) {
      navigator.mediaDevices.getDisplayMedia().then(stream => {
          screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0], {name:'screen'});
          room.localParticipant.publishTrack(screenTrack);
          screenShareBtn.innerHTML = 'Stop sharing';
          screenTrack.mediaStreamTrack.onended = () => { shareScreenHandler() };
      }).catch((error) => {
        console.log(error)
          alert('Could not share the screen.' + error);
      });
  }
  else {
      room.localParticipant.unpublishTrack(screenTrack);
      screenTrack.stop();
      screenTrack = null;
      screenShareBtn.innerHTML = 'Share screen';
  }
};

exports.shareScreenHandler = shareScreenHandler;