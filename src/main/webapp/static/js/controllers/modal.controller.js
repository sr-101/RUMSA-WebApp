(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('ModalController', ModalController);

  ModalController.$inject = ['$scope','authService','$uibModalInstance'];

  function ModalController($scope,authService,$uibModalInstance) {

    var vm = this;
    vm.authService = authService;

    vm.close=function(){
    	$uibModalInstance.close();
    }
  }
  
}());