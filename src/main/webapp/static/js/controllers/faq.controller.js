(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('FAQController', FAQController);

  FAQController.$inject = ['authService'];

  function FAQController(authService) {

    var vm = this;
    vm.authService = authService;
   
    vm.faqs=[
    	{q:"Who can come to an MSA event?",a:"ANYONE that wishes to come. RU-MSA welcomes people of all races, religions, and backgrounds. Exclusions may apply to some special events that require a valid Rutgers student ID."},
    	{q:"Where is MSA located?",a:"While the Muslim Students Association does not have their own office, we use Paul Robeson Cultural Center for many of our events."},
    	{q:"When are the events?",a:"There is always an MSA event on Thursday evenings. Additional events or classes may be held during the week by MSA's initiatives."},
    	{q:"How can I get involved in MSA?",a:"RU-MSA is always looking for volunteers for various events, tables, and initiatives! Visit the Get Involved tab to for information/sign up for current volunteer opportunities. You can also come to a Thursday event to receive updates on what's currently taking place and what is to come."},
    	{q:"Where can I pray on campus?",a:"Details of prayer locations are on the Home page (under events)."},
   		{q:"What are some halal food places around here?",a:"All nearby halal food spots are under the 'Halal Spots' tab."},
   		{q:"I'm an RU-MSA alumnus/alumna, how can I help?",a:"Please visit this Alumni page."},
   		{q:"Who can I contact for suggestions?",a:"You can fill out the suggestions form here. If you want to contact someone specific on the E-board, please click here."}];
    
  }

}());
