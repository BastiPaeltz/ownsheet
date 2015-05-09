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
                deferred.resolve("Error pushing sheet. " + sheet.name);
            } else {
                console.log(1);
                deferred.resolve("Success pushing sheet " + sheet.name);
            }
        });
        return deferred.promise;
    };


    this.getFromStorage = function (sheet) {

        var deferred = $q.defer();
        if (sheet) {
            storage.get(sheet.name, function (item) {
                if (chrome.runtime.LastError) {
                    deferred.resolve("Error getting sheet " + sheet.name);
                } else {
                    deferred.resolve(item);
                }
            });
        }
        else {
            storage.get(null, function (items) {
                if (chrome.runtime.LastError) {
                    deferred.resolve("Error getting all sheets");
                } else {

                    deferred.resolve(items);
                }
            });
        }
        return deferred.promise;
    };


    this.removeFromStorage = function (sheet) {

        var deferred = $q.defer();
        storage.remove(sheet.name, function () {
            if (chrome.runtime.LastError) {
                deferred.resolve("Error removing " + sheet.name);
            } else {
                deferred.resolve("Removed " + sheet.name);
            }
        });
        return deferred.promise;
    };

});
