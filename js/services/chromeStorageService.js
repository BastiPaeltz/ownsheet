/**
 * Created by sebastian on 5/4/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('chromeStorageService', function ($q) {

    var storage = chrome.storage.local;

    this.pushToStorage = function (sheet) {
        var deferred = $q.defer();
        storage.set(sheet, function () {
            if (chrome.runtime.LastError) {
                deferred.resolve("Error");
            } else {
                console.log(1);
                deferred.resolve("Success");
            }
        });
        return deferred.promise;
    };


    this.getFromStorage = function (sheet) {

        var deferred = $q.defer();
        if (sheet) {
            storage.get(sheet, function (item) {
                if (chrome.runtime.LastError) {
                    deferred.resolve("Error");
                } else {
                    deferred.resolve(item[sheet]);
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

        var deferred = $q.defer();
        storage.remove(sheet, function () {
            if (chrome.runtime.LastError) {
                deferred.resolve("Error");
            } else {
                deferred.resolve("Removed");
            }
        });
        return deferred.promise;
    };

});
