function applyFilter(localVideoTrack, filter){

  var videoProcessor;
  
  //Add Black and White background
  if(filter === 'blackAndwhite'){
    removeFilter(localVideoTrack);
    videoProcessor = {
      processFrame: (inputFrame, outputFrame) => {
        const ctx = outputFrame.getContext('2d');
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(inputFrame, 0, 0);
      }
    }
    localVideoTrack.addProcessor(videoProcessor);
  }
    
  //Add Blur background
  else if(filter === 'blur'){
    removeFilter(localVideoTrack);
    videoProcessor = new Twilio.VideoProcessors.GaussianBlurBackgroundProcessor({
      assetsPath: './build',
      maskBlurRadius: 15,
      blurFilterRadius: 9,
    });
    videoProcessor.loadModel().then( () => {
      localVideoTrack.addProcessor(videoProcessor);
    });
    }

    //Add Image Background
    else if(filter === 'image'){ 
      removeFilter(localVideoTrack);       
      const img = new Image();
      img.onload = () => {
        videoProcessor = new Twilio.VideoProcessors.VirtualBackgroundProcessor({
          assetsPath: './build',
          backgroundImage: img,
        });

        videoProcessor.loadModel().then(() => {
          localVideoTrack.addProcessor(videoProcessor);
        });
      };
      img.src = './background.jpg';
      }
      
  }

function removeFilter(localVideoTrack){
  if (localVideoTrack && localVideoTrack.processor) {
    localVideoTrack.removeProcessor(localVideoTrack.processor);
  }
}

exports.applyFilter = applyFilter;
exports.removeFilter = removeFilter;
