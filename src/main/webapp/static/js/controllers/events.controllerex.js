(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('EventsController', EventsController)
    

  EventsController.$inject = ['authService','$scope','httpService','$templateRequest', '$sce', '$compile','$timeout'];

  function EventsController(authService,$scope,httpService,$templateRequest, $sce, $compile,$timeout) {

    var vm = this;
    vm.authService = authService;
    
    Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
    if(!Date.now) Date.now = function() { return new Date(); }
    Date.time = function() { return Date.now().getUnixTime(); }
    
    function getMonday(d) {
    	  d = new Date(d);
    	  d.setHours(0,0,0,0);
    	  var day = d.getDay(),
    	      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    	  return new Date(d.setDate(diff)).getUnixTime()/*+604800*/;
    	}

    	var mon=getMonday(new Date());
    	var end=mon+604800;
    	var at='FB ACCESS TOKEN';
    	$scope.getfbevents = function() {
    		var details = {
				getUrl : "https://graph.facebook.com/v2.8/"+"153611571334779/events?until="+end+"&since="+mon+"&access_token="+at
			};
	    	httpService.getData(details).then(success,error);
    	}
    	
    	var details2 = {
				getUrl : ""
		};
    	
    	var cv={};
    	
    	vm.events=[];
    	
    	var success=function (data) {
    		vm.index=0;
  	      if (data && !data.error) {
  	    	  /*//console.log(data);*/
	    	  vm.events=data.data.reverse();
	    	  //console.log(vm.events);
	    	  vm.events.forEach(function(e){
	    		  /*//console.log(e);*/
	    		  details2.getUrl="https://graph.facebook.com/v2.8/"+e.id+"?fields=cover&access_token="+at;
	    		  httpService.getData(details2).then(function(data){
	    	    		if (data && !data.error) {
	    	    	    	  /*//console.log("Cover:");
	    	    	    	  //console.log(data);*/
	    	    	    	  e.index=vm.index;
	    	    	    	  vm.index++;
	    	    	    	  e.cover=data.cover.source;
	    	    	    	  e.start_time=new Date(e.start_time).getTime();
	    	    	    	  e.end_time=new Date(e.end_time).getTime();
	    	    	    	  emailtemp();
	    	    	    	  $scope.eventsc=vm.events;
	    	    	      }
	    	    	},error);
	    		  
	    		  });
	    	  
	    	  }
    	};
    	
    	var error=function(reason) {
			alert("FB Request Did Not Work");
		};
		
	 $scope.getfbevents();
	 
	 var emailtemp=function(){
		 $templateRequest("templates/partials/emailtemplate.html").then(function(html) {
		        // template is the HTML template as a string
			 	var template=angular.element(html);
		        // Let's put it into an HTML element and parse any directives and expressions
		        // in the code. (Note: This is just an example, modifying the DOM from within
		        // a controller is considered bad style.)
		        $compile(template)($scope);
		        
		        $timeout(function() {
		        	//console.log(template);
		            //console.log(template.html());
		          });
		    }, function() {
		        // An error has occurred
		    }); 
	 }
	 
	 
	  	 
  }

}());
