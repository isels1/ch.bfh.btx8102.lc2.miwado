angular.module('starter.controllers', [])

.controller('TypeCtrl', function($scope, $timeout, $state, $compile) {
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

  //Textbaussteine Controller (später ausgelagert jetztin changeRole für testing)
      $scope.status = true;

  $scope.addLocation = function(){
      var locationDiv =     document.getElementsByClassName('locationVisibile');
      if($scope.status == true){
        $scope.status = false;
        locationDiv[1].style.visibility = "hidden";
        locationDiv[1].style.height = "0px";
      }else{
        $scope.status = true;
        locationDiv[1].style.visibility = "visible";
        locationDiv[1].style.height = "";
      }
    }




  $scope.selectedOption = true;

  $scope.statusChange = function(){
    var selcetionDiv =     document.getElementsByClassName('selectVisible');
    if($scope.selectedOption == true){
      $scope.selectedOption = false;
      selcetionDiv[1].style.visibility = "hidden";
      selcetionDiv[1].style.height = "15px";
      selcetionDiv[1].style.width = "0px";
    }else{
      $scope.selectedOption = true;
      selcetionDiv[1].style.visibility = "visible";
      selcetionDiv[1].style.height = "";
      selcetionDiv[1].style.width = "";
      selcetionDiv[1].style.marginTop = "-3% !important";
      selcetionDiv[1].style.marginBottom = "-3% !important";
    }
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
    var un = document.getElementById("user").value;
    var pw = document.getElementById("pw").value;

    if (un != '' && $scope.user.username !== un) {
      $scope.user.username = un;
    }

    if (pw != '' && $scope.user.password !== pw) {
      $scope.user.password = pw;
    }

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
