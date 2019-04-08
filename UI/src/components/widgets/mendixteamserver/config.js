/**
 * Build widget configuration
 */
(function () {
    'use strict';
    angular
        .module(HygieiaConfig.module)
        .controller('RepomConfigController', RepomConfigController);
		RepomConfigController.$inject = ['modalData', '$scope', 'mendixData', '$uibModalInstance'];
    function RepomConfigController(modalData, $scope, mendixData, $uibModalInstance) {
        var ctrl = this,
        widgetConfig = modalData.widgetConfig;
        ctrl.selectappname = null;
        ctrl.mendixNuildUniqueIds = {
			appname: [],
			branchname: [],
			selectBranchname:'',
            selectappname:''
		};
		
		ctrl.allBranches = [];
		
		
		$scope.get = function (appName) {
            if (appName != null && appName != '') {

                var filteredreleaseiddata = [];

                if (null != ctrl.allBranches) {
                    ctrl.allBranches.forEach((item) => {
                        if (item.appname == appName) {
                            filteredreleaseiddata.push(item)
                        }
                    });

                    ctrl.mendixNuildUniqueIds.branchname = [...new Set(filteredreleaseiddata.map(item => item.branchname))];
                }
            }

		};
		
        ctrl.load = function () {
            mendixData.details(widgetConfig.options.id).
                then(function (data) {
					ctrl.mendixNuildUniqueIds.appname = [...new Set(data.data[0].teamserverApiRevisionDetail.map(item => item.appname))];
					ctrl.allBranches = data.data[0].teamserverApiRevisionDetail;
                    
                })
        };


        ctrl.submit = submitForm;


        function submitForm(valid, collector) {
            if (valid) {
                $scope.$emit('eventEmitedName');
                var form = document.buildConfigForm;
                var postObj = {
                    name: 'mendixteamserver',
                    options: {
                        id: widgetConfig.options.id,
						appname: ctrl.selectappname,
						branchname: ctrl.selectBranchname
                    },
                    componentId: modalData.dashboard.application.components[0].id
                };
                // pass this new config to the modal closing so it's saved
                $uibModalInstance.close(postObj);
            }
        }
    }
})();
