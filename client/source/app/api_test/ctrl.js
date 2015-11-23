(function(){
    var module_name = 'Rentcar.ApiTest',
        controller_name = 'IndexController';
    angular.module(module_name).controller(module_name+'.'+controller_name, controller);
    controller.$inject = ['$scope', '$state'];
    function controller($scope, $state) {

        var self = this;
    }
}());