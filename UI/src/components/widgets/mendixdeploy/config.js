(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('deploymConfigController', deploymConfigController);

    deploymConfigController.$inject = ['modalData', 'mendixData', '$uibModalInstance', '$scope'];
  
    function deploymConfigController(modalData, mendixData, $uibModalInstance, $scope) {

        var ctrl = this,
        widgetConfig = modalData.widgetConfig;
        ctrl.selectappname = null;
        ctrl.mendixNuildUniqueIds = {
            appname: [],
            selectappname: ''
        };
        
        ctrl.load = function () {
            mendixData.details(widgetConfig.options.id).
                then(function (data) {
                    ctrl.mendixNuildUniqueIds.appname = [...new Set(data.data[0].deployApiDetail.map(item => item.appname))];
                    
                })
        };


        ctrl.submit = submitForm;


        function submitForm(valid, collector) {
            if (valid) {
                $scope.$emit('eventEmitedName');
                var form = document.buildConfigForm;
                var postObj = {
                    name: 'mendixdeploy',
                    options: {
                        id: widgetConfig.options.id,
                        appname: ctrl.selectappname
                    },
                    componentId: modalData.dashboard.application.components[0].id
                };
                // pass this new config to the modal closing so it's saved
                $uibModalInstance.close(postObj);
            }
        }
    }
})();
