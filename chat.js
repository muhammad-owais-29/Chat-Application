var myName = prompt("Please Enter your name");
  function sendMessage() {
        
        var message = document.getElementById("message").value;
 
        
        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message
        });
 
        
        return false;
    }
    
    firebase.database().ref("messages").on("child_added", function (snapshot) {
        var html = "";
        
        html += "<li id='message-" + snapshot.key + "'>";
        
        if (snapshot.val().sender == myName) {
            html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                html += "Delete";
            html += "</button>";
        }
        html += snapshot.val().sender + ": " + snapshot.val().message;
        html += "</li>";
 
        document.getElementById("messages").innerHTML += html;
    });

    function deleteMessage(self) {
        
        var messageId = self.getAttribute("data-id");
     
        
        firebase.database().ref("messages").child(messageId).remove();
    }
     
    
    firebase.database().ref("messages").on("child_removed", function (snapshot) {
        
        document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
    });