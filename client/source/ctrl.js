(function() {

    var app = angular.module('App').controller('HeaderController', controller);
    controller.$inject = ['$state'];
    function controller($state) {
        var self = this;

        self.isActive = function (smth) {
            return ($state.current.name.indexOf(smth) > -1);
        }
    }
}());