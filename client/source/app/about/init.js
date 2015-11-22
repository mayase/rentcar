(function() {
    var module = angular.module('Rentcar.About', [
    ]);

    var options = function ($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('app/about/index.html');
                }]
            })
    };

    options.$inject = ['$stateProvider'];

    module.config(options);
}());