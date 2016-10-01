var APP = angular.module("APP");
APP.directive("googleAddress", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/google-address/template.hbs",
        scope: {
            apiKey: "=",
            location: "="
        },
        controller: ["$scope", "$timeout", "_geo", function($scope, $timeout, _geo) {

            $scope.model = {
                address: "",
                suggestions: []
            };
            var timeout;
            $scope.actions = {
                get_location: function() {
                    if (!$scope.initialized)
                        return;
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'address': $scope.model.address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $scope.$apply(function() {
                                var latlng = results[0].geometry.location.toJSON();
                                $scope.location = `${latlng.lat},${latlng.lng}`;
                            });
                        }
                    });
                },
                get_suggestions: function() {
                    if (!$scope.initialized)
                        return;
                    $timeout.cancel(timeout);
                    timeout = $timeout(function() {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'address': $scope.model.address
                        }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                $scope.$apply(function() {
                                    angular.copy([], $scope.model.suggestions);
                                    results.forEach(function(result) {
                                        var extracted = {
                                            address: "",
                                            city: "",
                                            country: "",
                                            location: {
                                                lat: 0,
                                                lng: 0
                                            },
                                            name: "",
                                            state: "",
                                            street: "",
                                            zip: ""
                                        };
                                        extracted.address = result.formatted_address;
                                        extracted.location.lat = result.geometry.location.lat();
                                        extracted.location.lng = result.geometry.location.lng();
                                        result.address_components.forEach(function(component) {
                                            switch (component.types[0]) {
                                                case "country":
                                                    extracted.country = component.long_name;
                                                    break;
                                                case "postal_code":
                                                    extracted.zip = component.long_name;
                                                    break;
                                                case "locality":
                                                    extracted.city = component.long_name;
                                                    break;
                                                case "administrative_area_level_1":
                                                    extracted.state = component.long_name;
                                                    break;
                                                case "route":
                                                    extracted.street ? component.long_name + " " + extracted.street : component.long_name;
                                                    break;
                                                case "street_number":
                                                    extracted.street ? extracted.street + " " + component.long_name : component.long_name;
                                                    break;

                                            }
                                        });
                                        $scope.model.suggestions.push({
                                            address: result.formatted_address,
                                            location: `${result.geometry.location.lat()},${result.geometry.location.lng()}`,
                                            formatted: extracted
                                        });
                                    });
                                });
                            }
                        });
                    }, 650);
                },
                use_suggestion: function(suggestion) {
                    $scope.model.address = suggestion.address;
                    $scope.location = suggestion.location;
                    angular.copy([], $scope.model.suggestions);
                },
                set_geo_location: function() {
                    _geo.location()
                        .then(function(position) {
                            $scope.location = position;
                            return _geo.address_from_location(position);
                        })
                        .then(function(address) {
                            $scope.model.address = address;
                        })
                        .catch(function(err) {
                            alert(err.message);
                            console.trace(err);
                        });
                },
                use_profile_location: function() {
                    alert("Not implemented");
                }
            }
        }],
        link: function($scope, element, attrs) {
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
            $scope.element = element[0];
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