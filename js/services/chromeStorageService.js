/**
 * Created by sebastian on 5/4/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");
//ownsheetApp.value('chromeStorage', chrome.storage.local);
ownsheetApp.service('chromeStorageService', ['chromeStorage', function (chromeStorage) {


    this.pushToStorage = function (sheet) {
        var result;

        chromeStorage.set(sheet, function () {
            if (chrome.runtime.LastError) {
                result = "Error pushing sheet. " + sheet.name;
            } else {
                result = "Success pushing sheet " + sheet.name;
            }
        });

        return result;
    };


    this.getFromStorage = function (sheet) {

        var result;
        if (sheet) {
            chromeStorage.get(sheet.name, function (item) {
                if (chrome.runtime.LastError) {
                    result = "Error getting sheet " + sheet.name;
                } else {
                    result = item;
                }
            });
        }
        else {
            chromeStorage.get(null, function (items) {
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
        chromeStorage.remove(sheet.name, function () {
            if (chrome.runtime.LastError) {
                result = "Error removing " + sheet.name;
            } else {
                result = "Removed " + sheet.name;
            }
        });
        return result;
    };

}]);
