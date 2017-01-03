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

    /*if (un != '' && $scope.user.username !== un) {
      $scope.user.username = un;
    }

    if (pw != '' && $scope.user.password !== pw) {
      $scope.user.password = pw;
    }*/

    ownMidataService.login($scope.user.username,
             $scope.user.password,
             $scope.user.role);
  }

  // Connect with MIDATA
  $scope.loggedIn = ownMidataService.loggedIn();
  //$scope.hideLogin = "hideLogin";
  var timer = $timeout(function refresh() {
    if (ownMidataService.loggedIn()) {
      window.localStorage.setItem("userName", $scope.user.username);

      // When Patient, go directly to communication thread
      // Else --> Load "contact" List
      if (window.localStorage.getItem("userType") == 1) {
          $state.go('communicationThread');
      } else {
          $state.go('threadOverview');
      }
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

.controller('ChatsCtrl', function($scope, Contacts, $state, ownMidataService) {
  var isLoggedIn = ownMidataService.loggedIn();
  if (isLoggedIn) {
      /*var searchObj = {
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
            console.log(r);
          })
        }

      };*/


      $scope.patients = Contacts.allPats();

      //$scope.remove = function(chat) { Chats.remove(chat); };
      $scope.logout = function() {
          ownMidataService.logout();
          $state.go('login');
      };

      //Function adds communicationThreads when midata would work
      $scope.addChats = function(r) {
        console.log(r);
      };
  } else {
       $state.go('login')
  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Contacts, ownMidataService, $state, $ionicScrollDelegate) {
             var isLoggedIn = ownMidataService.loggedIn();
             if (isLoggedIn) {
               $scope.me = Contacts.selectPat(window.localStorage.getItem("userName"));
               $scope.myId = "123123" ;//$scope.me.id;

               console.log("This is me:" + JSON.stringify($scope.me));
               console.log("My id is: " + $scope.myId);
               console.log('in Thread');

               $scope.hideTime = true;

                var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

                $scope.receiveMessage = function() {
                    var res = "Communication";
                    var params = {};
                    ownMidataService.search(res, params).then(function(comms) {
                      comms = comms.reverse();
                      console.log(comms);
                      $scope.messages = [];

                      for (var i = 0; i < comms.length; i++) {
                        var d = new Date(comms[i].sent)
                        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
                        var t = ""
                        if (comms[i].payload == null) {
                          t = "No Content aviable";
                        } else {
                          t = comms[i].payload[0].contentString
                        }

                        var sId = comms[i].sender.reference;
                        sId = sId.replace("Patient/", "");

                        if ($scope.me.id === sId) {
                          console.log("MyMsg");
                        }

                        $scope.messages.push({
                            userId: sId,
                            sender: comms[i].sender.display,
                            text: t,
                            time: d
                          });
                      }
                    });
                }

                $scope.sendMessage = function() {
                  var d = new Date();

                  var category = "FreeText";
                  var sender = "Patient/" + $scope.me.id;
                  var medium = {
                    type: "App",
                    name: "MIWADO"
                  };
                  var subject = "Patient/" + $scope.me.id;

                  var communicationResource = {
                    "resourceType" : "Communication",
                    "category" : { category },
                    "sender" : { sender },
                    "status" : "in-progress",
                    "recipient" : [{"reference":"Patient/" + $scope.me.id, "display": $scope.me.name}],
                    "payload" : [{
                      "contentString" : $scope.data.message
                      //"contentAttachment" : {},
                      //"contentReference" : {}
                    }],
                    "medium" : [{ medium }],
                    "status" : "in-progress", // in-progress | completed | suspended | rejected | failed
                    "encounter" : {},
                    "sent" : d,
                    //"received" : "<dateTime>", // When received
                    "reason" : [{}],
                    "subject" : { subject },
                    "requestDetail" : {}
                  }

                  ownMidataService.saveComm(communicationResource).then(function(e){
                      console.log('Resource Created: ' + e);
                      $scope.receiveMessage();
                      $ionicScrollDelegate.scrollBottom(true);
                  });

                  delete $scope.data.message;
                };

                $scope.inputDown = function() {
                if (isIOS) $scope.data.keyboardHeight = 0;
                  $ionicScrollDelegate.resize();
                };

                $scope.closeKeyboard = function() {
                  // cordova.plugins.Keyboard.close();
                };

                $scope.data = {};
                $scope.messages = [];

                $scope.receiveMessage();
               $scope.logout = function() {
                   ownMidataService.logout();
                   $state.go('login');
               };
            } else {
             $state.go('login')
            }
});
