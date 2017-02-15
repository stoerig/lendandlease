/**
 * Created by Basel on 2/15/2017.
 */

angular.module('myApp.items_list', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/itemsList', {
            templateUrl: 'views/items_list.html',
            controller: 'controller_items_list'
        });
    }])

    .controller('controller_items_list', ['$scope', '$http', function($scope, $http) {
        $http({
            method : "GET",
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

    }]);


