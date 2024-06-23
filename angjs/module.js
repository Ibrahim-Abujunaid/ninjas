let MyNinjaApp = angular.module('MyNinjaApp', ['ngRoute']);

MyNinjaApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'home.html' 
    })
    .when('/directory', {
      templateUrl: 'directory.html', 
      controller: 'NinjaController'
    })
    .otherwise({
      redirectTo: '/home'
    });

}]);

MyNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {
    $scope.addNinja = function() {
      $scope.ningas.push({
        name: $scope.newninja.name,
        rate: parseInt($scope.newninja.rate),
        belt: $scope.newninja.belt,
        available: true
      });
      $scope.newninja.name = "";
      $scope.newninja.rate = "";
      $scope.newninja.belt = "";
    };

    $scope.removeNinja = function(ninja) {
      let removeNinja = $scope.ningas.indexOf(ninja);
      if (removeNinja !== -1) {
        $scope.ningas.splice(removeNinja, 1);
      }
    };

    $http.get("/ninjas.json").then(function(response) {
      $scope.ningas = response.data;
    }).catch(function(error) {
      console.error("Error loading ninja data:", error);
    });

}]);

