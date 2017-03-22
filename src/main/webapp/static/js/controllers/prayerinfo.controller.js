(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('PrayerInfoController', PrayerInfoController);

  PrayerInfoController.$inject = ['authService'];

  function PrayerInfoController(authService) {

    var vm = this;
    vm.authService = authService;
   
    vm.prayerlocs=[
    	{campus:'Busch',locs:['TBA','']},
    	{campus:'Livingston',locs:['TBA','']},
    	{campus:'College Ave',locs:['TBA','']},
    	{campus:'Cook/Douglass',locs:['TBA','']}];
    
  }

}());
