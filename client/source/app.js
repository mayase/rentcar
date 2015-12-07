'use strict';
var app = angular.module('App', [
    //vendor
    'templates',
    'ui.router',
    'restangular',
    'rzModule',
    'ngAutocomplete',

    //appModules
    'Rentcar.Main',
    'Rentcar.About',
    'Rentcar.ApiTest'
]);

var options = function($urlRouterProvider) {
    $urlRouterProvider
    .otherwise('/about');

};

options.$inject = ['$urlRouterProvider'];

app.config(options);