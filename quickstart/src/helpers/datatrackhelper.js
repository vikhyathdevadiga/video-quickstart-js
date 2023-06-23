'use strict';

function setupDataTrackChat(dataTrack){

    var chatBtn = document.getElementById("chatBtn");
    var chatModal = new bootstrap.Modal(document.getElementById("chatModal"));
    
    chatBtn.addEventListener("click", function() {
    chatModal.toggle();
    });

    var sendMessageButton = document.getElementById("sendMessage");
    var messageElement = document.getElementById('messageInput');
    sendMessageButton.onclick = function() {
        var message = messageElement.value;
        messageElement.value = "";
        dataTrack.send(message);
        updateMessageUI(message, 'sent');
    }
}

function updateMessageUI(message, type){
    // var chatDiv = document.getElementById('chat-messages');
    var messageList = document.getElementById('pings');
    if(type === 'sent'){
        messageList.innerHTML += `<li><p class="p-3 ml-5 text-truncate bg-info">${message}<p></li>`
    }else{
        messageList.innerHTML += `<li>${type}<p class="p-3 text-truncate mr-5 bg-light">${message}</p></li>`
    }
}

exports.setupDataTrackChat = setupDataTrackChat;
exports.updateMessageUI = updateMessageUI;
