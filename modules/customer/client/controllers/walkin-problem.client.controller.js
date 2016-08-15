'use strict';

angular.module('customer').controller('CustomerWalkinProblemController', ['$scope', '$state',
  function ($scope, $state) {
    $scope.status.state = 'problem';
    
    if(!$scope.walkin.user)
      $state.go('customer.walkin.netid');

    $scope.toReview = function() {
      if($scope.walkin.description) {
        $state.go('customer.walkin.review');
      }
      else $scope.status.error = 'Please enter your problem description correctly';
    };
  }
]);
