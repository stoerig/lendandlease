/**
 * Created by Basel on 2/15/2017.
 */

angular.module('myApp.add_item', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addItem', {
            templateUrl: 'views/add_item.html',
            controller: 'controller_add_item'
        });
    }])

    .controller('controller_add_item', ['$scope', '$http', function($scope, $http) {

        $scope.prop = {   "type": "select",
            "name": "Service",
            "value": "Books",
            "values": ['Books', 'Tools', 'Toothbrushes']
        };

        $scope.submit = function(){
            /*
            To use the temporary server POST request, we need 2 things:
            1- Add the content-type: application/json header to the request
            2- Send in the body, the data as JSON object
            Also, the JSON file has to contain an array called items that has objects with name, desc, category keys
            */
            $http({
                method : "POST",
                url : "http://localhost:3000/items",
                headers: {
                    'Content-Type': "application/json"
                },
                data: {
                    "name" : $scope.item.name,
                    "desc" : $scope.item.desc,
                    "category" : $scope.prop.value
                }
            }).then(function mySucces(response) {
                alert("done");
            }, function myError(response) {
                alert("Error");
            });
        };

    }]);


