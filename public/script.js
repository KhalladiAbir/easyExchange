// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

var id = 2;
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', '/api/user/'+id, true);

request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    const usernameDiv = document.getElementById('username');
    usernameDiv.textContent = data.username;


  } else {
    console.log('error');
  }
}

request.send();
