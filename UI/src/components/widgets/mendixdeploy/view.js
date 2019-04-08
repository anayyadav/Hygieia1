(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('deploymViewController', deploymViewController);

    deploymViewController.$inject = ['$scope', 'DashStatus', 'mendixData', 'DisplayState', '$q', '$uibModal'];
    function deploymViewController($scope, DashStatus, mendixData, DisplayState, $q, $uibModal) {
        /*jshint validthis:true */
        var ctrl = this;
		var deployData =[];
        // public variables
        ctrl.environments = [];
        ctrl.statuses = DashStatus;
        // ctrl.ignoreEnvironmentFailuresRegex=/^$/;
        // if ($scope.widgetConfig.options.ignoreRegex !== undefined && $scope.widgetConfig.options.ignoreRegex !== null && $scope.widgetConfig.options.
// ignoreRegex !== '') {
            // ctrl.ignoreEnvironmentFailuresRegex=new RegExp($scope.widgetConfig.options.ignoreRegex.replace(/^"(.*)"$/, '$1'));
        // }

        ctrl.load = load;
        ctrl.showDetail = showDetail;

        function load() {
            var deferred = $q.defer();
            mendixData.details($scope.widgetConfig.componentId).then(function(data) {
				deployData = data.data[0].deployApiDetail.filter(function (item) {
                    return item.appname == $scope.widgetConfig.options.appname;
                });
                processResponse(deployData);
                deferred.resolve(data.lastUpdated);
            });
            return deferred.promise;
        }

        function showDetail(environment) {
            $uibModal.open({
                controller: 'DeployDetailController',
                controllerAs: 'detail',
                templateUrl: 'components/widgets/deploy/detail.html',
                size: 'lg',
                resolve: {
                    environment: function() {
                        return environment;
                    },
                    collectorName: function () {
                        return $scope.dashboard.application.components[0].collectorItems.Deployment[0].collector.name;
                    },
                    collectorNiceName: function () {
                        return $scope.dashboard.application.components[0].collectorItems.Deployment[0].niceName;
                    }
                }
            });
        }

        function processResponse(data) {
            var worker = {
                getEnvironments: getEnvironments,
                getIsDefaultState: getIsDefaultState
            };
            
            // var ignoreEnvironmentFailuresRegex = ctrl.ignoreEnvironmentFailuresRegex;
            
            // function ignoreEnvironmentFailures(environment) {
            	// return ignoreEnvironmentFailuresRegex.test(environment.name);
            // }

            function getIsDefaultState(data, cb) {
                var isDefaultState = true;
                _(data).forEach(function (environment) {
                    var offlineUnits = _(environment.units).filter({'deployed': false}).value().length;
				
                    if(environment.units && environment.units.length == offlineUnits
                    		&& !ignoreEnvironmentFailures(environment)) {
                        isDefaultState = false;
                    }
                });

                cb(isDefaultState);
            }

            function getEnvironments(data, cb) {
                var environments = _(data).map(function (item) {

                    return {
                        name: item.name,
                        url: item.url,
                        units: item.units,
                        serverUpCount: getServerOnlineCount(item.units, true),
                        serverDownCount: getServerOnlineCount(item.units, false),
                        failedComponents: getFailedComponentCount(item.units)
                        // ignoreFailure: ignoreEnvironmentFailures(item)
                        // lastUpdated: getLatestUpdate(item.units)
                    };

                    function getFailedComponentCount(units) {
                        return _(units).filter({'deployed':false}).value().length;
                    }

                    function getServerOnlineCount(units, isOnline) {
						console.log(units)
                        var total = 0;
                        _(units).forEach(function (unit) {
                            total += _(unit.server).filter({'online':isOnline})
                                .value()
                                .length;
                        });
						
                        return total;
                    }

                    
                }).value();

                cb({
                    environments: environments
                });
            }

            worker.getIsDefaultState(data, defaultStateCallback);
            worker.getEnvironments(data, environmentsCallback);
        }

        function defaultStateCallback(isDefaultState) {
            //$scope.$apply(function() {
                $scope.display = isDefaultState ? DisplayState.DEFAULT : DisplayState.ERROR;
            //});
        }

        function environmentsCallback(data) {
            //$scope.$apply(function () {
                ctrl.environments = data.environments;
            //});
        }
    }
})();
