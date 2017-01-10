angular.module('starter.controllers', [])

.controller('DashCtrl', function  ($scope, $state) {
})

.controller('TypeCtrl', function($scope, $timeout, $state, $compile, ownMidataService) {
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
  if (window.localStorage.getItem("userType") == null){
    $state.go('chooseType');
  }

  $scope.input = {
    user: "",
    pw: ""
  }

  $scope.newLogin = function() {
    if ($scope.input.user != '' && $scope.input.user != $scope.user.username) {
      $scope.user.username = $scope.input.user;
    }
    if ($scope.input.pw != '' && $scope.input.pw != $scope.user.password) {
      $scope.user.password = $scope.input.pw;
    }

    ownMidataService.login($scope.user.username,
             $scope.user.password,
             $scope.user.role);

   console.log("My username: " + $scope.user.username);
   window.localStorage.setItem("username", $scope.user.username);
  }

 if (window.localStorage.getItem("userType") == 1 &&
     $scope.input.user == "" && $scope.input.pw == "") {
    // Use for testing the development environment
    $scope.user = {
      username: 'Patient3@midata.coop',
      password: 'Patient123456!',
      server: 'https://test.midata.coop:9000',
      role: 'member'
    }
    $scope.input.user = $scope.user.username;
    $scope.input.pw = $scope.user.password;

  } else if (window.localStorage.getItem("userType") == 2 &&
             $scope.input.user == "" && $scope.input.pw == "") {
    $scope.user = {
      username: 'donald.mallard@midata.coop',
      password: 'Hp123456!',
      server: 'https://test.midata.coop:9000',
      role: 'provider'
    }
    $scope.input.user = $scope.user.username;
    $scope.input.pw = $scope.user.password;
  }

  // Connect with MIDATA
  $scope.loggedIn = ownMidataService.loggedIn();
  //$scope.hideLogin = "hideLogin";
  var timer = $timeout(function refresh() {
    if (ownMidataService.loggedIn()) {
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

      $scope.goToThread = function(pat) {
        window.localStorage.setItem("selectedPat", JSON.stringify(pat));
        $state.go('communicationThread');
      };

      //$scope.remove = function(chat) { Chats.remove(chat); };
      $scope.logout = function() {
          //window.localStorage.clear();
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('userType');
          window.localStorage.removeItem('selectedPat');
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Contacts, ownMidataService, $state, $ionicScrollDelegate, $cordovaLocalNotification) {
   var isLoggedIn = ownMidataService.loggedIn();
   if (isLoggedIn) {

     $scope.selectedPat = "";
     //If Pat then selected pat = logged in pat
     //Else Pat is the selected pat from the list
     if (window.localStorage.getItem("userType") == 1) {
       $scope.selectedPat = Contacts.selectPat(window.localStorage.getItem("username"));
       $scope.myId = $scope.selectedPat.id;
       $scope.hideBackButton = true;
       $scope.viewTitle = "Meine Kommunikation";
     } else {
       $scope.selectedPat = JSON.parse(window.localStorage.getItem("selectedPat"));
       $scope.hp = Contacts.selectHp(window.localStorage.getItem("username"));
       //window.localStorage.removeItem("selectedPat");
       $scope.myId = $scope.hp.id;
       $scope.hideBackButton = false;
       $scope.viewTitle = "Kommunikation mit";
     }

     $scope.hideTime = true;

     console.log("Id from selectedPat: " + $scope.selectedPat.id);
     console.log("Id from myId: " + $scope.myId);

      var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

      $scope.receiveMessage = function() {
          var res = "Communication";
          //var sub = $scope.selectedPat.id; //"Patient/" +
          var params = {
            //"subject": sub
            //"recipient" : [{"reference": sub }]
            //"patient": sub
          };
          ownMidataService.search(res, params).then(function(comms) {
            comms = comms.reverse();
            //console.log(comms);
            $scope.messages = [];

            for (var i = 0; i < comms.length; i++) {
              var d = new Date(comms[i].sent)
              var day = d.getUTCDate();
              var month = d.getUTCMonth() + 1;
              var years = d.getUTCFullYear();
              var hours = d.getUTCHours();
              var minutes = d.getUTCMinutes();

              if (day.toString().length == 1) {
                day = "0" + day;
              }
              if (month.toString().length == 1) {
                month = "0" + month;
              }
              if (hours.toString().length == 1) {
                hours = "0" + hours;
              }
              if (minutes.toString().length == 1) {
                minutes = "0" + minutes;
              }

              var t = "";
              if (comms[i].payload == null) {
                t = "No content aviable";
              } else {
                t = comms[i].payload[0].contentString
              }

              //Sender ID
              var sId = comms[i].sender.reference;
              sId = sId.replace("Patient/", "");
              sId = sId.replace("Practitioner/", "");

              //console.log("sender ID: " + sId);

              //if own messages to left site ==> other
              var style = '';
              var s = "";

              if ($scope.myId === sId) {
                style = 'other';
                s = '';
              } else {
                style = '';
                s = comms[i].sender.display;
              }

              //Rec ID
              var rId = comms[i].recipient[0].reference;
              rId = rId.replace("Patient/", "");
              //console.log("recipient id: " + rId);
              if (window.localStorage.getItem("userType") != 1) {
                if (rId !== $scope.selectedPat.id) {
                  continue;
                }
              }
              $scope.$apply(function() {
                $scope.messages.push({
                    userId: sId,
                    sender: s,
                    text: t,
                    time: day + "." + month + "." + years + " " + hours + ":" + minutes,
                    style: style
                  });
                });
            }
            $scope.refreshItems();
          });
      }

      $scope.sendMessage = function() {
        var d = new Date();

        var category = "FreeText";

        var sender = "";
        if (window.localStorage.getItem("userType") == 1) {
          sender = "Patient/" + $scope.myId;
        } else {
          sender = "Practitioner/" + $scope.myId;
        }

        var medium = {
          type: "App",
          name: "MIWADO"
        };

        var subject = "Patient/" + $scope.selectedPat.id;

        var communicationResource = {
          "resourceType" : "Communication",
          "category" : { category },
          "sender" : { sender },
          "status" : "in-progress",
          "recipient" : [{"reference":"Patient/" + $scope.selectedPat.id, "display": $scope.selectedPat.name}],
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
            //console.log('Resource Created: ' + e);
            var oldMsgs = window.localStorage.getItem("msgAmount");
            window.localStorage.setItem("msgAmount", oldMsgs + 1);
            $scope.doRefresh();
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
         //window.localStorage.clear();
         window.localStorage.removeItem('username');
         window.localStorage.removeItem('userType');
         window.localStorage.removeItem('selectedPat');
         ownMidataService.logout();
         $state.go('login');
     };

     $scope.doRefresh = function() {
       $scope.receiveMessage();
       //$scope.$broadcast('scroll.refreshComplete');
       $ionicScrollDelegate.scrollBottom(true);
     };

     $scope.goToBottom = function() {
       //$scope.$broadcast('scroll.refreshComplete');
       $ionicScrollDelegate.scrollBottom();
     };

  } else {
   $state.go('login')
  }
});
