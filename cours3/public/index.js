const TodoApp = angular.module("TodoApp", []);

let mainController = ($scope, $http) => {
  $scope.formData = {};
  $http
    .get("/api/list")
    .success(data => {
      $scope.list = data;
      console.log(data);
    })
    .error(data => {
      console.log("Error: " + data);
    });

  $scope.createTodo = () => {
    $http
      .post("/api/list", $scope.formData)
      .success(data => {
        $scope.formData = {};
        $scope.list = data;
        console.log(data);
      })
      .error(data => {
        console.log("Error: " + data);
      });
  };

  $scope.deleteTodo = id => {
    $http
      .delete("/api/list" + id)
      .success(data => {
        $scope.list = data;
        console.log(data);
      })
      .error(data => {
        console.log("Error: " + data);
      });
  };
};
