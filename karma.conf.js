module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'lib/angular.min.js',
            'lib/angular-route.min.js',
            'lib/angular-mocks.js',
            'lib/jquery-2.1.3.min.js',
            'js/*.js',
            'js/controllers/*.js',
            'js/services/*.js',
            'test/*.js'
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
