let mainController = ($scope, $http) => {
  $scope.formData = {};

  $scope.getTodos = () => {
    $http
      .get('/api/list')
      .then(data => {
        $scope.list = data.data;
        console.log(data.data);
      })
      .catch(data => {
        console.log('Error: ' + data);
      });
  };

  $scope.createTodo = () => {
    $http
      .post('/api/list', $scope.formData)
      .then(data => {
        $scope.formData = {};
        $scope.list = data.data;
        console.log(data.data);
      })
      .catch(data => {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteTodo = id => {
    $http
      .delete('/api/list/' + id)
      .then(data => {
        $scope.getTodos();
        console.log(data.data);
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  $scope.getTodos();
};

const TodoApp = angular
  .module('TodoApp', [])
  .controller('mainController', mainController);
