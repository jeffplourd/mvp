angular.module('starterApp')
  .controller('studyCtrl', function($scope, $mdDialog, $q, $log, $timeout, user, words, toasty) {
    $scope.profile = user;

    $scope.wordList = words.words;
    $scope.showVideo = function(ev, item) {
      words.setCurrentWord(item);
      $mdDialog.show({
        controller: videoCtrl,
        templateUrl: 'views/video.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
      .then(function() {
        $scope.showSimpleToast(words.currentWord.name);
      });
    };

    $scope.showExercise = function(ev, item) {
      $mdDialog.show({
        controller: exerciseCtrl,
        templateUrl: 'views/exercise.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
      .then(function() {
        $scope.showSimpleToast(words.currentWord.name);
      });
    }

    //set up toast function
    $scope.showSimpleToast = toasty;

    // for autocomplete
    $scope.simulateQuery = false;
    $scope.isDisabled    = false;
    // list of `state` value/display objects
    $scope.words        = words.words; //loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;

    function querySearch (query) {
      var results = query ? $scope.words.filter( createFilterFor(query) ) : $scope.words,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(word) {
        return (word.name.indexOf(lowercaseQuery) === 0);
      };
    }
  })
  .controller('addCtrl', function($scope, user, words) {
    $scope.wordList = words.words;
    $scope.currentWord = {};
    $scope.addWord = function(name, definition) {
      words.addWord(name, definition);
      $scope.currentWord = {};
    };
  })
  .controller('signupCtrl', function($scope, user) {
    $scope.addUser = function(email, password) {
      user.addUser(email, password);
    };
    $scope.loginUser = function(email, password) {
      user.loginUser(email, password);
    }
  });

function exerciseCtrl($scope, $mdDialog, words) {
  
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

function videoCtrl($scope, $mdDialog, words) {
  $scope.currentWord = words.currentWord;

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
