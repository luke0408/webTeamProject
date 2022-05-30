//배경 음악
function setHalfVolume() {
	var myAudio = document.getElementById("audio");
	myAudio.volume = 0.2;
}

let on_off = document.querySelector(".musicOn");

on_off.onclick = function () {
	if (audio.paused) {
		audio.play();
	}
	else {
		audio.pause();
	}
}

var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // 키 값
            case 32: e.preventDefault(); break; // Space bar
            default: break;
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);