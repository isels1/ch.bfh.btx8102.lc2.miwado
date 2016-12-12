MIDATA.js
=========

Usage
-----

### bower

Install the library

    $ bower install git@github.com:i4mi/midata.js.git

Include it in your index.html:

    <!-- Include the library from your bower components directory, i.e. 'lib' or -->
    <!-- 'bower_components' or whatver your .bowerrc file specifies. -->
    <script src="lib/midata.js/dist/midata.js"></script>

Then in your application code do:


    var md = new midata.Midata(
        'https://test.midata.ch:9000', 'my_app_name', 'my_app_secret');

    // Login
    md.login('user@example.com', 'my_password')
    .then(function() {
        console.log('Logged in!');
    });

    // Create a FHIR resource with a simplified constructor
    var weight = new midata.BodyWeight(72, new Date());

    md.save(weight)
    .then(function() {
        console.log('Resource created!');
    });

    // Or, alternatively, create a FHIR resource with a JS object
    var weight = {
        resourceType: 'Observation',
        code: {
            coding: [{
                system: 'http://loinc.org',
                code: '3141-9',
                display: 'Weight Measured'
            }]
        },
        effectiveDateTime: '2016-01-01',
        valueQuantity: {
            value: 72,
            unit: 'kg',
            system: 'http://unitsofmeasure.org'
        }
    };

    md.save(weight)
    .then(function() {
        console.log('Resource created!');
    })
    .catch(function(error) {
        console.log('There was an error!', error)
    });



Development
-----------

### Initial setup

    $ npm install

### Build

With autocompile:

    $ npm run dev

Autorun tests:

    $ npm run test

Build for production

    $ npm run build



