angular.module('starter.ownServices', [])

/*----------------------------------------------------------------------------*/
/* MidataService for the use of x3a (^.^)
/* isels1
/* The comments should show "how to use it"
/*----------------------------------------------------------------------------*/
// Use this service like all others:
// --> Add reference to your index.html (<script src="js/midataServices.js"></script>)
// --> Add module to the app.js service list ('starter.ownServices')
// --> Add service to the controller params (ownMidataService)
// --> Now it should work
.service('ownMidataService', [function() {
  // Set your own appname and appscr. Not in the app.js anymore
  var appname = 'MIWADO';
  var appsecr = 'g82xlcisy4zneu5n9k3dgxgcifr6vfmx';

  var authToken = '';
  var refreshToken = '';

  // Creating the object to handle midata-requests
  var md = new midata.Midata(
    'https://test.midata.coop:9000', appname, appsecr);

  // Login function (call it with ownMidataService.login(un, pw, role))
  // Sets the authToken and refreshToken (not really used anywhere)
  // -->  un:   Unsername
  // -->  pw:   Passwort
  // -->  role: User-role
  //            The user Role can be 'member', 'provider', 'developer' or 'research'
  function login(un, pw, role) {
    md.login(un,
             pw,
             role)
      .then(function() {
        console.log('Logged in!');
        authToken = md.authToken;
        refreshToken = md.refreshToken;
      });
  }

  // Check if logged in (call it with ownMidataService.loggedIn())
  // returns true if logged in and false if not
  function loggedIn() {
    return md.loggedIn;
  }

  // Logout function (call it with ownMidataService.logout())
  function logout() {
    md.logout();
    console.log(md.authToken);
  }

  // Search function (call it with ownMidataService.search(Resource, {}))
  // Searches for a resrouce with a defined type
  // If the params are defined, it will look up for the resource with the given params
  // --> resourceTyoe:  Can be any 'fhir' resource as a string. Example: "Patient" or "Person"
  // --> params:        A JSON object with the given params. Can also be empty "{}"
  //                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  // IMPORTANT:         This is an asynchronus call. You have to use the '.then(function (response) {})' notation.
  // EXAMPLE:
  //                    ownMidataService.search("Person", {}).then(function(personList) {
  //                      console.log(personList);
  //                    });
  function search(resourceType, params) {
    return md.search(resourceType, params);
  }

  // TO BE CONTINUED... (/-.-)/ |__|

  return {
    login: login,
    loggedIn: loggedIn,
    logout: logout,
    search: search
  }
}]);
