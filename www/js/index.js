var mp3URL, media, rainbow, playing = false, colores = new Array("blue", "red", "yellow", "green", "black", "orange"), random, wRandom, timeoutVariable;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	mp3URL = getMediaURL("sounds/button-1.mp3");
	media = new Media(mp3URL, null, mediaError);    
    document.addEventListener("touchend", playMP3, false);
};

function playMP3() {
	if (playing == false) {
		media.play();
		playing = true;		

		rainbow = setInterval(function(){
			newColor();
		}, 100);

		timeoutVariable = window.setTimeout(stopRainbow, 24000);

	} else {
		media.stop();    
		playing = false;
		stopRainbow();
	}    
}

function getMediaURL(s) {

    if (device.platform.toLowerCase() === "android") {
    	return "/android_asset/www/" + s;
    }

    return s;
}

function mediaError(e) {
    console.log('Media Error');
    console.log(JSON.stringify(e));
}

function newColor() {
	random = Math.floor((Math.random() * 5) + 0);
	if (wRandom == random) {		
		newColor();
	}	
	wRandom = random;
	document.querySelector("#rainbow").style.background = colores[random];
}

function stopRainbow() {
	playing = false;
	window.clearTimeout(timeoutVariable);
	window.clearInterval(rainbow);
	document.querySelector("#rainbow").style.background = "black";
}