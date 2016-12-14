// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.ownServices', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi','jsonFormatter'])

.constant('APPNAME', 'MIWADO')
.constant('APPSECRET', 'g82xlcisy4zneu5n9k3dgxgcifr6vfmx')


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

                       if (window.Worker) {
                        //var myWorker = new Worker('worker.js');
                       }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
        .state('chooseType', {
               url: '/',
               templateUrl: 'templates/chooseType.html',
               controller: 'TypeCtrl'
               })
        .state('login', {
               url: '/login',
               templateUrl: 'templates/login.html',
               controller: 'LoginCtrl'
        })
        .state('chats', {
               url:'/chats',
               templateUrl: 'templates/chats.html',
               controller: 'ChatsCtrl'
               })
        .state('chat-detail', {
               url: '/chats/:chatId',
               templateUrl: 'templates/chat-detail.html',
               controller: 'ChatDetailCtrl'
               })
        $urlRouterProvider.otherwise("/");
        });
