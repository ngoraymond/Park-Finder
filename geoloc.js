var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 8
    });
}
function findMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
        
        /*
        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false&key=AIzaSyCLWUexYVG_0sCUdycc6zIsNJjUGiTcz7k";

        output.appendChild(img);
        */
       map.setCenter({lat: latitude, lng: longitude});
       var places = document.getElementById("nearby");
       var answer = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude+"," + longitude+ "&radius=1000&type=park&opennow&key=AIzaSyAoArmgrsG6qYabx-0lIWFlLX3HPERCj5I";
       var objAns = JSON.parse(answer);
       var placeNames = "";
       for(int i = 0; i<objAns.results.length; i++)
       {
            placeNames+= objAns.results[i].name + ", ";
       }
       places.innerHTML = placeNames+" " +answer;
       
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
    }