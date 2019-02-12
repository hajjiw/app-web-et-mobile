let counterApp = angular.module("counterApp", []);

counterApp.controller("CounterSavedCtrl", [
  "$scope",
  $scope => {
    $scope.load = () => ($scope.count = localStorage.getItem("count"));

    $scope.increment = () => {
      $scope.count++;
      localStorage.setItem("count", $scope.count);
    };

    $scope.load();
  }
]);
