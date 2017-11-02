var panorama;
function init() {
  panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),
  {
    pov: {heading: Math.floor(Math.random() * 360), pitch: 0},
    zoom: .5,
	disableDefaultUI: true,
	addressControl: true,
  });
  // attempts to use a locally stored panorama, fetches new one if not found
  chrome.storage.sync.get("panoData", processLocalFetch);
  //fetches another panorama for next time a tab is opened
  randomStreetView(storePano);
}

function processLocalFetch(data) {
  // if there is no locally stored panorama then find one and use it
  if (Object.keys(data).length === 0 && data.constructor === Object){
    randomStreetView(usePano);
  }
  panorama.setPano(data.panoData);
}

function randomStreetView(callback) {
  // 10km search radius is a balance between taking too long to find a
  // panorama and having it mostly snap to coastal places
  var snaptoRadiusMeters = 10e3;
  var sv = new google.maps.StreetViewService();
  // Random value from 1 to -1, cubed to make most values closer to 0 and to
  // keep negative values negative, mapped onto 65 degrees of latitude 
  // because there is boring stuff in the top/bottom 25 degrees of world.
  var randLat = ((Math.random()*2 - 1)**3)*65;
  //random longitude 0-360 degrees
  var randLng = (Math.random() * 360) - 180;
  sv.getPanorama({location: {lat: randLat, lng: randLng}, radius: snaptoRadiusMeters}, callback);
}

function storePano(data, status) {
  if (status === "OK") {
    console.log(data.location.pano);
    chrome.storage.sync.set({"panoData": data.location.pano}, );
  } else {
    //try another location, try parallel requests later maybe?
	randomStreetView(storePano);
  }
}

function usePano(data, status) {
  if (status === "OK") {
    panorama.setPano(data.location.pano);
  } else {
    //try another location, try parallel requests later maybe?
	randomStreetView(usePano);
  }
}

//dirty cleanup
window.onload = function () {
  document.getElementsByClassName("gmnoprint gm-style-cc")[0].remove();
  document.getElementsByClassName("gm-style-cc")[1].remove();
  document.getElementsByClassName("gmnoprint")[1].style.right = 0;
}