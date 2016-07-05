// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tareas', {
      url: '/tasks',
      templateUrl: 'lib/views/tasks.html',
      controller: 'AppCtrl'
    })

    .state('main', {
      url: '/',
      templateUrl: 'lib/views/main.html',
      controller: 'AppCtrl'
    })

    .state('tareas.new', {
      url: '/new',
      templateUrl: 'lib/views/newTarea.html',
      controller: 'AppCtrl'
    })

  $urlRouterProvider.otherwise('/tasks');
})

.controller('AppCtrl', ['$scope', '$state', function($scope, $state) {

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $scope.hideNew = true;

  $scope.tasks = [
    {
      title: 'Tarea 1',
      description: 'Description to tarea 1'
    },
    {
      title: 'Tarea 2',
      description: 'Description to tarea 2'
    }
  ];

  $scope.hideAdd = function() {
    if($scope.hideNew) {
      $scope.hideNew = false;
    }else{
      $scope.hideNew = true;
    }
  }

  $scope.addTask = function() {
    $state.go('tareas');
  }

}])
