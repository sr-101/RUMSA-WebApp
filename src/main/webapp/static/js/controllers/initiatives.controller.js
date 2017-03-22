(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('InitiativesController', InitiativesController);

  InitiativesController.$inject = ['$scope','authService','httpService','$uibModal'];

  function InitiativesController($scope,authService,httpService,$uibModal,gapi) {

    var vm = this;
    vm.authService = authService;
   
    $scope.getAll = function() {
		var details = {
			getUrl : "rest/initiatives",
		};
    	httpService.getData(details).then(success,error);
	}
    var success=function(data){
    	vm.initiatives=data;
    }
    
    var error=function(reason){
    	alert("No Initiatives Found");
    }
    
    $scope.getAll();
    
    vm.open=function(){
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/partials/modal.html',
            controller: 'ModalController as vm'
        });
    }
    
    vm.templist=null;
    
    vm.getStuff=function(){
    	var details = {
    			getUrl : "rest/files",
    		};
        	httpService.getData(details).then(fsuccess,ferror);
    }
   
    vm.getStuff2=function(folderid){
    	vm.templist=vm.files;
    	var details = {
    			getUrl : "rest/files/"+folderid,
    		};
        	httpService.getData(details).then(fsuccess,ferror);
    }
    
    vm.back=function(){
    	vm.files=vm.templist;
    	vm.templist=null;
    }
    
    var fsuccess=function(data){
    	//console.log(data);
    	vm.files=data;
    	vm.files.forEach(function(n){
    		n.name=n.name.split(".")[0];
    	})
    }
    
    var ferror=function(reason){
    	alert("No Files Found");
    }
    
    vm.fopen=function(fileid,filename){
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/partials/fmodal.html',
            controller: 'FModalController as vm',
            resolve: {
                fileattr: function () {
                  return [fileid,filename];
                }
              }
        });
    }
  }

}());
