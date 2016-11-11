angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, I4MIMidataService) {
            
            // Use for testing the development environment
            $scope.user = {
                username: 'stefandaniel.iseli@gmail.com',
                server: 'https://test.midata.coop:9000'
            }
            // Connect with MIDATA
            $scope.loggedIn = I4MIMidataService.loggedIn();
            
            })

.controller('ChatsCtrl', function($scope, I4MIMidataService, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //           });
            var asd = I4MIMidataService.loggedIn();
            if (asd) {
            $scope.chats = Chats.all();
            $scope.remove = function(chat) {
            Chats.remove(chat);
            };
            } else {
            window.alert('Y u no login? (/-.-)/');
            }
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
            });
