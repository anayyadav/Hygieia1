/**
 * View controller for the build widget
 */
(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('AgileManagerWidgetViewController', AgileManagerWidgetViewController);


    AgileManagerWidgetViewController.$inject = ['$scope', 'hpamData', '$q', '$uibModal'];
    function AgileManagerWidgetViewController($scope, hpamData, $q, $uibModal) {

        var ctrl = this;
        ctrl.agileManagerDetails = [];    
        ctrl.copyAgileManagerDetails = [];
        ctrl.copyagileManagerDetails = [];
		

        ctrl.GroupVelocity = function () {
            var dataList = [];
            ctrl.agileManagerDetails[0].hpamSprint.forEach((item) => {
                dataList.push({ spname: item.sprintname, donestorypoints: item.doneSP })
            })
            ctrl.loadgroupVelocityChart(dataList)
        }

        ctrl.loadgroupVelocityChart = function (dataList) {
            let data = [];
            let lables = [];
            let avg = 0;
            let expectedVelosity = 0;
            let count = 0
            dataList.forEach((item, index) => {
                data.push(item.donestorypoints);
                if (item.donestorypoints != 0) {
                    count = count + 1;
                }
                avg = avg + item.donestorypoints;
                lables.push(item.spname);
            });

            avg = avg / count;
            var length = lables.length - 1
            var data2 = [];
            data2.push(expectedVelosity)

            for (var i = 0; i < length; i++) {
                data2.push(expectedVelosity);
            }

            var data3 = [];
            data3.push(avg)
            for (var i = 0; i < length; i++) {
                if (i < count - 1) {
                    data3.push(avg);
                }
                else {
                    data3.push(0);
                }
            }

            var barchart = {
                labels: lables,
                datasets: [{
                    label: "Velocity",
                    type: 'bar',
                    fill: true,
                    data: data,
                    stack: 'Stack 0',
                    borderColor: '#6495ed',
                    backgroundColor: '#6495ed'

                }, {
                    label: "Expected Velocity",
                    type: 'bar',
                    fill: false,
                    stack: 'Stack 1',
                    borderColor: '#AED6F1',
                    backgroundColor: '#AED6F1',
                    data: data2
                }, {
                    label: "Average Velocity",
                    type: 'line',
                    fill: false,
                    stack: 'Stack 1',
                    borderColor: '#FFA500',
                    backgroundColor: '#FFA500',
                    data: data3
                }],
            };

            var ctx = document.getElementById('myChart2');
            new Chart(ctx, {
                type: 'bar',
                data: barchart,
                options: {

                    //to get sharp edges instead of smooth curves
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Sprint Velocity Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Sprints'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Strory Points'
                            }
                        }]
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            });

        }


        ctrl.loadReleaseStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
			var nSP = 0 ;
            var done = 0, inprogress = 0, intesting = 0, url, doneSP =0 ,inprogressSP =0 ,intestingSP=0 ;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamRelease.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });

                n = n + f[0]["status"].New;
				nSP= nSP + f[0]["status"].newSP
                done = done + f[0]["status"].Done;
				doneSP = doneSP +f[0]["status"].doneSP
                inprogress = inprogress + f[0]["status"].In_Progress;
				inprogressSP = inprogressSP + f[0]["status"].inpSP
                intesting = intesting + f[0]["status"].In_testing;
				intestingSP= intestingSP + f[0]["status"].intestingSP
                url = f[0]["status"].Url;


            }
            output.push({ ne: n,nSP:nSP,doneSP: doneSP,inprogressSP:inprogressSP,intestingSP:intestingSP, Done: done, In_Progress: inprogress, In_testing: intesting, url: url });
            return output;
        }


        ctrl.loadCurrentSprintStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
			var nSP = 0 ;
            var done = 0, inprogress = 0, intesting = 0, url, doneSP =0 ,inprogressSP =0 ,intestingSP=0 ;
            var sprintname;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamCurrentSprint.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });
				sprintname = f[0].sprintname;
				
                n = n + f[0]["status"].New;
				nSP= nSP + f[0]["status"].new_SP
                done = done + f[0]["status"].Done;
				doneSP = doneSP +f[0]["status"].done_SP
                inprogress = inprogress + f[0]["status"].In_Progress;
				inprogressSP = inprogressSP + f[0]["status"].inp_SP
                intesting = intesting + f[0]["status"].In_testing;
				intestingSP= intestingSP + f[0]["status"].intesting_SP
            }
            output.push({ ne: n,nSP:nSP,doneSP: doneSP,inprogressSP:inprogressSP,intestingSP:intestingSP, Done: done, In_Progress: inprogress, In_testing: intesting, sprintname: sprintname });
            return output;
        }

        ctrl.loadFirstnextSprintStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
			var nSP = 0 ;
            var done = 0, inprogress = 0, intesting = 0, url, doneSP =0 ,inprogressSP =0 ,intestingSP=0 ;
            var sprintname;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamFirstnext.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });

                sprintname = f[0].sprintname;
				
				//ctrl.tab1= sprintname;
                n = n + f[0]["status"].New;
				nSP= nSP + f[0]["status"].new_SP
                done = done + f[0]["status"].Done;
				doneSP = doneSP +f[0]["status"].done_SP
                inprogress = inprogress + f[0]["status"].In_Progress;
				inprogressSP = inprogressSP + f[0]["status"].inp_SP
                intesting = intesting + f[0]["status"].In_testing;
				intestingSP= intestingSP + f[0]["status"].intesting_SP
            }
            output.push({ ne: n,nSP:nSP,doneSP: doneSP,inprogressSP:inprogressSP,intestingSP:intestingSP, Done: done, In_Progress: inprogress, In_testing: intesting, sprintname: sprintname });
            return output;
        }

        ctrl.loadSecondnextSprintStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
			var nSP = 0 ;
            var done = 0, inprogress = 0, intesting = 0, url, doneSP =0 ,inprogressSP =0 ,intestingSP=0 ;
            var sprintname;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamSecondnext.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });

                sprintname = f[0].sprintname;
				//ctrl.tab2= sprintname;
                n = n + f[0]["status"].New;
				nSP= nSP + f[0]["status"].new_SP
                done = done + f[0]["status"].Done;
				doneSP = doneSP +f[0]["status"].done_SP
                inprogress = inprogress + f[0]["status"].In_Progress;
				inprogressSP = inprogressSP + f[0]["status"].inp_SP
                intesting = intesting + f[0]["status"].In_testing;
				intestingSP= intestingSP + f[0]["status"].intesting_SP
            }
            output.push({ ne: n,nSP:nSP,doneSP: doneSP,inprogressSP:inprogressSP,intestingSP:intestingSP, Done: done, In_Progress: inprogress, In_testing: intesting, sprintname: sprintname });
            return output;
        }

        ctrl.loadThirdnextSprintStatus = function (agileManagerDetails) {
            var output = [];
            var n = 0;
			var nSP = 0 ;
            var done = 0, inprogress = 0, intesting = 0, url, doneSP =0 ,inprogressSP =0 ,intestingSP=0 ;
            var sprintname;
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamThirdnext.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });

                sprintname = f[0].sprintname;
				//ctrl.tab3= sprintname;
                n = n + f[0]["status"].New;
				nSP= nSP + f[0]["status"].new_SP
                done = done + f[0]["status"].Done;
				doneSP = doneSP +f[0]["status"].done_SP
                inprogress = inprogress + f[0]["status"].In_Progress;
				inprogressSP = inprogressSP + f[0]["status"].inp_SP
                intesting = intesting + f[0]["status"].In_testing;
				intestingSP= intestingSP + f[0]["status"].intesting_SP
            }
            output.push({ ne: n,nSP:nSP,doneSP: doneSP,inprogressSP:inprogressSP,intestingSP:intestingSP, Done: done, In_Progress: inprogress, In_testing: intesting, sprintname: sprintname });
            return output;
        }


        ctrl.loadSpikecards = function (agileManagerDetails) {
            var output = [];
            var spikeCard = 0;
			var spikePoint = 0
            var size = ($scope.widgetConfig.options.appID).length;

            for (var i = 0; i < size; i++) {
                var f = [];
                f = agileManagerDetails[0].hpamSpikedata.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[i];
                });

                spikeCard = spikeCard + f[0].spikeCount;
				spikePoint = spikePoint + f[0].spikePoints;
            }
            output.push({ spikeCount: spikeCard ,spikePoint: spikePoint });
            return output;
        }

        ctrl.sumStroryPoint = function (inputData) {
            var sprintname;
            var sprintid;
            var doneSP = 0;
            var output = []
            for (var i = 0; i < inputData.length; i++) {
                sprintname = inputData[i].sprintname;
                sprintid = inputData[i].sprintid;
                doneSP = doneSP + inputData[i].doneSP;
                
            }


            output.push({ sprintname: sprintname, sprintid: sprintid, doneSP: doneSP })
            return output;
        }

        ctrl.loadhpamSprint = function (agileManagerDetails) {
            var output = [];
            var sprint = []
            var sprintID = [];
            var f = [];
            var f2 = [];
            var hpamSprint = [];
            var size = ($scope.widgetConfig.options.appID).length;
            f = agileManagerDetails[0].hpamSprint.filter(function (item) {
                return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[0];
            });

            for (var i = 0; i < f.length; i++) {
                sprintID.push(f[i].sprintid);
            }

            for (var k = 0; k < size; k++) {
                var f1 = []
                f1 = agileManagerDetails[0].hpamSprint.filter(function (item) {
                    return item.releaseid == $scope.widgetConfig.options.releaseid && item.appID == $scope.widgetConfig.options.appID[k];
                });

                for (var j = 0; j < f1.length; j++) {
                    sprint.push(f1[j]);
                }

            }

            for (var i = 0; i < sprintID.length; i++) {
                f2 = sprint.filter(function (item) {
                    return item.sprintid == sprintID[i];
                });
                output = ctrl.sumStroryPoint(f2);
                hpamSprint.push(output[0]);

            }

            return hpamSprint;

        }

        ctrl.load = function () {
            hpamData.details($scope.widgetConfig.componentId).
                then(function (data) {
                    ctrl.agileManagerDetails = angular.copy(data.data);
                    ctrl.copyAgileManagerDetails = angular.copy(data.data);

                    var filtered2 = ctrl.loadReleaseStatus(ctrl.agileManagerDetails);
                    var filtered3 = ctrl.loadFirstnextSprintStatus(ctrl.agileManagerDetails);
                    var filtered4 = ctrl.loadSecondnextSprintStatus(ctrl.agileManagerDetails);
                    var filtered5 = ctrl.loadThirdnextSprintStatus(ctrl.agileManagerDetails);
                    var filtered6 = ctrl.loadCurrentSprintStatus(ctrl.agileManagerDetails);
                    var filtered7 = ctrl.loadSpikecards(ctrl.agileManagerDetails);
                    var filtered8 = ctrl.loadhpamSprint(ctrl.agileManagerDetails)
                    ctrl.agileManagerDetails[0].hpamRelease = angular.copy(filtered2);
                    ctrl.agileManagerDetails[0].hpamFirstnext = angular.copy(filtered3);
                    ctrl.agileManagerDetails[0].hpamSecondnext = angular.copy(filtered4);
                    ctrl.agileManagerDetails[0].hpamThirdnext = angular.copy(filtered5);
                    ctrl.agileManagerDetails[0].hpamCurrentSprint = angular.copy(filtered6);
                    ctrl.agileManagerDetails[0].hpamSpikedata = angular.copy(filtered7);
                    ctrl.agileManagerDetails[0].hpamSprint = angular.copy(filtered8);

                    ctrl.copyAgileManagerDetails[0].hpamRelease = angular.copy(filtered2);
                    ctrl.copyAgileManagerDetails[0].hpamFirstnext = angular.copy(filtered3);
					ctrl.tab1 = filtered3[0].sprintname;
					
                    ctrl.copyAgileManagerDetails[0].hpamSecondnext = angular.copy(filtered4);
					ctrl.tab2 = filtered4[0].sprintname;
                    ctrl.copyAgileManagerDetails[0].hpamThirdnext = angular.copy(filtered5);
					ctrl.tab3 = filtered5[0].sprintname;
                    ctrl.copyAgileManagerDetails[0].hpamCurrentSprint = angular.copy(filtered6);
                    ctrl.copyAgileManagerDetails[0].hpamSpikedata = angular.copy(filtered7);
                    ctrl.copyAgileManagerDetails[0].hpamSprint = angular.copy(filtered8);
					ctrl.minitabs = [
            { name: ctrl.tab1 },
            { name: ctrl.tab2 },
            { name: ctrl.tab3 }

        ];
		ctrl.miniWidgetView = ctrl.minitabs[0].name;
        ctrl.miniToggleView = function (index) {
            ctrl.miniWidgetView = typeof ctrl.minitabs[index] === 'undefined' ? ctrl.minitabs[0].name : ctrl.minitabs[index].name;
        };
		
                    ctrl.GroupVelocity();
                });
				


        }
	
		ctrl.pieOptions = {
            donut: true,
            donutWidth: 20,
            startAngle: 270,
            total: 200,
            showLabel: false
        };

        
	
		
        ctrl.open = function (url) {
            window.open(url);
        }

        ctrl.showDetail = showDetail

        function showDetail(item) {
            $uibModal.open({
                controller: 'AgileManagerDetailController',
                controllerAs: 'detail',
                templateUrl: 'components/widgets/agilemanager/detail.html',
                size: 'lg'

            });
        }
    }
})();
