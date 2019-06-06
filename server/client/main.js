//uuidv4() from https://stackoverflow.com/a/2117523/6267827
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
  });
}

$(function () {
  const socket = io();

  $("#connect").on("click", function(e) {
        socket.emit("recieveDocumentUuid",  {"clientUuid" : "hansi", "documentUuid": $('#documentUuid').val()});
            //socket.emit("saveDocument");
    });
  /*let clientsCursorsPosition = [];
  const socket = io();

  //socket.emit("recieveDocumentUuid", {"clientUuid" : "hansi", "documentUuid": window.location.pathname});


  socket.on("initialDocumentContent", initialContent => {
      $('#editor').val(initialContent);
  });

  $("#connect").on("click", function(e) {
      socket.emit("recieveDocumentUuid",  {"clientUuid" : "hansi", "documentUuid": $('#documentUuid').val()});
          //socket.emit("saveDocument");
  });

*/
  $("#editor").on("input", function(e) {
    e.preventDefault();

    //cursor position code from
    //https://stackoverflow.com/a/7745958/6267827
    const cursorPosition = $('#editor').prop("selectionStart");

    const data = {
        "text" : $("#editor").val(),
        "ClientsCursorPosition" : 0
    };


    socket.emit("typing", data);

    return false;
  });


  socket.on('typing', function(data){
      $('#editor').val(data.text);
      //clientsCursorsPosition =
      //data.ClientsCursorPosition.forEach()
      //alert(data.cursorPosition);
  });
});
