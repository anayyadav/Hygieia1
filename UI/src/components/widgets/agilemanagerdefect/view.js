/**
 * View controller for the build widget
 */
(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('AgileManagerWidgetDViewController', AgileManagerWidgetDViewController);


    AgileManagerWidgetDViewController.$inject = ['$scope', 'hpamData', '$q', '$uibModal'];
    function AgileManagerWidgetDViewController($scope, hpamData, $q, $uibModal) {
	var ctrl = this;
        ctrl.agileManagerDetails = [];
        ctrl.copyAgileManagerDetails = [];
        ctrl.copyagileManagerDetails = [];

        ctrl.loadDefectStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
            var defferred = 0, pclose = 0, rejected = 0, duplicate = 0, close = 0, fixed = 0, open = 0;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamDefectdata.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });

                n = n + f[0]["status"].New;
                defferred = defferred + f[0]["status"].defferred
                pclose = pclose + f[0]["status"].pclose
                rejected = rejected + f[0]["status"].rejected
                duplicate = duplicate + f[0]["status"].duplicate
                close = close + f[0]["status"].close
                fixed = fixed + f[0]["status"].fixed
                open = open + f[0]["status"].open


            }
            output.push({ ne: n, defferred: defferred, pclose: pclose, rejected: rejected, duplicate: duplicate, close: close, fixed: fixed, open: open });
            return output;
        }

        ctrl.loadCurrentSprintStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
            var defferred = 0, pclose = 0, rejected = 0, duplicate = 0, close = 0, fixed = 0, open = 0;
            var sprintname;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamCurrentSprintDefect.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });
                sprintname = f[0]["sprintname"]
                n = n + f[0]["status"].New;
                defferred = defferred + f[0]["status"].defferred
                pclose = pclose + f[0]["status"].pclose
                rejected = rejected + f[0]["status"].rejected
                duplicate = duplicate + f[0]["status"].duplicate
                close = close + f[0]["status"].close
                fixed = fixed + f[0]["status"].fixed
                open = open + f[0]["status"].open
            }
            output.push({ ne: n, defferred: defferred, pclose: pclose, rejected: rejected, duplicate: duplicate, close: close, fixed: fixed, open: open, sprintname: sprintname });
            return output;
        }

		ctrl.sumStroryPoint = function (inputData,s) {
            var sprintname;
            var n = 0;
            var defferred = 0, pclose = 0, rejected = 0, duplicate = 0, close = 0, fixed = 0, open = 0;
            var output = []
            for (var i = 0; i < inputData.length; i++) {
				if(inputData[i].sprintname == s)
				{
					sprintname = s
					n = n + inputData[i]["status"].New;
					defferred = defferred + inputData[i]["status"].defferred
					pclose = pclose + inputData[i]["status"].pclose
					rejected = rejected + inputData[i]["status"].rejected
					duplicate = duplicate + inputData[i]["status"].duplicate
					close = close + inputData[i]["status"].close
					fixed = fixed + inputData[i]["status"].fixed
					open = open + inputData[i]["status"].open
				
				
				}
                               
            }


            output.push({ sprintname: sprintname, ne: n, defferred: defferred, pclose: pclose, rejected: rejected, duplicate: duplicate, close: close, fixed: fixed, open: open });

            return output;
        }
		
		ctrl.loadPeriviousSprintStatus= function (agileManagerDetails, currentSprint){
			var output = [];
            var n = 0;
			var perviosuSprint=[];
			var sprintData=[];
            var defferred = 0, pclose = 0, rejected = 0, duplicate = 0, close = 0, fixed = 0, open = 0;
            var size = ($scope.widgetConfig.options.appID).length;
			var currentSP = currentSprint.split(" ")[1];
			console.log(currentSP)
			for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamDefectdata.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                
				});
				for (var j = 0; j < f.length; j++) {
                    sprintData.push(f[j]);
                }
				
            }
			
			for (var j = 1; j < parseInt(currentSP) ; j++ )
			{
				var f1 = [];
                f1 = sprintData.filter(function (item) {
                    return item.sprintname == "Sprint "+j.toString() ;
                });
				output = ctrl.sumStroryPoint(f1,"Sprint "+j.toString());
                perviosuSprint.push(output[0]);
				
			}
			return perviosuSprint
		}
		
		ctrl.loadTabs= function(tabdata){
		
		var tabs=[];
		for (var i= 0; i < tabdata.length ; i++)
		{
			tabs.push({name: tabdata[i].sprintname })
		
		}
		return tabs;
		}
		
		
        ctrl.load = function () {
            hpamData.details($scope.widgetConfig.componentId).
                then(function (data) {
                    ctrl.agileManagerDetails = angular.copy(data.data);
                    ctrl.copyAgileManagerDetails = angular.copy(data.data);
					
                    var filtered2 = ctrl.loadDefectStatus(ctrl.agileManagerDetails);
                    var filtered6 = ctrl.loadCurrentSprintStatus(ctrl.agileManagerDetails);
					var filtered7 = ctrl.loadPeriviousSprintStatus(ctrl.agileManagerDetails,filtered6[0]["sprintname"]);
					
                    ctrl.agileManagerDetails[0].hpamDefectdata = angular.copy(filtered2);
                    ctrl.agileManagerDetails[0].hpamCurrentSprintDefect = angular.copy(filtered6);
					ctrl.agileManagerDetails[0].hpamPerviousSprintDefect = angular.copy(filtered7);
                    ctrl.copyAgileManagerDetails[0].hpamDefectdata = angular.copy(filtered2);
                    ctrl.copyAgileManagerDetails[0].hpamCurrentSprintDefect = angular.copy(filtered6);
					ctrl.copyAgileManagerDetails[0].hpamPerviousSprintDefect = angular.copy(filtered7);
		
					ctrl.minitabs = ctrl.loadTabs(filtered7);
					console.log(ctrl.minitabs)
					ctrl.miniWidgetView = ctrl.minitabs[0].name;
					ctrl.miniToggleView = function (index) {
						ctrl.miniWidgetView = typeof ctrl.minitabs[index] === 'undefined' ? ctrl.minitabs[0].name : ctrl.minitabs[index].name;
					};
                });
        }

        ctrl.open = function (url) {
            window.open(url);
        }
		
		ctrl.pieOptions = {
            donut: true,
            donutWidth: 20,
            startAngle: 270,
            total: 200,
            showLabel: false
        };
    }

})();
