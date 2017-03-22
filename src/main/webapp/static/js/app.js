(function(angular) {
  angular.module("myApp", ['auth0.lock', 'angular-jwt', 'ui.router','ui.bootstrap','ngResource']).config(config);
  
  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider',"$locationProvider"];

  function config($stateProvider, lockProvider, $urlRouterProvider,$locationProvider) {

   $locationProvider.html5Mode(true);

    $stateProvider
    .state('base', {
    	abstract: true,
    	views: {
            'header': {
                templateUrl: 'templates/partials/header.html',
            },
            'content':{
            	template: '<div autoscroll=true ui-view></div>'
            },
            'footer': {
                templateUrl: 'templates/partials/footer.html'
            }
        },
      })
      .state('base.home', {
        url: '/',
        templateUrl: 'templates/partials/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('base.prayerinfo', {
        url: '/prayerinfo',
        controller: 'PrayerInfoController',
        templateUrl: 'templates/partials/prayerinfo.html',
        controllerAs: 'vm'
      })
      .state('base.faq', {
        url: '/faq',
        controller: 'FAQController',
        templateUrl: 'templates/partials/faq.html',
        controllerAs: 'vm'
      })
      .state('base.events', {
        url: '/events',
        controller: 'EventsController',
        templateUrl: 'templates/partials/events.html',
        controllerAs: 'vm'
      })
      .state('base.initiatives', {
        url: '/initiatives',
        controller: 'InitiativesController',
        templateUrl: 'templates/partials/initiatives.html',
        controllerAs: 'vm'
      })
      .state('base.eboard', {
        url: '/eboard',
        controller: 'EBoardController',
        templateUrl: 'templates/partials/eboard.html',
        controllerAs: 'vm'
      })
      .state('base.auth-eboard', {
        url: '/eboardedit',
        controller: 'EBoardEditController',
        templateUrl: 'templates/partials/eboardedit.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
          languageDictionary: {
            title: "MSA Webmaster Login"
          },
          theme: {
        	  primaryColor: "#660000"
          },
          auth: { 
        	    redirect: false, 
        	    sso: false
        	}
        }
    });

    /*$urlRouterProvider.otherwise('/');*/
  };
  
}(angular));