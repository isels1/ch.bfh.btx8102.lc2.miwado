angular.module('starter.controllers', [])

.controller('TypeCtrl', function($scope, $timeout, $state) {
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

.controller('LoginCtrl', function($scope, $timeout, $state, ownMidataService) {
  if (window.localStorage.getItem("userType") == 1) {
    // Use for testing the development environment
    $scope.user = {
      username: 'Patient1@midata.coop',
      password: 'Patient123456!',
      server: 'https://test.midata.coop:9000',
      role: 'member'
    }
  } else if (window.localStorage.getItem("userType") == 2) {
    // Use for testing the development environment
    $scope.user = {
      username: 'donald.mallard@midata.coop',
      password: 'Hp123456!',
      server: 'https://test.midata.coop:9000',
      role: 'provider'
    }
  }

  $scope.newLogin = function() {
    ownMidataService.login($scope.user.username,
             $scope.user.password,
             $scope.user.role);
  }

  // Connect with MIDATA
  $scope.loggedIn = ownMidataService.loggedIn();
  //$scope.hideLogin = "hideLogin";
  var timer = $timeout(function refresh() {
    if (ownMidataService.loggedIn()) {
      $state.go('chats');
    } else {
      timer = $timeout(refresh, 1000);}
    },
  1000);

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

.controller('ChatsCtrl', function($scope, Chats, $state, ownMidataService) {
  //$scope.$on('$ionicView.enter', function(e) {
  //           });

  var isLoggedIn = ownMidataService.loggedIn();
  if (isLoggedIn) {
      var searchObj = {
        //name: ''
      }
      ownMidataService.search("Person", searchObj).then(function(personList){
        if (personList == null) {
          console.log("nothing");
        } else {
          $scope.patientLookup(personList);
        }
      });

      $scope.patientLookup = function(personList) {
        var personLinkList = new Array();
        for(var i = 0; i < personList.length; i++) {
          var personObj = {
            id: personList[i].id,
            displayName: personList[i].link[0].target.display,
            url: personList[i].link[0].target.reference
          }
          personLinkList.push(personObj);
        }
        console.log(personLinkList);

        var patients = new Array();
        for(var i = 0; i < personLinkList.length; i++) {
          var searchObj = {
            _id: personLinkList[i].id
          }
          ownMidataService.search("Patient", searchObj).then(function(r) {
            //patients.push(r);

            console.log(r);
          })
        }

      };



      //$scope.chats = Chats.all();
      //$scope.patients = Chats.retreivePatients(I4MIMidataService, ['data','name']);
      if (window.localStorage.getItem("userType") == 1) {
          //$state.go('#/chats/0');
      }
      $scope.remove = function(chat) { Chats.remove(chat); };
      $scope.logout = function() {
          ownMidataService.logout();
          $state.go('login');
      };

      $scope.addChats = function(r) {
        console.log(r);
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
