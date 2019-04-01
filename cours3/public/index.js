let mainController = ($scope, $http, $window) => {
  $scope.formData = {};
  $scope.user = '';

  $scope.getTodos = () => {
    $http
      .get('/api/list')
      .then(data => {
        $scope.list = data.data;
      })
      .catch(data => {
        console.log('Error: ' + data);
      });
  };

  $scope.createTodo = () => {
    if ($scope.formData.todo !== undefined) {
      $http
        .post('/api/list', $scope.formData)
        .then(data => {
          $scope.formData = {};
          $scope.list = data.data;
        })
        .catch(data => {
          console.log('Error: ' + data);
        });
    }
  };

  $scope.deleteTodo = id => {
    $http
      .delete('/api/list/' + id)
      .then(data => {
        $scope.getTodos();
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  $scope.updateTodo = x => {
    // we get the todo and compare it with the current one
    // to see if it has changed
    $http
      .get('/api/list/todo/' + x._id)
      .then(data => {
        if (data.data.todo !== x.todo) {
          $http
            .put('/api/list/todo/' + x._id, x)
            .then(data => {
              $scope.list = data.data;
            })
            .catch(err => {
              console.log('Error: ' + err);
            });
        }
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  $scope.getCurrentUser = () => {
    $http
      .get('/api/list/user')
      .then(data => {
        $scope.user = data.data;
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  $scope.logout = () => {
    $http
      .get('/logout')
      .then(data => {
        $window.location.href = '/login';
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  $scope.getCurrentUser();
  $scope.getTodos();
};

let loginController = ($scope, $http, $window) => {
  $scope.credentials = {};
  $scope.login = () => {
    $http
      .post('/login', $scope.credentials)
      .then(data => {
        if (data.data.status === 401 || data.data === false)
          $window.location.href = '/login';
        else $window.location.href = '/todo';
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };
};

const TodoApp = angular
  .module('TodoApp', [])
  .controller('mainController', mainController);

const LoginApp = angular
  .module('LoginApp', [])
  .controller('loginController', loginController);
