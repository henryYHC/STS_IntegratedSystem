'use strict';

angular.module('system').controller('DefaultModalController', ['$scope', '$uibModalInstance', 'data',
  function ($scope, $uibModalInstance, data) {
    $scope.data = data;

    $scope.okay = function(){
      $uibModalInstance.close();
    };

    $scope.submit = function(){
      $uibModalInstance.close($scope.input);
    };
  }
]);
