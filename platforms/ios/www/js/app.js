// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi','jsonFormatter'])

.constant('APPNAME', 'HelloI4MI')
.constant('APPSECRET', '8385bee7542099b10315dcb7b803b61a')


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
        .state('tab', {
               url: '/tab',
               abstract: true,
               templateUrl: 'templates/tabs.html'
               })
        
        .state('tab.login', {
               url: '/login',
               views: {
               'tab-login': {
               templateUrl: 'templates/tab-login.html',
               controller: 'LoginCtrl'
               }
               }
               })
        
        .state('tab.chats', {
               url: '/chats',
               views: {
               'tab-chats': {
               templateUrl: 'templates/tab-chats.html',
               controller: 'ChatsCtrl'
               }
               }
               })
        
        .state('tab.chat-detail', {
               url: '/chats/:chatId',
               views: {
               'tab-chats': {
               templateUrl: 'templates/chat-detail.html',
               controller: 'ChatDetailCtrl'
               }
               }
               });
                
        $urlRouterProvider.otherwise("tab/login");
                
        })

.directive('hideTabs', function($rootScope) {
           return {
           restrict: 'A',
           link: function($scope, $el) {
           $rootScope.hideTabs = 'tabs-item-hide';
           $scope.$on('$destroy', function() {
                      $rootScope.hideTabs = '';
                      });
           }
           };
           })
;

  // setup an abstract state for the tabs directive
/*    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.login' , {
         url: '/login',
         views: {
         'tab-login': {
         templateUrl: 'templates/tab-login.html',
         controller: 'LoginCtrl'
         }
         }
   })
        
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}); */
