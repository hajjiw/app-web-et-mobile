let todoApp = angular.module("todoApp", []);

todoApp.controller("todoList", [
  "$scope",
  $scope => {
    $scope.tasks = sessionStorage.getItem("tasks")
      ? JSON.parse(sessionStorage.getItem("tasks"))
      : [];

    $scope.addTask = () => {
      if ($scope.newTask !== "") {
        $scope.tasks.push({ title: $scope.newTask, done: false });
        $scope.newTask = "";
        sessionStorage.setItem("tasks", JSON.stringify($scope.tasks));
      }
    };

    $scope.toggleTask = index => {
      $scope.tasks[index].done = !$scope.tasks[index].done;
      sessionStorage.setItem("tasks", JSON.stringify($scope.tasks));
    };

    $scope.removeFinishedTasks = () => {
      for (let index = $scope.tasks.length - 1; index >= 0; index--) {
        if ($scope.tasks[index].done) {
          $scope.tasks.splice(index, 1);
        }
      }
      sessionStorage.setItem("tasks", JSON.stringify($scope.tasks));
    };
  }
]);
