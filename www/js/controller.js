angular.module('starter.controllers', [])

.controller('LoginCtrl',['$scope', '$state', 'UserService', '$ionicHistory', 
function($scope, $state, UserService, $ionicHistory) {
    $scope.user = {};

    $scope.loginSubmitForm = function(form)
    {
        if(form.$valid)
        {   
            UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    //Should return a token
                    console.log(response);
                    $ionicHistory.nextViewOptions({
                      historyRoot: true,
                      disableBack: true
                    });
                    $state.go('lobby');
                } else {
                    // invalid response
                    alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                }
            }, function(response) {
                // something went wrong
                console.log(response);
                if(response.status === 401)
                {
                    alert("Incorrect username or password");
                }else if(response.data === null) {
                    alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                }else {
                    alert("Something went wrong, try again.");
                }
                
            });
        }
    };
}])
.controller('RegisterCtrl',['$scope', '$state', 'UserService', '$ionicHistory', 
function($scope, $state, UserService, $ionicHistory) {
    $scope.user = {};
    $scope.repeatPassword = {};
    $scope.signupForm = function(form)
    {
        if(form.$valid)
        {   
            if($scope.user.password !== $scope.repeatPassword.password)
            {
                alert("Passwords must match");
            }else {
                
                UserService.create($scope.user)
                .then(function(response) {
                    if (response.status === 200) {
                        //Should return a token
                        console.log(response);
                        $ionicHistory.nextViewOptions({
                          historyRoot: true,
                          disableBack: true
                        });
                        $state.go('lobby');
                    } else {
                        // invalid response
                        console.log(response);
                        alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                    }
                }, function(response) {
                    
                    console.log(response);
                    // status 422 corresonds to an email been registered to the DB
                    if(response.status === 422)
                    {
                        alert("The email is already taken.");
                    }else if(response.data === null){
                        alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                    }else {
                        alert("Something went wrong, try again.");
                    }
                    
                });
            }
        }
    };
}]);