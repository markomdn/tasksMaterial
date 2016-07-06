angular.module('starter', ['ui.router','ngStorage'])
.controller('AppCtrl', [
  '$scope' ,'$state' ,'StorageFactory','$localStorage',
  function($scope, $state, StorageFactory, $localStorage) {

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $scope.hideNew = true;
  $scope.tasks = StorageFactory.getItems() || [];

  $scope.hideAdd = function() {
  $localStorage.nombre = 'marko';
    if($scope.hideNew) {
      $scope.hideNew = false;
    }else{
      $scope.hideNew = true;
    }
  }

  $scope.addTask = function(title, desc) {
    var task = {
      title: title,
      description: desc
    }

    $scope.tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify($scope.tasks));
    $scope.tasks = JSON.parse(localStorage.getItem('tasks'));
      $scope.hideNew = true;
    
  }

}])

.factory ('StorageFactory', function(){
    return {
      setItem: function(tasks) {
        return localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      getItems: function() {
          return JSON.parse(localStorage.getItem('tasks'));
      },
      getItem: function(title, tasks) {
        for (var num = 0; num < tasks.length; num++) {
          if(tasks[num].title == title){
            return tasks[num];
          }
        }
      },
      deleteItem: function(title, tasks) {

        for (var num = 0; num < tasks.length; num++) {
          if(tasks[num].title == title){
            tasks.splice(num);
            console.log(tasks);
            return localStorage.setItem('tasks', JSON.stringify(tasks));
          }
        }

        return tasks
      }
    }
})
