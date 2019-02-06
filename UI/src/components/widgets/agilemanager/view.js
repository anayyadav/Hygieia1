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
        var builds = [];
        ctrl.openStoryPoints = [];
        ctrl.teamfiltered = [];
        ctrl.agileManagerDetails = [];
        ctrl.backlogPieChart = [];
        ctrl.uniqueReleaseIds = [];
        ctrl.selectedReleaseId = 0;
        ctrl.selectedReleaseIdfeature = 0;
        ctrl.uniquefeatureIds = [];
        ctrl.agileManagerUniqueIds = {
            releaseid: [],
            teamid: [],
            themeid: [],
            featureid: [],
            applicationid: [],
            sprintid: [],
            selectedreleaseId: '',
            selectedReleaseIdfeature: '',
            selectedteam: '',
            selectedtheme: '',
            selectedfeature: '',
            selectedapplication: '',
            selectedsprint: ''
        };
        ctrl.copyAgileManagerDetails = [];
        ctrl.copyagileManagerDetails = [];
        // ctrl.onChangeReleaseId = function (releaseId) {
        //     var arr = [];

        //     ctrl.agileManagerDetails[0].hpamBacklog.forEach((item, index) => {
        //         if (item.status == 'Done') {
        //             arr.push({ id: item.releaseid ? item.releaseid.id : null, status: 'Done' });
        //         }
        //         else if (item.status == 'new') {
        //             arr.push({ id: item.releaseid ? item.releaseid.id : null, status: 'new' });
        //         }
        //         else if (item.status == 'In Progress') {
        //             arr.push({ id: item.releaseid ? item.releaseid.id : null, status: 'Inprogress' })
        //         }

        //     });

        //     var result = { id: 0, new: 0, Done: 0, Inprogress: 0 };
        //     arr.forEach((item) => {
        //         if (item.id == releaseId) {
        //             result.id = releaseId;
        //             result[item.status] = result[item.status] + 1;
        //         }
        //     });

        //     ctrl.loadChart(result.Done, result.new, result.Inprogress);
        // }

        ctrl.GetFilterBy = function (filterBy, value) {

            var filtered = ctrl.agileManagerDetails[0].hpamFeature.filter(function (item) {
                if (item[filterBy] != null) {
                    return item[filterBy].id.toString().toLowerCase().indexOf(value) > -1;
                }
                else {
                    return null;
                }
            });
        }

        ctrl.DateAndRemainingSP = function () {
            var tdasp = [];
            var sd, ed;
            ctrl.agileManagerDetails[0].hpamRBurn.forEach((item) => {
                sd = item.startdate;
                ed = item.enddate;
                tdasp.push({ date: item.today, storypoints: item.remainingSP })

            })
            // console.log(sd)
            // console.log(ed)
            // console.log(tdasp)
            ctrl.loadlinechart(sd, ed, tdasp);

        }


        ctrl.GroupVelocity = function () {
            var dataList = [];
            ctrl.agileManagerDetails[0].hpamSprint.forEach((item) => {
                dataList.push({ spname: item.sprintname, donestorypoints: item.doneSP })
            })
            ctrl.loadgroupVelocityChart(dataList)
        }

        $scope.$on('eventEmitedName', function (event, data) {
            console.log('event fired');
        });

        function getRandomColorHex() {
            var hex = "0123456789ABCDEF",
                color = "#";
            for (var i = 1; i <= 6; i++) {
                color += hex[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        //  ctrl.loadChart = function (done, newvalue, inprogress) {
        //      var pieData = {
        //          labels: ["BackLogs(Done)", "BackLogs(New)", "BackLogs(WIP)"],
        //          datasets: [{
        //              data: [done, newvalue, inprogress],
        //              backgroundColor: ["#00ff00", "#878BB6", "#FF8153"]
        //          }]
        //      };

        //      // Get the context of the canvas element we want to select
        //      var piechart = document.getElementById("pie-chart").getContext("2d");
        //      new Chart(piechart, {
        //          type: 'pie',
        //          data: pieData
        //      });
        //  }
        ctrl.loadgroupVelocityChart = function (dataList) {
            let data = [];
            let lables = [];
            let avg = 0;
            let expectedVelosity =0;
            let count = 0
            dataList.forEach((item, index) => {
                data.push(item.donestorypoints);
                count = count + 1;
                avg = avg + item.donestorypoints;
                lables.push(item.spname);
            });

            avg = avg/count;
            var length = lables.length - 1
            var data2 = [];
            data2.push(expectedVelosity)
            
            for (var i = 0; i < length; i++) {
                data2.push(expectedVelosity);
            }

            var data3 = [];
            data3.push(avg)
            
            for (var i = 0; i < length; i++) {
                data3.push(avg);
            }

            var barchart = {
                labels: lables,
                datasets: [{
                    label: "StoryPoints",
                    type: 'bar',
                    fill: true,
                    data: data,
                    stack: 'Stack 0',
                    borderColor: '#AED6F1',
                    backgroundColor: '#AED6F1'
                    //backgroundColor: '#AED6F1'
                },{
                    label: "Expected Velocity",
                    type: 'bar',
                    fill: false,
                    stack: 'Stack 1',
                    borderColor: '#FF0000',
                    backgroundColor: '#FF0000',
                    data: data2
                },{
                    label: "Average Velocity",
                    type: 'line',
                    fill: false,
                    stack: 'Stack 1',
                    borderColor: '#FF0000',
                    backgroundColor: '#FF0000',
                    data: data3
                }],
            };

            var ctx = document.getElementById('myChart2').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: barchart,
                options: {

                    //to get sharp edges instead of smooth curves
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Group Velocity Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            stacked:true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Sprints'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            stacked:true,
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

        ctrl.loadlinechart = function (sd, ed, tdasp) {
            let data = [];
            let lables = [];
            lables.push(sd)
            tdasp.forEach((item, index) => {
                data.push(item.storypoints);
                lables.push(item.date);
            });
            lables.push(ed)

            var rsp = 11111;
            var length = lables.length - 1
            console.log(length)
            var lrsp = rsp / length
            var data2 = [];
            data2.push(rsp)
            for (var i = 0; i < length; i++) {
                rsp = rsp - lrsp;
                data2.push(parseInt(rsp));
            }
            //console.log(data2)
            //console.log(data)
            //console.log(lables)
            //var color = getRandomColorHex();
            //console.log(color)
            var linechartdata = {
                labels: lables,
                datasets: [{
                    label: "Remaining StoryPoints",
                    fill: false,
                    data: data,
                    borderColor: '#AED6F1',
                    backgroundColor: '#AED6F1'
                    //backgroundColor: '#AED6F1'
                }, {
                    label: "estimated Velocity",
                    fill: false,
                    borderColor: '#FF0000',
                    backgroundColor: '#FF0000',
                    data: data2
                }],
            };

            var ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: linechartdata,
                options: {

                    //to get sharp edges instead of smooth curves
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Release Burn Down Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        xAxes: [{
                            
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            display: true,
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

        ctrl.load = function () {

            //$scope.widgetConfig.options.workspaceid

            hpamData.details($scope.widgetConfig.componentId).
                then(function (data) {
                    ctrl.agileManagerDetails = angular.copy(data.data);
                    //ctrl.openStoryPoints = angular.copy(data.data)

                    //console.log(ctrl.openStoryPoints)
                    ctrl.copyAgileManagerDetails = angular.copy(data.data);
                    //ctrl.copyopenStoryPoints = angular.copy(data.data);

                    var filtered = ctrl.agileManagerDetails[0].hpamFeature.filter(function (item) {
                        return item.releaseid == $scope.widgetConfig.options.releaseid;
                    });

                    var filtered2 = ctrl.agileManagerDetails[0].hpamRelease.filter(function (item) {
                        return item.releaseid == $scope.widgetConfig.options.releaseid;
                    });

                    var filtered3 = ctrl.agileManagerDetails[0].hpamRBurn.filter(function (item) {
                        return item.releaseid == $scope.widgetConfig.options.releaseid;
                    });
                    var filtered4 = ctrl.agileManagerDetails[0].hpamSprint.filter(function (item) {
                        return item.releaseid == $scope.widgetConfig.options.releaseid;
                    });

                    // ctrl.teamfiltered = ctrl.agileManagerDetails[0].hpamTeam.filter(function (item) {
                    //     return item.workspaceid == $scope.widgetConfig.options.workspaceid;
                    // });

                    ctrl.agileManagerDetails[0].hpamFeature = angular.copy(filtered);
                    ctrl.agileManagerDetails[0].hpamRelease = angular.copy(filtered2)
                    ctrl.agileManagerDetails[0].hpamRBurn = angular.copy(filtered3)
                    ctrl.agileManagerDetails[0].hpamSprint = angular.copy(filtered4)

                    ctrl.copyAgileManagerDetails[0].hpamFeature = angular.copy(filtered);
                    ctrl.copyAgileManagerDetails[0].hpamRelease = angular.copy(filtered2)
                    // ctrl.uniqueReleaseIds = [...new Set(ctrl.agileManagerDetails[0].hpamBacklog.map(item => {
                    //     if (item.releaseid && item.releaseid.id) {
                    //         return item.releaseid.id;
                    //     }
                    // }
                    // ))];

                    //ctrl.agileManagerUniqueIds.releaseid = [...new Set(ctrl.agileManagerDetails[0].hpamFeature.map(item => item.releaseid ))];
                    // ctrl.agileManagerUniqueIds.teamid = [...new Set(ctrl.agileManagerDetails[0].hpamBacklog.map(item => {
                    //     if (item.teamid && item.teamid.id){
                    //         return item.teamid.id;
                    //     }
                    // }))];
                    // ctrl.agileManagerUniqueIds.themeid = [...new Set(ctrl.agileManagerDetails[0].hpamBacklog.map(item => {
                    //     if (item.themeid && item.themeid.id){
                    //         return item.themeid.id;
                    //     }
                    // } ))];
                    // ctrl.agileManagerUniqueIds.featureid = [...new Set(ctrl.agileManagerDetails[0].hpamBacklog.map(item => {
                    //     if (item.featureid && item.featureid.id){
                    //         return item.featureid.id;
                    //     }
                    // }))];
                    // ctrl.agileManagerUniqueIds.applicationid = [...new Set(ctrl.agileManagerDetails[0].hpamBacklog.map(item => {
                    //     if (item.applicationid && item.applicationid.id){
                    //         return item.applicationid.id;
                    //     }
                    // }
                    // ))];
                    // ctrl.agileManagerUniqueIds.sprintid = [...new Set(ctrl.agileManagerDetails[0].hpamBacklog.map(item => {
                    //     if (item.sprintid && item.sprintid.id){
                    //         return item.sprintid.id;
                    //     }
                    // }))];                    
                    ctrl.DateAndRemainingSP();
                    ctrl.GroupVelocity();
                });


        }

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
