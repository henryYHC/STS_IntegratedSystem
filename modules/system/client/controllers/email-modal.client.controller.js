'use strict';

angular.module('system').controller('EmailModalController', ['$scope', '$uibModalInstance', 'data', '$timeout',
  function ($scope, $uibModalInstance, data, $timeout) {
    $scope.data = data; $scope.input = {};

    $scope.okay = function(){
      $uibModalInstance.close(true);
    };

    $scope.cancel = function(){
      $uibModalInstance.close();
    };

    $scope.submit = function(){
      $scope.error = undefined;

      if(!data.name && !$scope.input.name){
        $scope.error = 'Missing customer name.'; return false;
      }
      if(!data.email && !$scope.input.email){
        $scope.error = 'Missing email address.'; return false;
      }
      if(!$scope.input.subject){
        $scope.error = 'Missing email subject.'; return false;
      }
      if(!$scope.input.body){
        $scope.error = 'Missing email body.'; return false;
      }

      if(!$scope.error) $uibModalInstance.close($scope.input);
    };
  }
]);
