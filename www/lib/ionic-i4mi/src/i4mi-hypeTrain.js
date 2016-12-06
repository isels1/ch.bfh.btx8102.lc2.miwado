//I4MI --> DON'T BELEIVE THE HYPE!
angular.module("i4mi.defaults", []).constant("I4MIFormats", {
    date: {
      iso: "iso",
      object: "$"
    }
  }).constant("I4MISystems", {
    measure: "http://unitsofmeasure.org"
  }).constant("I4MIUnits", {
    weight: {
      name: "kg",
      system: "{$ref:I4MISystems.measure}"
    }
  }).constant("I4MISchemes", {
    weight: {
      midata: {
        name: "Weight",
        format: "fhir/Observation",
        subformat: "Quantity",
        content: "http://loinc.org 3141-9",
        data: "$ref:I4MISchemes.weight.fhir"
      },
      fhir: {
        resourceType: "Observation",
        status: "preliminary",
        effectiveDateTime: null,
        category: {
          coding: [{
            system: "http://hl7.org/fhir/ValueSet/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }]
        },
        code: {
          coding: [{
            system: "http://loinc.org",
            code: "3141-9",
            display: "Body weight Measured"
          }]
        },
        valueQuantity: {
          unit: "{$ref:I4MIUnits.weight.name}",
          system: "{$ref:I4MIUnits.weight.system}",
          code: "{$ref:I4MIUnits.weight.name}",
          value: null
        }
      },
      healthkit: {
        startDate: null,
        endDate: null,
        sampleType: "HKQuantityTypeIdentifierBodyMass",
        unit: "{$ref:I4MIUnits.weight.name}",
        amount: null
      }
    }
  }).constant("I4MIMapping", {
    weight: {
      midata: {
        value: ["data.{$ref:I4MIMapping.weight.fhir.value}"],
        date: ["data.{$ref:I4MIMapping.weight.fhir.date}|{$ref:I4MIFormats.date.iso}"],
        typeKey: "content"
      },
      fhir: {
        value: ["valueQuantity.value"],
        date: ["effectiveDateTime"],
        typeKey: "code.coding"
      },
      healthkit: {
        value: ["amount", "value"],
        date: ["startDate|{$ref:I4MIFormats.date.object}", "endDate|{$ref:I4MIFormats.date.object}"],
        typeKey: "sampleType"
      }
    }
  }),



  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.ccda.import.html", '<div ng-if="viewClass === \'modal\'" class={{viewClass}}><ion-header-bar class="bar-light item-icon-left"><i class="icon ion-android-close" ng-click=closeModal()></i><h1 class=title>CCDA Import</h1></ion-header-bar><ion-content padding=true overflow-scroll=false class=has-header><div ng-show=info.text class="item item-{{info.type}} i4mi-info">{{info.text}}</div><label class="item item-input"><input ng-bind=url type=text placeholder="http://"></label> <button type=submit class="button button-full button-positive" ng-click=import(url)>Import</button></ion-content></div><div ng-show=!record ng-if="viewClass !== \'modal\'" class={{viewClass}}><div ng-show=info.text class="item item-{{info.type}} i4mi-info">{{info.text}}</div><label class="item item-input"><input ng-model=url type=text placeholder="http://"></label> <button type=submit class="button button-full button-positive" ng-click=import(url)>Import</button></div><div ng-show=record ng-if="viewClass !== \'modal\'" class={{viewClass}}><button ng-show=actionText type=submit class="button button-full button-positive" ng-click=continue(record)>{{actionText}}</button><div ng-if=!display><span>{{record.type}}:</span> <span class="badge badge-positive" ng-repeat="(key,value) in record.data">{{key}}</span></div><ion-list ng-if="display === \'list\'"><ion-item>Record Type: {{record.type}}</ion-item><ion-item class=item-divider>Imported Data</ion-item><ion-item>{{key}}</ion-item></ion-list><ion-list ng-if="display === \'extended\'"><ion-item class=item-divider>record type</ion-item><ion-item>{{record.type}}</ion-item><div ng-repeat="(key,value) in record.data"><ion-item class=item-divider>{{key}}</ion-item><ion-item class=item-text-wrap ng-repeat="(k,v) in value"><h2>{{k}}</h2><json-formatter open=1 json=v></json-formatter></ion-item></div></ion-list></div>')
    }])
  }(),



  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.healthkit.basic.html", '<div class=list><div ng-show=title class="item item-divider">{{title}}</div><label class="item item-input"><span class=input-label>Date of Birth:</span> <input type=text value="{{ data.dateofbirth | date:\'dd MMMM yyyy\' }}" disabled></label> <label class="item item-input"><span class=input-label>Gender:</span> <input type=text value="{{ data.gender }}" disabled></label> <label class="item item-input"><span class=input-label>Blood Type:</span> <input type=text value="{{ data.bloodtype }}" disabled></label> <label class="item item-input"><span class=input-label>Weight [{{ data.weight.unit }}]:</span> <input type=number ng-change=change(data) ng-blur=blur(data) ng-model=data.weight.value value="{{ data.weight.value }}"></label> <label class="item item-input"><span class=input-label>Height [{{ data.height.unit }}]:</span> <input type=number ng-change=change(data) ng-blur=blur(data) ng-model=data.height.value value="{{ data.height.value }}"></label> <button ng-show="autosave!==\'true\'" ng-disabled=saved ng-click=save(data) class="button button-positive button-full">Save</button></div>')
    }])
  }(),



  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.midata.capture.html", '<video controls><source src=movie.mp4 type=video/mp4></video><button type=submit class="button button-block button-positive" ng-click=add(model)>Add Entry</button>')
    }])
  }(),
  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.midata.chart.html", "<nvd3 options=options data=data></nvd3>")
    }])
  }(),
  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.midata.entry.html", '<div ng-if="viewClass === \'modal\'" class={{viewClass}}><ion-header-bar class="bar-light item-icon-left"><i class="icon ion-android-close" ng-click=closeModal()></i><h1 class=title>MIDATA New Entry</h1></ion-header-bar><ion-content overflow-scroll=true class=has-header><div ng-show=info.text class="item item-{{info.type}} i4mi-info">{{info.text}}</div><formly-form model=model fields=schema><div ng-if="native+\'\' === \'true\'" class="item item-input"><input type=datetime ng-model=datetime></div><div ng-if="native+\'\' !== \'true\'" class="button-bar i4mi-datetime"><button class="button button-light" ng-click=openDatePicker()>{{ datetime | date:\'dd. MMMM yyyy\' }}</button> <button ionic-timepicker input-obj=tpo class="button button-light">{{ datetime | date:\'HH:mm\' }}</button></div><button type=submit class="button button-full button-positive" ng-click=add(model)>Add Entry</button></formly-form></ion-content></div><div ng-if="viewClass === \'widget\'" class={{viewClass}}><div ng-show=info.text class="item item-{{info.type}} i4mi-info">{{info.text}}</div><formly-form model=model fields=schema><div ng-if="native+\'\' === \'true\'" class="item item-input"><input type=datetime ng-model=datetime></div><div ng-if="native+\'\' !== \'true\'" class="button-bar item item-input i4mi-datetime"><button class="button button-light" ng-click=openDatePicker()>{{ datetime | date:\'dd. MMMM yyyy\' }}</button> <button ionic-timepicker input-obj=tpo class="button button-light">{{ datetime | date:\'HH:mm\' }}</button></div><button type=submit class="button button-block button-positive" ng-click=add(model)>Add Entry</button></formly-form></div>')
    }])
  }(),
  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.midata.list.html", '<ion-list can-swipe="canSwipe !== \'false\'"><ion-item ng-if="record.data.status !== \'entered-in-error\'" ng-repeat="record in records"><div ng-if="!templateUrl || templateUrl === \'\'"><div ng-if=!record.data.valueQuantity><h3><span class=i4mi-name>{{ record.name }}</span></h3><h2><div ng-repeat="(key,value) in record.data track by $index"><div ng-show=shouldShow(key)><span ng-show="showKey !== \'false\'" class=i4mi-key>{{ key }}:</span> <span class=i4mi-value>{{ value }}</span></div></div></h2><h4><span class=i4mi-description>{{ record.description }}</span></h4><h4><span class=i4mi-datetime>{{ record.data.effectiveDateTime | date:\'dd. MMMM yyyy\' }}</span></h4></div><div ng-if=record.data.valueQuantity><h3><span class=i4mi-name>{{ record.name }}</span></h3><h2><span class=i4mi-value>{{ record.data.valueQuantity.value }}</span> <span class=i4mi-unit>{{ record.data.valueQuantity.unit }}</span></h2><h4><span class=i4mi-description>{{ record.description }}</span></h4><h4 ng-repeat="system in record.data.code.coding"><span class=i4mi-system>{{ system.system }}</span> <span class=i4mi-code>{{ system.code }}</span> <span class=i4mi-display>{{ system.display }}</span></h4><h4><span class=i4mi-datetime>{{ record.data.effectiveDateTime | date:\'dd. MMMM yyyy\' }}</span></h4></div></div><div ng-if="templateUrl !== \'\'"><div class=dynamic-field ng-include=templateUrl></div></div><ion-option-button class=button-assertive ng-click=remove(record)>Remove</ion-option-button></ion-item></ion-list>')
    }])
  }(),


  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.midata.login.html", '<div ng-if="viewClass === \'modal\'" class={{viewClass}}><ion-header-bar class="bar-light item-icon-left"><i class="icon ion-android-close" ng-click=closeModal()></i><h1 class=title>MIDATA Login</h1></ion-header-bar><ion-content padding=true overflow-scroll=false class=has-header><div ng-show=info.text class="item item-{{info.type}} i4mi-info">{{info.text}}</div><formly-form model=user fields=userFields><button type=submit class="button button-full button-positive" ng-click=login(user)>Login</button></formly-form></ion-content></div><div ng-show=!loggedIn ng-if="viewClass === \'widget\'" class={{viewClass}}><div ng-show=info.text class="item item-{{info.type}} i4mi-info">{{info.text}}</div><formly-form model=user fields=userFields><button type=submit class="button button-full button-positive" ng-click=login(user)>Login</button></formly-form></div><div ng-show=loggedIn ng-if="viewClass === \'widget\'" class={{viewClass}}><label class=item>{{currentUser}}</label> <button type=submit class="button button-full button-positive" ng-click=logout()>Logout</button></div>')
    }])
  }(),

  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.midata.logout.html", '<div ng-if="viewClass === \'modal\'" class={{viewClass}}><ion-header-bar class=bar-light><h1 class=title>MIDATA</h1></ion-header-bar><ion-content><label>{{currentUser}}</label> <button type=submit class="button button-full button-positive" ng-click=logout()>Logout</button></ion-content></div><div ng-if="viewClass === \'widget\'" class={{viewClass}}><label class=item>{{currentUser}}</label> <button type=submit class="button button-full button-positive" ng-click=logout()>Logout</button></div>')
    }])
  }(),


  function(e) {
    try {
      e = angular.module("i4mi.templates")
    } catch (t) {
      e = angular.module("i4mi.templates", [])
    }
    e.run(["$templateCache", function(e) {
      e.put("i4mi.modal.html", "<div class=modal><div class=dynamic-field ng-include=templateUrl></div></div>")
    }])
  }();
