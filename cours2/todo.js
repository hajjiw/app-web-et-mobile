let todoApp = angular.module("todoApp", []);

todoApp.controller("todoList", [
  "$scope",
  $scope => {
    $scope.tasks = sessionStorage.getItem("tasks")
      ? JSON.parse(sessionStorage.getItem("tasks"))
      : [];
    $scope.deletedTasks = [];

    $scope.addTask = () => {
      $scope.tasks.push($scope.newTask);
      $scope.newTask = "";
      sessionStorage.setItem("tasks", JSON.stringify($scope.tasks));
    };

    $scope.deleteTask = index => {
      $scope.deletedTasks.push($scope.tasks[index]);
      $scope.tasks.splice(index, 1);
    };

    $scope.restoreTask = index => {
      $scope.tasks.push($scope.deletedTasks[index]);
      $scope.deletedTasks.splice(index, 1);
    };
  }
]);
