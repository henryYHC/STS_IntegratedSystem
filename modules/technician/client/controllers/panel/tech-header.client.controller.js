'use strict';

angular.module('technician').controller('TechHeaderController', ['$scope', '$state', '$http', 'Authentication', 'EmailLauncher',
  function ($scope, $state, $http, Authentication, EmailLauncher) {
    // Expose view variables
    if(Authentication.hasTechnicianPerm()) {
      $scope.$state = $state; $scope.user = Authentication.getUser();
      $scope.user.isAdmin = Authentication.hasAdminPerm();

      $scope.$watch('$state.current', function(toState){
        $scope.breadcrumb = toState.data.breadcrumb;
      });
    }

    $scope.sendEmail = function() {
      EmailLauncher.launchGeneralEmailModal();
    };

    // Logout
    $scope.logout = function() {
      $http.get('/api/auth/signout').success(function(){
        delete Authentication.user;
        $state.go('login');
      });
    };
  }
]);
