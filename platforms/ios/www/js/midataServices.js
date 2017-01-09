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
  // --> resourceTyoe:  Can be any 'fhir' resource as a string. Example: "Patient", "Person" or "Observation"
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

  // Get weight funciton (call it with ownMidataService.getWeight(params, callbackFunction))
  // Calls the getObservation function and filters for the weight
  // If the params are defined, it will look up for the resource with the given params
  // --> params:        A JSON object with the given params. Can also be empty "{}"
  //                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  // --> callback:      A callbackfunction which has to be defined by the "caller" of the function to hande the result array
  // IMPORTANT:         This function calls an asynchronus request. Therefore, the callbackfunction is essential!
  // EXAMPLE:
  //                    $scope.callback = function() { //Handle the result (for example draw a chart) }
  //                    ownMidataService.getWeight({}, $scope.callback);
  function getWeight(params, callback) {
    var obsType = 'w';
    return getObservation(obsType, params, callback);
  }

  // Get pulse funciton (call it with ownMidataService.getPulse(params, callbackFunction))
  // Calls the getObservation function and filters for the pulse
  // If the params are defined, it will look up for the resource with the given params
  // --> params:        A JSON object with the given params. Can also be empty "{}"
  //                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  // --> callback:      A callbackfunction which has to be defined by the "caller" of the function to hande the result array
  // IMPORTANT:         This function calls an asynchronus request. Therefore, the callbackfunction is essential!
  // EXAMPLE:
  //                    $scope.callback = function() { //Handle the result (for example draw a chart) }
  //                    ownMidataService.getPulse({}, $scope.callback);
  function getPulse(params, callback) {
    var obsType = 'p';
    return getObservation(obsType, params, callback);
  }

  // Get blood pressure funciton (call it with ownMidataService.getBloodPressure(params, callbackFunction))
  // Calls the getObservation function and filters for the blood pressure
  // If the params are defined, it will look up for the resource with the given params
  // --> params:        A JSON object with the given params. Can also be empty "{}"
  //                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  // --> callback:      A callbackfunction which has to be defined by the "caller" of the function to hande the result array
  // IMPORTANT:         This function calls an asynchronus request. Therefore, the callbackfunction is essential!
  // EXAMPLE:
  //                    $scope.callback = function() { //Handle the result (for example draw a chart) }
  //                    ownMidataService.getBloodPressure({}, $scope.callback);
  function getBloodPressure(params, callback) {
    var obsType = 'bp';
    return getObservation(obsType, params, callback);
  }

  // Get observation funciton (call it with ownMidataService.getObservation(obsType, params, callbackFunction))
  // Calls the search function for the "Observation" fhir resource.
  // If the params are defined, it will look up for the resource with the given params
  // --> obsType:       Can be one of the following values:
  //                    'w' (for weight Observation), 'p' (for pulse Observation), 'bp' (for blood pressure Observation)
  // --> params:        A JSON object with the given params. Can also be empty "{}"
  //                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  // --> callback:      A callbackfunction which has to be defined by the "caller" of the function to hande the result array
  // IMPORTANT:         This function calls an asynchronus request. Therefore, the callbackfunction is essential!
  // EXAMPLE:
  //                    $scope.callback = function() { //Handle the result (for example draw a chart) }
  //                    ownMidataService.getObservation('w', {}, $scope.callback);
  function getObservation(obsType, params, callback) {
    res = "Observation";
    params = {};
    // THX TO ZWAHLEN 4 THIS!
    search(res, params).then(function(observations) {
      result = [];
      //--> only pulses
      if(obsType == "p") {
        for (var i = 0; i < observations.length; i++) {
          if(observations[i]._fhir == null) {
            if(observations[i].code.coding["0"].display == "Herzschlag" ||
                observations[i].code.coding["0"].display == "Herzfrequenz")
            {
              result.push({time: observations[i].effectiveDateTime,
                          value: observations[i].valueQuantity.value});
            }
          }
        }
        console.log(result);
      //--> only weights
      } else if (obsType == "w") {
        for (var i = 0; i < observations.length; i++) {
          if(observations[i]._fhir != null) {
            if(observations[i]._fhir.code.coding["0"].display == "Weight Measured" ||
                observations[i]._fhir.code.coding["0"].display == "Body weight Measured" ||
                observations[i]._fhir.code.coding["0"].display == "Gewicht")
            {
              result.push({time: observations[i]._fhir.effectiveDateTime,
                          value: observations[i]._fhir.valueQuantity.value});
            }
          }
        }
        console.log(result);
      //--> only blood pressures
      } else if (obsType == "bp") {
        for (var i = 0; i < observations.length; i++) {
          if(observations[i]._fhir == null) {
            if(observations[i].code.coding["0"].display == "Blood Pressure") {
              result.push({time: observations[i].effectiveDateTime,
                          valueSys: observations[i].component["0"].valueQuantity.value,
                          valueDia: observations[i].component["1"].valueQuantity.value});
            }
          }
        }
        console.log(result);
      } else {
        //return all obs
      }
      callback(result);
      });
  }

  // Save function (call it with ownMidataService.save(val, type))
  // Saves the given value as the type in midata
  // If no type is given, it will do nothing
  // --> val:           The value to save in midata
  // --> type:          The type of the value to save. Possible types are "weight", "pulse", "bp" (blood pressure) or "comm" (communication)
  // IMPORTANT:         If the type is bp (blood pressure), the "val" variable must be an array. First elemen (val[0]) is the Systolic and
  //                    the second element (val[1]) is the Diastolic blood pressure.
  // EXAMPLE:
  //                    ownMidataService.save(75, 'weight').then(function() {
  //                      console.log(Saved);
  //                    });
  function save(val, type) {
    var dateTime = new Date();
    var data = {};

    // Creates FHIR JSON for weight
    if (type === 'weight') {
      data = {
        resourceType: 'Observation',
        code: {
        coding: [{
            system: 'http://loinc.org',
            code: '3141-9',
            display: 'Weight Measured'
        }]
        },
        effectiveDateTime: dateTime,
        valueQuantity: {
          value: val,
          unit: 'kg',
          system: 'http://unitsofmeasure.org'
        }
      };
    }
    // Creates FHIR JSON for pulse
    else if (type === 'pulse') {
      data = {
      	resourceType: "Observation",
      	status: "preliminary",
      	code: {
      		text: "Herzfrequenz",
      		coding: [
      			{
      				system: "http://loinc.org",
      				display: "Herzfrequenz",
      				code: "8867-4"
      			}
      		]
      	},
      	effectiveDateTime: dateTime,
      	category: {
      		coding: [
      			{
      				system: "http://hl7.org/fhir/observation-category",
      				code: "vital-signs",
      				display: "Vital Signs"
      			}
      		],
      		text: "Vital Signs"
      	},
      	valueQuantity: {
      		unit: "{beats}/min",
      		value: val
      	}
      }
    }
    // Creates FHIR JSON for blood pressure
    // val[0]: Systolic
    // val[1]: Diastolic
    else if (type === 'bp') {
      data = {
      	resourceType: "Observation",
      	status: "preliminary",
      	code: {
      		text: "Blood Pressure",
      		coding: [
      			{
      				system: "http://loinc.org",
      				display: "Blood Pressure",
      				code: "55417-0"
      			}
      		]
      	},
      	effectiveDateTime: dateTime,
      	category: {
      		coding: [
      			{
      				system: "http://hl7.org/fhir/observation-category",
      				code: "vital-signs",
      				display: "Vital Signs"
      			}
      		],
      		text: "Vital Signs"
      	},
      	component: [
      		{
      			code: {
      				text: "Systolic blood pressure",
      				coding: [
      					{
      						system: "http://loinc.org",
      						display: "Systolic blood pressure",
      						code: "8480-6"
      					}
      				]
      			},
      			valueQuantity: {
      				unit: "mm[Hg]",
      				value: val[0]
      			}
      		},
      		{
      			code: {
      				text: "Diastolic blood pressure",
      				coding: [
      					{
      						system: "http://loinc.org",
      						display: "Diastolic blood pressure",
      						code: "8462-4"
      					}
      				]
      			},
      			valueQuantity: {
      				unit: "mm[Hg]",
      				value: val[1]
      			}
      		}
      	]
      }
    }

    return md.save(data);
  }

  function saveComm(commRes){
    return md.save(commRes);
  }

  // TO BE CONTINUED... (/-.-)/ |__|

  return {
    login: login,
    loggedIn: loggedIn,
    logout: logout,
    search: search,
    save: save,
    saveComm: saveComm,
    getWeight: getWeight,
    getPulse: getPulse,
    getBloodPressure: getBloodPressure,
    getObservation: getObservation
  }
}]);
