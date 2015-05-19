/**
 * Created by sebastian on 5/19/15.
 */


"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('localStorageWrapper', ["$q", "localStorageService",
    function ($q, localStorageService) {

        // This is a wrapper for the (angular) local storage Service to conform
        // with the behaviour and return values of the chromeStorageService.
        // It defines the exact same methods and objects returned from
        // this service are also the same.

        var storage = localStorageService;

        this.pushToStorage = function (sheet) {
            for (var key in sheet) {
                // double check correctness of pushed value
                if (key === sheet[key].name) {
                    storage.set(key, sheet[key]);
                }
            }
        };


        this.getFromStorage = function (sheet) {

            var deferred = $q.defer();
            var returnedObject = {};
            if (sheet) {
                var returnedValue = storage.get(sheet);
                if (!returnedValue) {
                    deferred.resolve({});
                } else {
                    returnedObject[sheet] = returnedValue;
                    deferred.resolve(returnedObject);
                }
            }
            else {
                // construct object which contains all entries
                var storageKeys = storage.keys();
                for (var index = 0; index < storageKeys.length; index++) {
                    returnedObject[storageKeys[index]] = storage.get(storageKeys[index]);
                }
                deferred.resolve(returnedObject);
            }
            return deferred.promise;
        };


        this.removeFromStorage = function (sheet) {
            storage.remove(sheet);
        };

    }]);
