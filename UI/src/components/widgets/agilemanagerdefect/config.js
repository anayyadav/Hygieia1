(function () {
    'use strict';
    angular
        .module(HygieiaConfig.module)
        .controller('AgileManagerWidgetDConfigController', AgileManagerWidgetDConfigController);
    AgileManagerWidgetDConfigController.$inject = ['modalData', '$scope', 'hpamData', '$uibModalInstance'];
    function AgileManagerWidgetDConfigController(modalData, $scope, hpamData, $uibModalInstance) {
        var ctrl = this,
            widgetConfig = modalData.widgetConfig;
        ctrl.selectedworkspaceIds = null;
        ctrl.selectreleaseIds = null;
        ctrl.selectreleaseNames = null;
        ctrl.agileManagerUniqueIds = {
            releaseid: [],
            appID: [],
            selectreleaseIds: '',
            selectappIds: ''
        };

        ctrl.allApplications = [];

        $scope.get = function (rid) {
            if (rid != null && rid != '') {

             

                var filteredreleaseiddata = [];

                if (null != ctrl.allApplications) {
                    ctrl.allApplications.forEach((item) => {
                        if (item.releaseid == rid) {
                            filteredreleaseiddata.push(item)
                        }
                    });

                    ctrl.agileManagerUniqueIds.appID = [...new Set(filteredreleaseiddata.map(item => item.appID))];
                }
            }

        };

        ctrl.load = function () {
            hpamData.details(widgetConfig.options.id).
                then(function (data) {
                    //console.log(hpamData.details)
                    ctrl.agileManagerUniqueIds.releaseid = [...new Set(data.data[0].hpamDefectdata.map(item => item.releaseid))];

                    ctrl.allApplications = data.data[0].hpamDefectdata;

                })
        };





        ctrl.submit = submitForm;
        


        function submitForm(valid, collector) {
            if (valid) {
                $scope.$emit('eventEmitedName');
                var form = document.buildConfigForm;
                var postObj = {
                    name: 'agilemanager',
                    options: {
                        id: widgetConfig.options.id,
                        releaseid: ctrl.selectreleaseIds,
                        appID: ctrl.selectappIds
                    },
                    componentId: modalData.dashboard.application.components[0].id
                };

                // pass this new config to the modal closing so it's saved
                $uibModalInstance.close(postObj);
            }
        }

    }
})();
