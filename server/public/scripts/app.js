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
(function() {
    var module = angular.module('Rentcar.Main', [
    ]);

    var options = function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                controller: 'Rentcar.Main.IndexController',
                controllerAs: 'self',
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('app/main/index.html');
                }]
            })
    };

    options.$inject = ['$stateProvider'];

    module.config(options);
}());
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
(function(){
    var module_name = 'Rentcar.Main',
        controller_name = 'IndexController';
    angular.module(module_name).controller(module_name+'.'+controller_name, controller);
    controller.$inject = ['$anchorScroll', '$location', '$scope', '$state', 'Restangular'];
    function controller($anchorScroll, $location, $scope, $state, Restangular) {

        var self = this;
        self.autocompleteOptions = {
            types: '(cities)'
        };
        self.userLocation = null;
        self.userLocationName = null;
        self.userLocationDetails = null;
        self.setLocation = setLocation;
        self.bounds = {
            boundary_top_left_lat: null,
            boundary_top_left_lng: null,
            boundary_bottom_right_lat: null,
            boundary_bottom_right_lng: null
        };
        self.geolocationIsOn = false;
        self.isLocationModalOpened = true;
        setTimeout(function(){
            $('.datepickerFrom').datepicker({
                //startDate: new Date(),
                format: 'dd.mm.yyyy'
            });
            $('.datepickerTo').datepicker({
                //startDate: new Date(),
                format: 'dd.mm.yyyy'
            });
        });

        self.dateFromValue = $.datepicker.formatDate('dd.mm.yy', new Date());
        self.dateToValue = $.datepicker.formatDate('dd.mm.yy', addDays(new Date(), 3));

        self.priceSlider = {
            min: 100,
            max: 900,
            options: {
                floor: 0,
                ceil: 1000
            }
        };
        self.searchTotal = 0;
        self.selectors = {
            class: {
                value: '0',
                isActive: false,
                select: function(val){
                    self.selectors.class.value = val;
                    self.selectors.class.isActive = false;
                }
            },
            transmission: {
                value: '0',
                isActive: false,
                select: function(val){
                    self.selectors.transmission.value = val;
                    self.selectors.transmission.isActive = false;
                }
            },
            seats: {
                value: '0',
                isActive: false,
                select: function(val){
                    self.selectors.seats.value = val;
                    self.selectors.seats.isActive = false;
                },
                text: function(){
                    var mapper = {
                        0: '',
                        1: '2',
                        2: '4',
                        3: '5+'
                    };
                    return mapper[self.selectors.seats.value];
                }
            },
            luggage: {
                value: '0',
                isActive: false,
                select: function(val){
                    self.selectors.luggage.value = val;
                    self.selectors.luggage.isActive = false;
                },
                text: function(){
                    var mapper = {
                        0: '',
                        1: '1',
                        2: '2',
                        3: '3',
                        4: '4+'
                    };
                    return mapper[self.selectors.luggage.value];
                }
            }
        };
        self.mappers = {
            class_id:{
                0: 'Неизвестно',
                1: 'Компактная',
                2: 'Седан',
                3: 'Хэтчбэк',
                4: 'Минивэн+'
            },
            transmission:{
                0: 'Неизвестно',
                1: 'Механика',
                2: 'Полуавтомат',
                3: 'Автомат'
            },
            seats:{
                0: '?',
                1: '2',
                2: '4',
                3: '5+'
            },
            luggage:{
                0: '?',
                1: '1',
                2: '2',
                3: '3',
                4: '4+'
            }
        };
        self.formatDate = function(date){return $.datepicker.formatDate('dd.mm.yy', new Date(date));};
        self.showOnMap = showOnMap;
        self.search = searchHandler;
        self.distanceSortToggle = distanceSortToggle;
        self.distanceSort = true;
        self.loadMore = loadMore;
        self.requestOpt = {
            lazyLoading: false,
            //    function(){
            //    if (self.items)
            //        return self.searchTotal > self.items.length;
            //    return false;
            //},
            top: 10,
            offset: 0
        };

        function loadMore(){
            self.requestOpt.lazyLoading = true;
            self.requestOpt.offset += self.requestOpt.top;
            self.search();
        }

        function distanceSortToggle(){
            self.distanceSort = !self.distanceSort;
            self.search();
        }

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function showOnMap(id){
            for (var marker_key in markers){
                var marker = markers[marker_key];
                if (marker.id == id){
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function(){ marker.setAnimation(null); }, 2150);
                    self.listActive = false;
                    $('.app-search').scrollTop();
                    break;
                }
            }
        }

        function getSearchParams(){
            var params = {};
            if(self.priceSlider.min > self.priceSlider.max){
                params.price_start = self.priceSlider.max;
                params.price_end = self.priceSlider.min;
            }
            else{
                params.price_start = self.priceSlider.min;
                params.price_end = self.priceSlider.max;
            }


            if (self.selectors.class.value != '0')
                params.class_id = self.selectors.class.value;
            if (self.selectors.seats.value != '0')
                params.seats = self.selectors.seats.value;
            if (self.selectors.luggage.value != '0')
                params.luggage = self.selectors.luggage.value;
            if (self.selectors.transmission.value != '0')
                params.transmission = self.selectors.transmission.value;

            if(self.dateFromValue <= self.dateToValue){
                if (self.dateFromValue)
                    params.availability_start_date = addDays($.datepicker.parseDate('dd.mm.yy', self.dateFromValue), 1);//$.datepicker.parseDate('dd.mm.yy', );
                if (self.dateToValue)
                    params.availability_end_date = $.datepicker.parseDate('dd.mm.yy', self.dateToValue);
            }

            for (var key in self.bounds){
                params[key] = self.bounds[key];
            }

            if(self.geolocationIsOn && self.distanceSort){
                params.user_lat = self.userLocation.lat();
                params.user_lng = self.userLocation.lng();
            }

            if(self.requestOpt.lazyLoading){
                params.top = self.requestOpt.top;
                params.offset = self.requestOpt.offset;
            }

            return params;
        }

        $scope.$watchGroup(['self.priceSlider.min', 'self.priceSlider.max',
        'self.selectors.class.value', 'self.selectors.transmission.value', 'self.selectors.seats.value', 'self.selectors.luggage.value',
        'self.dateFromValue', 'self.dateToValue'], function(oldValues, newValues){
            self.isLoading = true;
            self.requestOpt.offset = 0;
            searchHandler();
        });
        $scope.$watchGroup(['self.dateFromValue', 'self.dateToValue'], function(oldValue, newValue){
            setTimeout(function(){
                $('.datepickerFrom').datepicker('setEndDate', self.dateToValue);
                $('.datepickerTo').datepicker('setStartDate', self.dateFromValue);
            });

            //$scope.$digest();
            //$('.datepickerFrom').datepicker('setEndDate', $.datepicker.parseDate('dd.mm.yy', self.dateToValue));
            //$('.datepickerTo').datepicker('setStartDate', $.datepicker.parseDate('dd.mm.yy', self.dateFromValue));
        });
        var searchTimeoutTime = 500;
        var searchTimeout = setTimeout(function(){searchRequest();}, searchTimeoutTime);
        function searchHandler(){
            self.newBounds = false;
            if (searchTimeout){
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function(){searchRequest();}, searchTimeoutTime);
            }
        }
        function searchRequest(){

            self.isLoading = true;
            var params = getSearchParams();
            self.newBounds = false;

            Restangular.all('api').one('cars/search').get(params).then(function(data){
                    console.log(data.plain());
                    if (data.min_price != 0 || data.max_price != 0){
                        self.priceSlider.options.floor = data.min_price;
                        self.priceSlider.options.ceil = data.max_price;
                        if (self.priceSlider.min > self.priceSlider.max){
                            var temp = self.priceSlider.min;
                            self.priceSlider.min = self.priceSlider.max;
                            self.priceSlider.max = temp;
                        }
                        if (self.priceSlider.min < self.priceSlider.options.floor){
                            self.priceSlider.min = self.priceSlider.options.floor;
                        }
                        if (self.priceSlider.max > self.priceSlider.options.ceil){
                            self.priceSlider.max = self.priceSlider.options.ceil;
                        }
                    }
                    var lazy = self.requestOpt.lazyLoading;
                    if(lazy){
                        self.items = self.items.concat(data.result);
                    }
                    else self.items = data.result;
                    self.searchTotal = data.total;
                    setMarkers(lazy);
                    self.isLoading = false;
                    self.requestOpt.lazyLoading = false;

                },
                function(error){
                    console.log(error);
                    self.newBounds = true;
                    self.isLoading = false;
                }
            )
        }

        function setLocation(){
            //self.userLocation = self.userLocationDetails.geometry.location;
            self.isLocationModalOpened = false;
            map.setCenter(self.userLocationDetails.geometry.location);
        }
        //map
        var map;

        function initialize() {
            GeoCoder = new google.maps.Geocoder();
            var initialLocation  = {lat: 55.75585014935258, lng: 37.61785014935258};

            var mapOptions = {
                center: {lat: 55.75585014935258, lng: 37.61785014935258},
                zoom: 8,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                mapTypeControl: false,
                streetViewControl: false

            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            map.setZoom(13);

            // Try W3C Geolocation (Preferred)
            if(navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(initialLocation);
                    self.userLocation = initialLocation;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: initialLocation,
                        icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png'
                    });
                    self.geolocationIsOn = true;
                    $scope.$digest();
                }, function() {
                    self.isLocationModalOpened = true;
                    self.geolocationIsOn = false;
                    $scope.$digest();
                });
            }
            // Browser doesn't support Geolocation
            else {
                self.geolocationIsOn = false;
                self.isLocationModalOpened = true;

                $scope.$digest();
            }

            map.addListener('bounds_changed', function() {
                var bounds = map.getBounds(),
                    ne = bounds.getNorthEast(),
                    sw = bounds.getSouthWest(),
                    nw = new google.maps.LatLng(ne.lat(), sw.lng()),
                    se = new google.maps.LatLng(sw.lat(), ne.lng());
                self.bounds.boundary_top_left_lat = nw.lat();
                self.bounds.boundary_top_left_lng = nw.lng();
                self.bounds.boundary_bottom_right_lat= se.lat();
                self.bounds.boundary_bottom_right_lng = se.lng();
                self.newBounds = true;
                self.search();
                self.requestOpt.offset = 0;
                $scope.$digest();
            });
        }

        var markers = [];
        function showItemSnippet(item){
            self.listActive = true;
            $scope.$digest();
            $('[id^="car-"]').css("background-color", "#ECECEC");
            var newHash = 'car-' + item.id;
            if ($location.hash() !== newHash) {
                $location.hash(newHash);
            }
            $anchorScroll(-100);
            $('#car-'+item.id).css("background-color", "rgb(186, 219, 234)");
        }
        function setMarkers(lazy) {
            if(!lazy) {
                for (var i in markers) markers[i].setMap(null);
                markers = [];
            }
            for (var item_key in self.items) {
                (function () {
                    var item = self.items[item_key];
                    if (item.lat !== null &&
                        item.lng !== null) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: {
                                lat: item.lat,
                                lng: item.lng
                            },
                            data: item,
                            id: item.id
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            showItemSnippet(marker);
                        });

                        markers.push(marker);
                    }
                })();
            }
        }

        initialize();
    }
    !function(a){"object"==typeof module&&"object"==typeof module.exports?a(require("jquery"),window,document):a(window.jQuery,window,document)}(function(a,b,c,d){function e(){var b=a('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>'),c=0,d=0;return a("body").append(b),c=a(b).innerWidth(),d=a("div",b).innerWidth(),b.remove(),c-d}function f(b,c){this.el=b,this.$el=a(b),this.$track,this.$scrollbar,this.dragOffset,this.flashTimeout,this.$contentEl=this.$el,this.$scrollContentEl=this.$el,this.scrollDirection="vert",this.scrollOffsetAttr="scrollTop",this.sizeAttr="height",this.scrollSizeAttr="scrollHeight",this.offsetAttr="top",this.options=a.extend({},f.DEFAULTS,c),this.theme=this.options.css,this.init()}var g,h="WebkitAppearance"in c.documentElement.style;f.DEFAULTS={wrapContent:!0,autoHide:!0,css:{container:"simplebar",content:"simplebar-content",scrollContent:"simplebar-scroll-content",scrollbar:"simplebar-scrollbar",scrollbarTrack:"simplebar-track"}},f.prototype.init=function(){return"undefined"==typeof g&&(g=e()),0===g?(this.$el.css("overflow","auto"),void 0):(("horizontal"===this.$el.data("simplebar-direction")||this.$el.hasClass(this.theme.container+" horizontal"))&&(this.scrollDirection="horiz",this.scrollOffsetAttr="scrollLeft",this.sizeAttr="width",this.scrollSizeAttr="scrollWidth",this.offsetAttr="left"),this.options.wrapContent&&this.$el.wrapInner('<div class="'+this.theme.scrollContent+'"><div class="'+this.theme.content+'"></div></div>'),this.$contentEl=this.$el.find("."+this.theme.content),this.$el.prepend('<div class="'+this.theme.scrollbarTrack+'"><div class="'+this.theme.scrollbar+'"></div></div>'),this.$track=this.$el.find("."+this.theme.scrollbarTrack),this.$scrollbar=this.$el.find("."+this.theme.scrollbar),this.$scrollContentEl=this.$el.find("."+this.theme.scrollContent),this.resizeScrollContent(),this.options.autoHide&&this.$el.on("mouseenter",a.proxy(this.flashScrollbar,this)),this.$scrollbar.on("mousedown",a.proxy(this.startDrag,this)),this.$scrollContentEl.on("scroll",a.proxy(this.startScroll,this)),this.resizeScrollbar(),this.options.autoHide||this.showScrollbar(),void 0)},f.prototype.startDrag=function(b){b.preventDefault();var d=b.pageY;"horiz"===this.scrollDirection&&(d=b.pageX),this.dragOffset=d-this.$scrollbar.offset()[this.offsetAttr],a(c).on("mousemove",a.proxy(this.drag,this)),a(c).on("mouseup",a.proxy(this.endDrag,this))},f.prototype.drag=function(a){a.preventDefault();var b=a.pageY,c=null,d=null,e=null;"horiz"===this.scrollDirection&&(b=a.pageX),c=b-this.$track.offset()[this.offsetAttr]-this.dragOffset,d=c/this.$track[this.sizeAttr](),e=d*this.$contentEl[0][this.scrollSizeAttr],this.$scrollContentEl[this.scrollOffsetAttr](e)},f.prototype.endDrag=function(){a(c).off("mousemove",this.drag),a(c).off("mouseup",this.endDrag)},f.prototype.resizeScrollbar=function(){if(0!==g){var a=this.$contentEl[0][this.scrollSizeAttr],b=this.$scrollContentEl[this.scrollOffsetAttr](),c=this.$track[this.sizeAttr](),d=c/a,e=Math.round(d*b)+2,f=Math.floor(d*(c-2))-2;a>c?("vert"===this.scrollDirection?this.$scrollbar.css({top:e,height:f}):this.$scrollbar.css({left:e,width:f}),this.$track.show()):this.$track.hide()}},f.prototype.startScroll=function(a){this.$el.trigger(a),this.flashScrollbar()},f.prototype.flashScrollbar=function(){this.resizeScrollbar(),this.showScrollbar()},f.prototype.showScrollbar=function(){this.$scrollbar.addClass("visible"),this.options.autoHide&&("number"==typeof this.flashTimeout&&b.clearTimeout(this.flashTimeout),this.flashTimeout=b.setTimeout(a.proxy(this.hideScrollbar,this),1e3))},f.prototype.hideScrollbar=function(){this.$scrollbar.removeClass("visible"),"number"==typeof this.flashTimeout&&b.clearTimeout(this.flashTimeout)},f.prototype.resizeScrollContent=function(){h||("vert"===this.scrollDirection?(this.$scrollContentEl.width(this.$el.width()+g),this.$scrollContentEl.height(this.$el.height())):(this.$scrollContentEl.width(this.$el.width()),this.$scrollContentEl.height(this.$el.height()+g)))},f.prototype.recalculate=function(){this.resizeScrollContent(),this.resizeScrollbar()},f.prototype.getScrollElement=function(){return this.$scrollContentEl},f.prototype.getContentElement=function(){return this.$contentEl},a(b).on("load",function(){a("[data-simplebar-direction]").each(function(){a(this).simplebar()})});var i=a.fn.simplebar;a.fn.simplebar=function(b){var c,e=arguments;return"undefined"==typeof b||"object"==typeof b?this.each(function(){a.data(this,"simplebar")||a.data(this,"simplebar",new f(this,b))}):"string"==typeof b?(this.each(function(){var d=a.data(this,"simplebar");d instanceof f&&"function"==typeof d[b]&&(c=d[b].apply(d,Array.prototype.slice.call(e,1))),"destroy"===b&&a.data(this,"simplebar",null)}),c!==d?c:this):void 0},a.fn.simplebar.Constructor=f,a.fn.simplebar.noConflict=function(){return a.fn.simplebar=i,this}});
}());
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