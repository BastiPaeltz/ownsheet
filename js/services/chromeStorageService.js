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
                deferred.resolve("Success pushing sheet " + sheet.name);
            }
        });
        return deferred.promise;
    };


    this.getFromStorage = function (sheet) {

        var result;
        if (sheet) {
            storage.get(sheet.name, function (item) {
                if (chrome.runtime.LastError) {
                    result = "Error getting sheet " + sheet.name;
                } else {
                    result = item;
                }
            });
        }
        else {
            storage.get(null, function (items) {
                if (chrome.runtime.LastError) {
                    result = "Error getting all sheets";
                } else {
                    result = items;
                }
            });
        }

        return result;
    };


    this.removeFromStorage = function (sheet) {

        var result;
        storage.remove(sheet.name, function () {
            if (chrome.runtime.LastError) {
                result = "Error removing " + sheet.name;
            } else {
                result = "Removed " + sheet.name;
            }
        });
        return result;
    };

});
