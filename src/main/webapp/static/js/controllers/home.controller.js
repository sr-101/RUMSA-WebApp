(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService','$scope','httpService'];

  function HomeController(authService,$scope,httpService) {
	  
    var vm = this;
    vm.authService = authService;
    
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
    	  
    
    $scope.myInterval = 5000;
	  $scope.noWrapSlides = false;
	  $scope.active = 0;
	  var slides = $scope.slides = [];
	  var currIndex = 0;

	  $scope.addSlide = function() {
	    var newWidth = 600 + slides.length + 1;
	    slides.push({
	      image1: 'http://lorempixel.com/' + newWidth + '/300',
	      image2: 'http://lorempixel.com/' + newWidth + '/300',
	      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
	      id: currIndex++
	    });
	  };

	  $scope.randomize = function() {
	    var indexes = generateIndexesArray();
	    assignNewIndexesToSlides(indexes);
	  };

	  for (var i = 0; i < 4; i++) {
	    $scope.addSlide();
	  }

  }

}());
