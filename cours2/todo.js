let todoApp = angular.module("todoApp", []);

todoApp.controller("todoList", [
  "$scope",
  $scope => {
    $scope.tasks = sessionStorage.getItem("tasks")
      ? JSON.parse(sessionStorage.getItem("tasks"))
      : [];

    $scope.addTask = () => {
      $scope.tasks.push({ title: $scope.newTask, done: false });
      $scope.newTask = "";
      sessionStorage.setItem("tasks", JSON.stringify($scope.tasks));
    };

    $scope.toggleTask = index => {
      $scope.tasks[index].done = !$scope.tasks[index].done
      // $scope.tasks.splice(index, 1);
      sessionStorage.setItem("tasks", JSON.stringify($scope.tasks));
    };
  }
]);
