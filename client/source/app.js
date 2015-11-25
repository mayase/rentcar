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
    .otherwise('/');

};

options.$inject = ['$urlRouterProvider'];

app.config(options);