(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('FModalController', FModalController);

  FModalController.$inject = ['$scope','authService','$uibModalInstance','fileattr','$sce'];

  function FModalController($scope,authService,$uibModalInstance,fileattr,$sce) {

    var vm = this;
    vm.authService = authService;
    
    vm.filename=fileattr[1];
    
    var gfileurl="https://drive.google.com/file/d/"+fileattr[0]+"/preview"
    vm.fileurl=$sce.trustAsResourceUrl(gfileurl);
    ////console.log(vm.fileurl);
    
    vm.close=function(){
    	$uibModalInstance.close();
    }
  }
  
}());