(function() {
    var module = angular.module('Rentcar.ApiTest', [
    ]);

    var options = function ($stateProvider) {
        $stateProvider
            .state('apiTest', {
                url: '/apiTest',
                controller: 'Rentcar.ApiTest.IndexController',
                controllerAs: 'self',
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('app/api_test/index.html');
                }]
            })
    };

    options.$inject = ['$stateProvider'];

    module.config(options);
}());