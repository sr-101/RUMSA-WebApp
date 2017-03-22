(function () {

  'use strict';

  angular
    .module('myApp')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock','$state'];

  function run($rootScope, authService, lock, $state,$browser) {
	  
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    lock.interceptHash();
    
    /*$rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf("auth-") === 0) {
          if (!isAuthenticated) {
            evt.preventDefault();
            $state.go('base.home');
          }
        }
    });*/
  }
  
})();
