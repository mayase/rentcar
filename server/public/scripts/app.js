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
    controller.$inject = ['$scope', '$state'];
    function controller($scope, $state) {

        var self = this;

        self.value = 'hello';
        setTimeout(function(){
            console.log($('.datepicker'));
            $('.datepicker').datepicker({
            });
        });
        self.priceSlider = {
            min: 100,
            max: 900,
            options: {
                floor: 0,
                ceil: 1000
            }
        };

        self.selectors = {
            class: {
                value: '1',
                isActive: false,
                select: function(val){
                    self.selectors.class.value = val;
                    self.selectors.class.isActive = false;
                }
            },
            transmission: {
                value: '1',
                isActive: false,
                select: function(val){
                    self.selectors.transmission.value = val;
                    self.selectors.transmission.isActive = false;
                }
            },
            seats: {
                value: '1',
                isActive: false,
                select: function(val){
                    self.selectors.seats.value = val;
                    self.selectors.seats.isActive = false;
                },
                text: function(){
                    var mapper = {
                        1: ' 2',
                        2: ' 4',
                        3: '5+'
                    };
                    return mapper[self.selectors.seats.value];
                }
            },
            luggage: {
                value: '1',
                isActive: false,
                select: function(val){
                    self.selectors.luggage.value = val;
                    self.selectors.luggage.isActive = false;
                },
                text: function(){
                    var mapper = {
                        1: ' 1',
                        2: ' 2',
                        3: '3',
                        4: '4+'
                    };
                    return mapper[self.selectors.luggage.value];
                }
            }
        };


        //map
        var map;

        function initialize() {
            GeoCoder = new google.maps.Geocoder();
            var mapOptions = {
                center: {lat: 55.75585014935258, lng: 37.61785014935258},
                zoom: 8
            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            map.setZoom(13);
        }

        function setMarkers() {
            //for (var bar_key in self.bars) {
            //    (function () {
            //        var bar = self.bars[bar_key];
            //        if (bar.lat !== null &&
            //            bar.lng !== null) {
            //            var marker = new google.maps.Marker({
            //                map: map,
            //                position: {
            //                    lat: bar.lat,
            //                    lng: bar.lng
            //                },
            //                bar: bar
            //            });
            //
            //            google.maps.event.addListener(marker, 'click', function () {
            //                showBarInfoSnippet(marker);
            //            });
            //        }
            //    })();
            //}
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