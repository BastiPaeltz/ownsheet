/**
 * Created by sebastian on 5/8/15.
 */

/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('editController', ["$scope", "$routeParams", "mdParserService", "localStorageService",
    function ($scope, $routeParams, mdParserService, localStorageService) {
        var sheetContent;


        var sheetName = $routeParams.sheetName;

        $scope.sheet = {};
        if (sheetName) {
            sheetContent = localStorageService.get(sheetName);
            $scope.sheet.name=sheetName;
        }else{
            $scope.sheet.name="Add new sheet.";
        }

        if (sheetContent){
            $scope.content = sheetContent;
        }else {
            $scope.content = "# ownsheet ignores these headings\n\
\n\
this text will be ignored\n\
\n\
## each of these headings will form a box\n\
\n\
this text will be content of a box\n\
\n\
## another box\n\
\n\
* you can fill in any markdown you want\n\
* it will be part of the box\n\
\n\
`Like these`\n\
\n\
\
\n\
## Note however that there are better options for editing markdown (online or offline)\n\
\n\
### ownsheet shines when it comes to displaying markdown not so much when it comes to editing it"
        }

        this.submit = function(){
            var parsedMarkdown = mdParserService.parse($scope.content);
            localStorageService.set($scope.sheet.name, parsedMarkdown);
        }
}]);

