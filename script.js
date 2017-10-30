var panorama;
function init() {
  panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),
  {
    pov: {heading: Math.floor(Math.random() * 360), pitch: 0},
    zoom: .5,
	disableDefaultUI: true,
	addressControl: true,
  });
  
  randomStreetView(processSVData);
}

function randomStreetView(callback) {
  var sv = new google.maps.StreetViewService();
  //var randLat = (Math.random() * 180) - 90;
  var randLat = Math.random() < 0.5 ? -(Math.random()**3)*65 : (Math.random()**3)*65;
  var randLng = (Math.random() * 360) - 90;
  sv.getPanorama({location: {lat: randLat, lng: randLng}, radius: 100000000}, callback);
}

function processSVData(data, status) {
  if (status === 'OK') {
    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
    panorama.setVisible(true);
  } else {
    //try another location
	randomStreetView(processSVData);
  }
}

//cleanup
window.onload = function () {
  document.getElementsByClassName("gmnoprint gm-style-cc")[0].remove();
  document.getElementsByClassName("gm-style-cc")[1].remove();
  document.getElementsByClassName("gmnoprint")[1].style.right = 0;
}