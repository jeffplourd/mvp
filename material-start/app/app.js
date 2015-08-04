angular
  .module('starterApp', ['ngMaterial', 'ui.router', 'firebase'])
  .config(function($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise("/singup");
      // Now set up the states
      $stateProvider
        .state('signup', {
          url: "/signup",
          templateUrl: "views/signup.html",
          controller: "signupCtrl"
        })
        .state('add', {
          url: "/add",
          templateUrl: "views/add.html",
          controller: "addCtrl"
        })
        .state('study', {
          url: "/study",
          templateUrl: "views/study.html",
          controller: "studyCtrl"
        })
        .state('explore', {
          url: "/explore",
          templateUrl: "views/explore.html",
          controller: "exploreCtrl"
        });

      $mdIconProvider
          .defaultIconSet("./assets/svg/avatars.svg", 128)
          .icon("menu"       , "./assets/svg/menu.svg"        , 24)
          .icon("share"      , "./assets/svg/share.svg"       , 24)
          .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
          .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
          .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
          .icon("phone"      , "./assets/svg/phone.svg"       , 512);

          $mdThemingProvider.theme('default')
              .primaryPalette('purple')
              .accentPalette('red');

  });
