angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }, {
     id: 5,
     name: 'Nina Frei',
     lastText: 'Hallo Stefan. Wi geizz dir?',
     face: 'img/nina.jpeg'
     }];

  return {
    retreivePatients: function (service, fields) {
        var x = service.search(fields, {}).then(function(response) {
          console.log(response.data);
        });

    },
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
         };
})

.factory('Contacts', function() {
  var patients = [{
    id: '5835786379c7214eaafa9408',
    name: 'Hans Ulrich',
    email: 'Patient1@midata.coop',
    gender: 'm',
    face: 'img/ben.png'
  }, {
    id: '583578c979c7214eaafa940b',
    name: 'Marie Charlotte',
    email: 'Patent2@midata.coop',
    gender: 'f',
    face: 'img/nina.jpeg'
  }, {
    id: '58357b3279c7214eaafa9410',
    name: 'Karl Lungenfeld',
    email: 'Patient3@midata.coop',
    gender: 'm',
    face: 'img/mike.png'
  }];

  var hp = [{
    id: '5835796879c7214eaafa940f',
    name: 'Donald Mallard',
    email: 'donald.mallard@midata.coop'
  },{
    id: '58357be479c7214eaafa9414',
    name: 'Jimmy Palmer',
    email: 'jimmy.palmer@midata.coop'
  }];

  return {
    allPats: function() {
      return patients;
    },
    allHps: function() {
      return hp;
    },
    selectPat: function(email) {
      var pat = {};
      for (var i = 0; i < patients.length; i++) {
        if (email == patients[i].email) {
          pat = patients[i];
        }
      }
      return pat;
    }
  }

})

.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});
