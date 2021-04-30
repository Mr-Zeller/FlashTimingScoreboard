let socket = new WebSocket("ws://127.0.0.1:8080");

socket.onmessage = function(event) {
  let message = event.data;

  let obj = JSON.parse(message);
  
  let messageElem = document.createElement('p');
  messageElem.textContent = obj.city;
  
  document.getElementById('messages').prepend(messageElem);
}