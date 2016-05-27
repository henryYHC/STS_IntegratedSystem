'use strict';

// Setting up route
angular.module('technician.admin').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Home state routing
    $stateProvider
      // Main views and functions
      .state('admin', {
        abstract: true,
        url: '/admin',
        controller: 'TechAdminController',
        templateUrl: 'modules/technician/client/views/template.client.view.html'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/technician/client/views/admin/admin-users.client.view.html',
        data: { breadcrumb: 'Register/Reset User' }
      })
      .state('admin.setting', {
        url: '/setting',
        templateUrl: 'modules/technician/client/views/admin/admin-setting.client.view.html',
        data: { breadcrumb: 'System Setting' }
      })
      .state('admin.stat', {
        url: '/stat'
      })
      .state('admin.stat.library-guidance', {
        url: '/library-guidance',
        templateUrl: 'modules/technician/client/views/admin/stat/library-guidance-stat.client.view.html',
        data: { breadcrumb: 'Library Guidance Statistics' }
      });

    $urlRouterProvider.when('/admin', '/tech/home');
  }
]);
