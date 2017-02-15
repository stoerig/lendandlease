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
            $http({
                method : "POST",
                url : "http://localhost:3000",
                data: {
                    "itemName" : $scope.item.name,
                    "itemDesc" : $scope.item.desc,
                    "category" : $scope.item.category
                }
            }).then(function mySucces(response) {
                alert("done");
            }, function myError(response) {
                alert("Error");
            });
        };

    }]);


