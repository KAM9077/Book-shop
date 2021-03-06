angular.module('book.auth', [])

.controller('AuthController', function ($scope , $window , $location , Auth,$route) {
  $scope.user = {};
     if($window.localStorage.getItem("com.book")) {
        $location.path('/');
      } 

  $scope.signin = function () {
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    if(userFlag && passFlag){
      Auth.signin($scope.user)
      .then(function (data) {
        console.log(data)
        $window.localStorage.setItem('com.book', data.token);
        $window.localStorage.setItem('user.book', $scope.user.username);
      /////////////////////////duaaa////////////////
        $window.localStorage['isLogin'] = true;
        /////////////////////duaa////////////////
        if(data.user.type){
          $window.localStorage.setItem('user.type', data.user.type);  
        }

         if(data.user.type === 'admin'){
             $location.path('/books/add');
             $route.reload();
         }else {
              $location.path('/');
         }
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      if(!userFlag && !passFlag){
        $scope.msg = "Wrong input for user or Password  "
      } else if(!userFlag){
        $scope.msg = "please inter your username"
      } else if (!passFlag){
        $scope.msg = "please inter your password"
      }
    }
  }


  $scope.signup = function () {
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    if(userFlag && passFlag){
      Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.book', token);
        $window.localStorage.setItem('user.book', $scope.user.username);
        $location.path('/');
        $route.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
    } else {
      if(!userFlag && !passFlag){
       $scope.msg = "Wrong input for user or Password"
     } else if(!userFlag){
      $scope.msg = "please inter all fild"
    } else if (!passFlag){
      $scope.msg = "please inter all fild"
    }
  }
}

// $scope.islogin = function () {
//       if($window.localStorage['token']){
//         $window.islogin = true;
//       }else{
//         $window.islogin = false;
//       }

//       console.log($window.islogin)
//     }


$scope.signout = function(){
  Auth.signout();
  $route.reload();
}


});
