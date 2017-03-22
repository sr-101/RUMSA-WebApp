(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('EBoardController', EBoardController);

  EBoardController.$inject = ['$scope','authService','httpService'];

  function EBoardController($scope,authService,httpService) {

    var vm = this;
    vm.authService = authService;
   
    vm.eboard=[];
    
    $scope.getAll = function() {
		var details = {
			getUrl : "rest/eboard",
		};
    	httpService.getData(details).then(success,error);
	}
    var success=function(data){
    	vm.eboard=data;
    }
    
    var error=function(reason){
    	alert("No EBoard Found");
    }
    
    $scope.getAll();
    
  }

}());
