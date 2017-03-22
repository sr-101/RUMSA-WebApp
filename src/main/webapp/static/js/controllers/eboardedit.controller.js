(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('EBoardEditController', EBoardEditController);

  EBoardEditController.$inject = ['$scope','authService','httpService'];

  function EBoardEditController($scope,authService,httpService) {

    var vm = this;
    vm.authService = authService;
    
    vm.bio="";
    vm.name="";
    vm.position="";
    vm.img="";
    vm.email="";
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
    
    $scope.addupdate = function(m) {
		var details = {
			getUrl : "rest/eboard",
			getFormData: {
				"bio":m.bio,
				"name":m.name,
				"position":m.position,
				"img":m.img,
				"email":m.email
			}
		};
		if(m.id!="") details.getFormData.id=m.id;
    	httpService.getDataByForm(details).then(ausuccess,auerror);
	}
    
    var ausuccess=function(){
    	$scope.getAll();
    	showalert("Add or Update Succeeded","success");
    }
    
    var auerror=function(reason){
    	showalert("Add or Update Failed: "+reason.status+" "+reason.data,"error");
    }
    
    vm.newmember=function(){
    	vm.eboard.push({});
    }
    
    vm.deletemember = function(id) {
    	var r = confirm("Are you sure you want to delete this item?");
    	if (r == true && id!=null) {
    		var details = {
    				getUrl : "rest/eboard/deleteid/"+id,
    			};
    	    httpService.getData(details).then(delsuccess,delerror);
    	} else if(id==null) {
    		vm.eboard.pop();
    	}
    	else{
    	    x = "You pressed Cancel!";
    	} 
	}
    
    var delsuccess=function(){
    	$scope.getAll();
    	showalert("Delete Succeeded","success");
    }
    
    var delerror=function(reason){
    	showalert("Delete Failed: "+reason.status+" "+reason.data,"error");
    }
    
    function showalert(message,alerttype) {

        $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')

        setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
          $("#alertdiv").remove();
        }, 5000);
      }
  }

}());
