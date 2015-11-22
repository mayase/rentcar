(function() {
    var module = angular.module('Rentcar.Main', [
    ]);

    var options = function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                //abstract: true,
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('app/main/index.html');
                }]
            })
    };

    options.$inject = ['$stateProvider'];

    module.config(options);
}());
'use strict';
var app = angular.module('App', [
    //vendor
    'templates',
    'ui.router',
    'restangular',

    //appModules
    'Rentcar.Main'
]);

var options = function($urlRouterProvider) {
    $urlRouterProvider
    .otherwise('/');

};

options.$inject = ['$urlRouterProvider'];

app.config(options);