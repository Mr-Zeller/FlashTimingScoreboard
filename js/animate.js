let animateScoreboard = function() {
    let height = document.getElementById("scoreboard").children[0].offsetHeight; //Height of each lane
    let length = document.getElementById("scoreboard").children.length; //Number of lanes

    if (height * length <= height * 7) { //If less than 7 lanes are showing
        return;
    }

    let necessaryOffset = (height * (length - 7)); //Maximizes the number of lanes on screen

    let animation = document.getElementById("scoreboard").animate([
        // keyframes
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-' + necessaryOffset + 'px)' }
      ], {
        // timing options
        duration: 1000 * length,
        iterations: 2,
        direction: "alternate",
        endDelay: 3000,
    });

    animation.onfinish = function() {
        setTimeout(animateScoreboard(), 3000);
    }
}


window.onload = function() {
    setTimeout(animateScoreboard, 3000);
}