(function () {
    'use strict';
    angular
        .module(HygieiaConfig.module)
        .controller('AgmQualityConfigController', AgmQualityConfigController);
        AgmQualityConfigController.$inject = ['modalData', '$scope', 'hpamData', '$uibModalInstance'];
    function AgmQualityConfigController(modalData, $scope, hpamData, $uibModalInstance) {
        var ctrl = this,
        widgetConfig = modalData.widgetConfig;
        ctrl.selectedworkspaceIds = null;
        ctrl.agileManagerUniqueIds = {
            workspaceid: [],
            selectedworkspaceIds: '',
            };
        


        ctrl.load = function () {
            hpamData.details(widgetConfig.options.id).
                then(function (data) {
                    ctrl.agileManagerUniqueIds.workspaceid = [...new Set(data.data[0].hpamDefectRejection.map(item => item.workspaceid))]; 
                    //ctrl.agileManagerUniqueIds.releaseid = [...new Set(data.data[0].hpamFeature.map(item => item.releaseid))];
                })
        };
                  

        ctrl.submit = submitForm;

        
        function submitForm(valid, collector) {
            if (valid) {
                $scope.$emit('eventEmitedName');
                var form = document.buildConfigForm;
                var postObj = {
                    name: 'AGM QUALITY',
                    options: {
                        id: widgetConfig.options.id,
                        workspaceid: ctrl.selectedworkspaceIds
                    },
                    componentId: modalData.dashboard.application.components[0].id
                };
                
                                
                // pass this new config to the modal closing so it's saved
                $uibModalInstance.close(postObj);
            }
        }
    }
})();