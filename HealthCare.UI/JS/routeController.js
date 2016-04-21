/// <reference path="../Scripts/angular.min.js" />

/// <reference path="../Scripts/angular-route.min.js" />
/// <reference path="../Scripts/angular-material/angular-material.min.js" />
/// <reference path="../Scripts/angular-animate/angular-animate.min.js" />
/// <reference path="../Scripts/angular-aria/angular-aria.min.js" />


var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);
 



myApp.config(function($routeProvider) {
    $routeProvider
 
        // route for the home page
        .when('/', {
            templateUrl : 'partials/Home.html',
            controller  : 'mainController'
        })

        //.when('/',{
        //    templateUrl: 'Html/DialogHospital.html',
        //    controller: 'myCtrl'
        //});
});
 

myApp.controller('mainController', function ($scope) {
    
    $scope.info = 'Welcome to maincontroller';
});

//myApp.controller('footerController', function ($scope) {

//    //$scope.info = 'Welcome to maincontroller';
//});
 
myApp.controller("myCtrl", function ($scope, $mdDialog, $mdMedia, $http) {
    var vm = this;
    $scope.myForm = {};
    $scope.isResponse = false;
    $scope.showHospitalForm = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'Html/DialogHospital.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

    $scope.showUserForm = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'Html/DialogUser.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

     $scope.myForm.submitTheForm = function (item, event) {
     debugger;
        console.log("--> Submitting form");
        var name= $scope.form.name
           
        var requoestObj={
            'TestData': name,
            'TestInt':999
        };
        vm.responseObject = {
            'hospitalName': ''
        };
        
        var portName = 'http://localhost:13810';

        var responsePromise = $http.post(portName+ "/api/Account/GetData", requoestObj);
        responsePromise.success(function (response, status, headers, config) {
            console.log(response);
            console.log("Hospital registered " + response.TestData);
            vm.responseObject.hospitalName = response.TestData;
            console.log("responseObject.hospitalName : " + vm.responseObject.hospitalName);
            $scope.isResponse = true;
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }

});