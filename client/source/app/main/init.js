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