angular.module('starter.controllers', [])

.controller('TypeCtrl', function($scope, I4MIMidataService, $timeout, $state) {
            //DELETE LOCAL STORAGE FOR TEST USE
            window.localStorage.setItem("userType", "");

            if (window.localStorage.getItem("userType") == "") {

            $scope.choosePatient = function () {
                window.localStorage.setItem("userType", 1);
                $state.go('login');
            }
            $scope.chooseHealthProf = function () {
                window.localStorage.setItem("userType", 2);
                $state.go('login');
            }

            } else {
                $state.go('login');
            }

            })

.controller('LoginCtrl', function($scope, I4MIMidataService, $timeout, $state) {
            if (window.localStorage.getItem("userType") == 1) {
            // Use for testing the development environment
            $scope.user = {
            username: 'Patient1@midata.coop',
            password: 'Patient123456!',
            server: 'https://test.midata.coop:9000',
            role: 'member'
            }
            }
            if (window.localStorage.getItem("userType") == 2) {
            // Use for testing the development environment
            $scope.user = {
            username: 'donald.mallard@midata.coop',
            password: 'Hp123456!',
            server: 'https://test.midata.coop:9000',
            role: 'provider'
            }
            }

            // Connect with MIDATA
            $scope.loggedIn = I4MIMidataService.loggedIn();
            //$scope.hideLogin = "hideLogin";
            var timer = $timeout(function refresh() {
                                if (I4MIMidataService.loggedIn()) {
                                    $state.go('chats');
                                } else {
                                 timer = $timeout(refresh, 1000);}
                                 }, 1000);

           /* $scope.saveSelectValue = function (userType) {
                //1 = Patient
                //2 = Health Provider
                window.localStorage.setItem("userType", userType);
                console.log(userType);
                $scope.hideLogin = "";
            }*/

            $scope.changeType = function () {
            $state.go('chooseType');
            }

            })

.controller('ChatsCtrl', function($scope, I4MIMidataService, Chats, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //           });

            var isLoggedIn = I4MIMidataService.loggedIn();
            if (isLoggedIn) {
                $scope.chats = Chats.all();
                $scope.patients = Chats.retreivePatients(I4MIMidataService, ['data','name']);
            if (window.localStorage.getItem("userType") == 1) {
                //$state.go('#/chats/0');
            }
                $scope.remove = function(chat) { Chats.remove(chat); };
                $scope.logout = function() {
                    I4MIMidataService.logout();
                    $state.go('login');
                };
            } else {
                 $state.go('login')
            }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, I4MIMidataService, $state) {
             var isLoggedIn = I4MIMidataService.loggedIn();
             if (isLoggedIn) {
                $scope.chat = Chats.get($stateParams.chatId);
                $scope.logout = function() {
                    I4MIMidataService.logout();
                $state.go('login');
                };
            } else {
             $state.go('login')
            }
});
