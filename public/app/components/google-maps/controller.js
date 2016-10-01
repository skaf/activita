var APP = angular.module("APP");
APP.directive("googleMaps", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/google-maps/template.hbs",
        scope: {
            apiKey: "=",
            location: "=",
            locations: "=",
            zoom: "@"
        },
        controller: ["$scope", function($scope) {
            var map,
                bounds,
                markers = [];
            $scope.$watchGroup(["initialized", "location", "locations", "zoom"], function(value, old_value) {
                var initialized = value[0],
                    location = value[1],
                    locations = [],
                    zoom = value[3] || 16;
                angular.copy(value[2] || [], locations);

                if (!initialized)
                    return;
                if (location) {
                    if (typeof location === "string") {
                        locations.push({
                            location: location,
                            title: "You are here"
                        });
                    } else {
                        locations.push({
                            location: `${location.lat},${location.lng}`,
                            title: "You are here"
                        });
                    }
                }
                if (!map) {
                    map = new google.maps.Map($scope.element, {
                        mapTypeId: google.maps.MapTypeId.TERRAIN,
                        zoom: zoom
                    });
                }
                bounds = new google.maps.LatLngBounds();
                while (markers.length) {
                    var marker = markers.splice(0, 1)[0];
                    marker.setMap(null);
                }


                locations.forEach(function(location) {
                    var latlng = /^(\-?[0-9]+\.?[0-9]*),(\-?[0-9]+\.?[0-9]*)$/.exec(location.location);
                    var position = new google.maps.LatLng(latlng[1], latlng[2]);
                    var marker = new google.maps.Marker({
                        zoom: zoom,
                        position: position,
                        map: map,
                        title: location.title
                    });
                    markers.push(marker);

                    var infowindow = new google.maps.InfoWindow({
                        content: `<div style="color: black;">${location.title}</div>`
                    });

                    infowindow.open(map, marker);
                    bounds.extend(position);
                });
                map.fitBounds(bounds);
            }, true);
        }],
        link: function($scope, element, attrs) {
            $scope.element = element[0];
            var wait_for_google = function() {
                var count = 0;
                var interval = setInterval(function() {
                    if (window.google) {
                        $scope.$apply(function() {
                            $scope.initialized = true;
                            clearInterval(interval);
                        });
                    }
                }, 10);
            };
            if (document.getElementById("APP_map"))
                return wait_for_google();
            var map_script = document.createElement("script");
            map_script.setAttribute("src", `http://maps.google.com/maps/api/js?key=${$scope.apiKey}`);
            map_script.setAttribute("id", "APP_map");
            document.head.appendChild(map_script);

            return wait_for_google();
        }
    };
}]);