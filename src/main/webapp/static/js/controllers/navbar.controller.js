(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('NavBarController', NavBarController);

  NavBarController.$inject = ['$scope','authService','httpService'];

  function NavBarController($scope,authService) {

    var vm = this;
    vm.authService = authService;
    
    vm.prayertimes=[];
    vm.date=new Date().toDateString();
    
    $scope.getprayertimes = function() {
    	prayTimes.setMethod('ISNA');
    	vm.prayertimes=prayTimes.getTimes(new Date(), [40.48, 74.45], -5, 'auto','12h');
    	//console.log(vm.prayertimes);
	}
    
    $scope.getprayertimes();
  }
}());
