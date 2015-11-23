(function(){
    var module_name = 'Rentcar.ApiTest',
        controller_name = 'IndexController';
    angular.module(module_name).controller(module_name+'.'+controller_name, controller);
    controller.$inject = ['$scope', '$state', 'Restangular'];
    function controller($scope, $state, Restangular) {

        var self = this;

        self.searchFormData = {

        };
        var searchResultValues = {
            start: 'Введите параметры и нажмите кнопку "Go"',
            error: 'Произошла ошибка. Подробности в консоли'
        };
        self.searchResult=searchResultValues.start;

        self.searchRequest = function(){
            console.log(self.searchFormData);
            Restangular.all('api').one('cars/search').get(self.searchFormData).then(function(data){
                self.searchResult = data.plain();
            },
                function(error){
                    console.log(error);
                    self.searchResult = searchResultValues.error;
                }
            )
        }
    }
}());