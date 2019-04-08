(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('AgmQualityViewController', AgmQualityViewController);

    AgmQualityViewController.$inject = ['$scope', 'hpamData', '$q', '$filter', '$uibModal'];
    function AgmQualityViewController($scope, hpamData, $q, $filter, $uibModal) {
        var ctrl = this;

        ctrl.agileManagerDetails = [];
        ctrl.copyagileManagerDetails = [];



        ctrl.pieOptions = {
            donut: true,
            donutWidth: 20,
            startAngle: 270,
            total: 200,
            showLabel: false
        };

        ctrl.minitabs = [
            { name: "Defect Rejection Ratio" },
            { name: "Defect Aging" },
            { name: "Defect Concentration" },
            { name: "Defect Slippage" }

        ];

        ctrl.miniWidgetView = ctrl.minitabs[0].name;
        ctrl.miniToggleView = function (index) {
            ctrl.miniWidgetView = typeof ctrl.minitabs[index] === 'undefined' ? ctrl.minitabs[0].name : ctrl.minitabs[index].name;
        };




        ctrl.load = function () {
            hpamData.details($scope.widgetConfig.componentId).
                then(function (data) {
                    ctrl.agileManagerDetails = angular.copy(data.data);
                    ctrl.copyAgileManagerDetails = angular.copy(data.data);

                    var filtered2 = ctrl.agileManagerDetails[0].hpamDefectRejection.filter(function (item) {
                        return item.workspaceid == $scope.widgetConfig.options.workspaceid;
                    });

                    var filtered3 = ctrl.agileManagerDetails[0].hpamDefectAgeing.filter(function (item) {
                        return item.workspaceid == $scope.widgetConfig.options.workspaceid;
                    });
                    var filtered4 = ctrl.agileManagerDetails[0].hpamDefectConcentration.filter(function (item) {
                        return item.workspaceid == $scope.widgetConfig.options.workspaceid;
                    });
                    ctrl.agileManagerDetails[0].hpamDefectRejection = angular.copy(filtered2);
                    ctrl.agileManagerDetails[0].hpamDefectAgeing = angular.copy(filtered3);
                    ctrl.agileManagerDetails[0].hpamDefectConcentration = angular.copy(filtered4);

                    ctrl.copyAgileManagerDetails[0].hpamDefectRejection = angular.copy(filtered2);
                    ctrl.copyAgileManagerDetails[0].hpamDefectAgeing = angular.copy(filtered3);
                    ctrl.copyAgileManagerDetails[0].hpamDefectConcentration = angular.copy(filtered4);
                   
                    ctrl.DefactRatio();
                    ctrl.DefactConcRatio();
                    //ctrl.DefactAgeing();
                });
        }

        ctrl.DefactAgeing = function () {
            var result = [];
            var backlogID = "";
            ctrl.agileManagerDetails[0].hpamDefectAgeing.forEach((item) => {
                backlogID = "backlogID-" + item.bid
                result.push({ bid: backlogID, dratio: item.activeday, status: item.status })

            })
            console.log(result);
            ctrl.loaddageingChart(result);
            
        }

        ctrl.loaddageingChart = function (result) {
            let n=[];
			let data =[];
            let open=[];
            let fixed=[];
            let proposeClose=[];
            let bid=[];
            let bid1 = [];
            let bid2=[];
            let bid3=[];
            let bid4=[];
            result.forEach((item, index) => {

                if(item.status == "New")
                {
                    n.push(item.dratio);
					open.push(0);
					fixed.push(0);
					proposeClose.push(0);
                    bid1.push(item.bid);
					
                }
                else if(item.status == "Open")
                {
                    open.push(item.dratio);
					n.push(0);
					fixed.push(0);
					proposeClose.push(0);
                    bid2.push(item.bid);
                }
                else if(item.status == "Fixed")
                {
					open.push(0);
					n.push(0);
					proposeClose.push(0);
                    fixed.push(item.dratio);
                    bid3.push(item.bid);
                }
                else if (item.status == "Propose Close")
                {
					n.push(0);
					open.push(0);
					fixed.push(0);
                    proposeClose.push(item.dratio);
                    bid4.push(item.bid);
                }
                
               
				
            });
			bid = bid1.concat(bid2.concat(bid3.concat(bid4)));
			console.log(bid);
			data  = n.concat(open.concat(fixed.concat(proposeClose)));
			console.log(data);


            var barchart2 = {
                labels: bid,
                datasets: [{
                    label: "New",
                    type: 'bar',
                    fill: true,
                    data: n,
                    stack: 'Stack 0',
                    borderColor: '#990000',
                    backgroundColor: '#990000'

                },
                {
                    label: "Open",
                    type: 'bar',
                    fill: true,
                    data: open,
                    stack: 'Stack 1',
                    borderColor: '#ff471a',
                    backgroundColor: '#ff471a'

                },
                {
                    label: "Fixed",
                    type: 'bar',
                    fill: true,
                    data: fixed,
                    stack: 'Stack 2',
                    borderColor: '#3d0099',
                    backgroundColor: '#3d0099'

                },{
                    label: "Propose close",
                    type: 'bar',
                    fill: true,
                    data: proposeClose,
                    stack: 'Stack 3',
                    borderColor: '#6495ed',
                    backgroundColor: '#6495ed'

                }
            ]
            };

            var ctx3 = document.getElementById('myChart12').getContext('2d');
            new Chart(ctx3, {
                type: 'bar',
                data: barchart2,
                options: {

                    //to get sharp edges instead of smooth curves
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Defect Open for more than 20 days'
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
                                labelString: 'Backlog ID'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Days'
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

        ctrl.DefactRatio = function () {
            var tdasp = [];
            var r, t;
            var ratio;
            ctrl.agileManagerDetails[0].hpamDefectRejection.forEach((item) => {
                r = item.rejected;
                t = item.total;
                ratio = 0;
                if (t != 0) {
                    ratio = (r / t) * 100;
                }

                tdasp.push({ app: item.appname, dratio: Math.round(ratio) })

            })
            ctrl.loaddratioChart(tdasp);
        }

        ctrl.loaddratioChart = function (tdasp) {
            let data = [];
            let data2 = [];
            let radius = [];
            let lables = [];
            tdasp.forEach((item, index) => {
                data.push(item.dratio);
                data2.push(5);
                radius.push(1);
                lables.push(item.app);
            });


            var barchart = {
                labels: lables,
                datasets: [{
                    label: "Defect Ratio",
                    type: 'bar',
                    fill: true,
                    data: data,
                    stack: 'Stack 0',
                    borderColor: '#6495ed',
                    backgroundColor: '#6495ed'

                }, {
                    label: "Average Ratio",
                    type: 'line',
                    fill: false,
                    stack: 'Stack 1',
                    borderColor: '#FFA500',
                    backgroundColor: '#FFA500',
                    borderDash: [2, 2],
                    pointRadius: radius,
                    data: data2
                }],
            };

           
            var ctx = document.getElementById('myChart3').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: barchart,
                options: {

                    //to get sharp edges instead of smooth curves
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Defect Rejection Percentage'
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
                                labelString: 'Application'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: '% defect rejected'
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

        ctrl.DefactConcRatio = function () {
            var output = [];
            var tDefect, tStoryP;
            var dCratio;
            ctrl.agileManagerDetails[0].hpamDefectConcentration.forEach((item) => {
                tDefect = item.tDefect;
                tStoryP = item.tStorypoints;
                dCratio = 0;
                if (tStoryP != 0) {
                    dCratio = (tDefect / tStoryP) * 100;
                }

                output.push({ app: item.appname, dcratio: Math.round(dCratio) })

            })
            ctrl.loadDconcChart(output);
        }

        ctrl.loadDconcChart = function (output) {
            let d1 = [];
            let d2 = [];
            let r = [];
            let l = [];
            output.forEach((item, index) => {
                d1.push(item.dcratio);
                d2.push(5);
                r.push(1);
                l.push(item.app);
            });


            var barchart1 = {
                labels: l,
                datasets: [{
                    label: "Defect Concentration Ratio",
                    type: 'bar',
                    fill: true,
                    data: d1,
                    stack: 'Stack 0',
                    borderColor: '#6495ed',
                    backgroundColor: '#6495ed'

                }, {
                    label: "Average Ratio",
                    type: 'line',
                    fill: false,
                    stack: 'Stack 1',
                    borderColor: '#FFA500',
                    backgroundColor: '#FFA500',
                    borderDash: [2, 2],
                    pointRadius: r,
                    data: d2
                }],
            };

            var ctx1 = document.getElementById('myChart4').getContext('2d');
            new Chart(ctx1, {
                type: 'bar',
                data: barchart1,
                options: {

                    //to get sharp edges instead of smooth curves
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Defect Concentration Ratio Chart'
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
                                labelString: 'Application'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Ratio Percent'
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

    }
})();