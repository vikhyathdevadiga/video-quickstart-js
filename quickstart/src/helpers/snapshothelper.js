'use strict';

function takeSnapshot(room){

    var localVideoTrack = Array.from(room.localParticipant.videoTracks.values())[0].track;
    var imageModal = new bootstrap.Modal(document.getElementById("download-snapshot"));
    var imageElement = document.getElementById("imageElement");

    const imageCapture = new ImageCapture(localVideoTrack.mediaStreamTrack);
    imageCapture.takePhoto().then(function(blob) {
      imageElement.src = URL.createObjectURL(blob);
      imageModal.show();
    });

    var downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.addEventListener("click", function() {
    var imageUrl = imageElement.getAttribute("src");
    var link = document.createElement("a");
    link.setAttribute("href", imageUrl);
    link.setAttribute("download", "image.jpg");
    link.click();
    });
}

exports.takeSnapshot = takeSnapshot;
