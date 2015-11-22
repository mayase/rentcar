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