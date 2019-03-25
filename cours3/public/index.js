let mainController = ($scope, $http) => {
  $scope.formData = {};

  $scope.getTodos = () => {
    $http
      .get("/api/list")
      .then(data => {
        $scope.list = data.data;
      })
      .catch(data => {
        console.log("Error: " + data);
      });
  };

  $scope.createTodo = () => {
    if ($scope.formData.todo !== undefined) {
      $http
        .post("/api/list", $scope.formData)
        .then(data => {
          $scope.formData = {};
          $scope.list = data.data;
        })
        .catch(data => {
          console.log("Error: " + data);
        });
    }
  };

  $scope.deleteTodo = id => {
    $http
      .delete("/api/list/" + id)
      .then(data => {
        $scope.getTodos();
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  };

  $scope.updateTodo = x => {
    $http
      .put("api/list/todo/" + x._id, x)
      .then(data => {
        $scope.list = data.data;
        console.log(data.data);
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  };

  $scope.getTodos();
};

const TodoApp = angular
  .module("TodoApp", [])
  .controller("mainController", mainController);
