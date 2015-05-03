module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'lib/angular.min.js',
            'lib/angular-route.min.js',
            'lib/jquery-2.1.3.min.js',
            'js/test/*.js',
            'js/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};