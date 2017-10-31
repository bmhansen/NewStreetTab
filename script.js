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
  // 100km search radius is a balance between it being too small and looping 
  // many times to find land or it being too large and always snapping to 
  // islands in the middle of oceans (although it does still do this often)
  var snaptoRadiusMeters = 100e3;
  var sv = new google.maps.StreetViewService();
  // Random value from 1 to -1, cubed to make most values closer to 0 and keep 
  // negative values negative, mapped onto 65 degrees of latitude because 
  // there is boring stuff in the top/bottom 25 degrees of world.
  var randLat = ((Math.random()*2 - 1)**3)*65;
  var randLng = (Math.random() * 360) - 90;
  sv.getPanorama({location: {lat: randLat, lng: randLng}, radius: snaptoRadiusMeters}, callback);
}

function processSVData(data, status) {
  if (status === 'OK') {
    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 270,
      pitch: 0,
    });
    panorama.setVisible(true);
  } else {
    //try another location, try parallel requests later maybe?
	randomStreetView(processSVData);
  }
}

//dirty cleanup
window.onload = function () {
  document.getElementsByClassName("gmnoprint gm-style-cc")[0].remove();
  document.getElementsByClassName("gm-style-cc")[1].remove();
  document.getElementsByClassName("gmnoprint")[1].style.right = 0;
}