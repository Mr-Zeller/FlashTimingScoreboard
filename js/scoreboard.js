let socket = new WebSocket("ws://127.0.0.1:8072");
let animation = null;

socket.onerror = function(event) { //If the panel is closed or the page is opened before panel is open.
  if (socket.CLOSED)
  {
    document.getElementById("race").style = "display: none";
    document.getElementById("welcome").style = "display: flex";
    document.getElementById("welcome-head").style = "font-size: 40pt";
    document.getElementById("welcome-head").innerHTML = "Disconnected. Open panel and refresh page to reconnect."
  }
}

socket.onmessage = function(event) {
  let message = event.data;

  let obj = JSON.parse(message);
  
  if (obj.name == undefined) { //Hide races and show welcome
    document.getElementById("race").style = "display: none";
    document.getElementById("welcome").style = "display: flex";
    return;
  }
  else { //Hide welcome and show races
    document.getElementById("welcome").style = "display: none";
    document.getElementById("race").style = "display: inherit";
  }

  clearScoreboard();

  let raceName = obj.name;
  let lanes = obj.lanes;
  
  document.getElementById("race-title").innerHTML = raceName;
  
  lanes.forEach(lane => { //Creates the HTML tag for each lane
    let laneName = lane.laneName;
    let laneSchool = lane.laneSchool.toLowerCase();
    let timeString = lane.timeString;

    let listElement = document.createElement('li');
    let logoElement = document.createElement('img');
    let strongElement = document.createElement('strong');

    logoElement.src = "images/logos/" + laneSchool + ".png";
    strongElement.innerHTML = timeString;

    listElement.append(logoElement);
    listElement.append(laneName);
    listElement.append(strongElement);
    document.getElementById("scoreboard").append(listElement);
  });

  setTimeout(animateScoreboard, 5000); //Tells the screen to start scrolling after being displayed for 5s.
  //TODO If races are displayed within 5s of each other, this will cause a jitter effect because animateScoreboard gets called twice on the same board.
}

function animateScoreboard() {
  let height = document.getElementById("scoreboard").children[0].offsetHeight; //Height of each lane
  let length = document.getElementById("scoreboard").children.length; //Number of lanes

  if (height * length <= height * 6) { //If <= 6 lanes are showing
      return;
  }

  let necessaryOffset = (height * (length - 6)); //Maximizes the number of lanes on screen

  if (animation != null) { //Makes the jittery effect described above much less severe
    animation.cancel();
  }

  animation = document.getElementById("scoreboard").animate([
      // keyframes
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-' + necessaryOffset + 'px)' }
    ], {
      // timing options
      duration: 1000 * length,
      iterations: 2,
      direction: "alternate",
  });

  animation.onfinish = function() {
      setTimeout(animateScoreboard, 5000);
  }
}

function clearScoreboard() {
  let scoreboard = document.getElementById("scoreboard")
    while (scoreboard.firstChild) { //Removes all lane entries
      scoreboard.removeChild(scoreboard.firstChild);
  }
  
  if (animation != null) { //Cancels the current scrolling animation
    animation.cancel();
  }
}