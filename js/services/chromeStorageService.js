/**
 * Created by sebastian on 5/4/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('chromeStorageService', function ($q) {

    // A word on the storage and the data structures involved with it to myself from the future.
    // When retrieving a single object with .get(key, ...) the returned object looks like this:
    //  {
    //    key : {
    //        aPropertyYouDefined : 'and its value',
    //        andEveryOtherProperty : 'as well'
    //     }
    //   }
    //
    // Every object this very service returns should conform to that design
    // If .get is called with null, the wrapping object will have many (hopefully) unique keys, in our
    // case the name of the different sheets.
    // However when no key is found, it returns {}, which is a bit problematic.
    // because just checking if the returned value is falsy doesn't work
    // So I sometimes checked against the own properties of the returned object
    // or just did --> if (object.propertyImInterestedIn) ...
    //
    // Storage retrieval works asynchronously using Angulars $q
    // the actual returned value is a promise, which needs to be remembered
    // when calling a function from this service!!
    // The content from the storage is fetched
    // by invoking the .then method of the promise in the calling function
    // , which gets resolved in the storage service via .resolve method

    var storage = chrome.storage.local;

    this.pushToStorage = function (sheet) {
        storage.set(sheet);
    };


    this.getFromStorage = function (sheet) {

        var deferred = $q.defer();
        if (sheet) {
            storage.get(sheet, function (item) {
                if (chrome.runtime.LastError) {
                    deferred.resolve("Error");
                } else {
                    deferred.resolve(item);
                }
            });
        }
        else {
            storage.get(null, function (items) {
                if (chrome.runtime.LastError) {
                    deferred.resolve("Error");
                } else {

                    deferred.resolve(items);
                }
            });
        }
        return deferred.promise;
    };


    this.removeFromStorage = function (sheet) {
        storage.remove(sheet);
    };

});
