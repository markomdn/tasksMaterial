// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router', 'ngStorage'])

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

  $urlRouterProvider.otherwise('/tasks');
})

.controller('AppCtrl', [
  '$scope' ,'$state' ,'StorageFactory','$localStorage',
  function($scope, $state, StorageFactory, $localStorage) {

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $scope.hideNew = true;
  $localStorage.tasks = StorageFactory.getItems() || [];
  $scope.tasks = $localStorage.tasks;
  $scope.nombre = $localStorage.nombre;

  $scope.hideAdd = function() {
    if($scope.hideNew) {
      $scope.hideNew = false;
    }else{
      $scope.hideNew = true;
    }
  }

  $scope.addTask = function(title, desc) {
    var task = {
      title: title,
      description: desc,
      state: false
    }
    $scope.tasks = StorageFactory.setItem(task);   
    $scope.hideNew = true;
    
  }

  $scope.checkItem = function(title){
    for (var i = 0; i < $scope.tasks.length; i++) {
      if($scope.tasks[i].title == title) {
        if ($scope.tasks[i].state) {
          $scope.tasks[i].state = false; 
        }else{
          $scope.tasks[i].completed = true;           
        }
      }
    };
    $localStorage.tasks = $scope.tasks;
  }

  $scope.delete = function(title) {
    StorageFactory.deleteItem(title);
  }

}])

.factory ('StorageFactory', function($localStorage){
    return {
      setItem: function(task) {
        tasks = $localStorage.tasks;
        tasks.push(task);
        $localStorage.tasks = tasks;
        return tasks;
      },
      getItems: function() {
          return $localStorage.tasks;
      },
      getItem: function(title, tasks) {
        for (var num = 0; num < tasks.length; num++) {
          if(tasks[num].title == title){
            return tasks[num];
          }
        }
      },
      deleteItem: function(title) {
        var tasks = $localStorage.tasks;
        for (var num = 0; num < tasks.length; num++) {
          if(tasks[num].title == title){
            tasks.splice(num,1);
            console.log(tasks);
            break;
          }
          return tasks;
        }

        return tasks
      }
    }
})
