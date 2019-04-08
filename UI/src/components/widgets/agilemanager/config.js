(function () {
    'use strict';
    angular
        .module(HygieiaConfig.module)
        .controller('AgileManagerWidgetConfigController', AgileManagerWidgetConfigController);
    AgileManagerWidgetConfigController.$inject = ['modalData', '$scope', 'hpamData', '$uibModalInstance'];
    function AgileManagerWidgetConfigController(modalData, $scope, hpamData, $uibModalInstance) {
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

                console.log(rid);

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
                    ctrl.agileManagerUniqueIds.releaseid = [...new Set(data.data[0].hpamRelease.map(item => item.releaseid))];

                    ctrl.allApplications = data.data[0].hpamRelease;

                    

                    // var filteredreleaseiddata=[];
                    //  var rid = $scope.get();
                    //  console.log(rid)
                    //   data.data[0].hpamRelease.forEach((item) => { 
                    //       if(item.releaseid == rid){
                    //           filteredreleaseiddata.push(item)
                    //   }});
                    //   //console.log(filteredreleaseiddata);
                    //  ctrl.agileManagerUniqueIds.appID = [...new Set(filteredreleaseiddata.map(item => item.appID))];
                    //   //console.log(ctrl.agileManagerUniqueIds.appID)
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
