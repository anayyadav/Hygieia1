(function () {
    'use strict';

    var widget_state,
        config = {
            view: {
                defaults: {
                    title: 'Defect' // widget title
                },
                controller: 'AgileManagerWidgetDViewController',
                controllerAs: 'agileManagerDView',
                templateUrl: 'components/widgets/agilemanagerdefect/view.html'
            },
            config: {
                controller: 'AgileManagerWidgetDConfigController',
                controllerAs: 'agilemanagerDConfig',
                templateUrl: 'components/widgets/agilemanagerdefect/config.html'
            },
           
            getState: getState,
            collectors: ['Story Cards']
        };

    angular
        .module(HygieiaConfig.module)
        .config(register);

    register.$inject = ['widgetManagerProvider', 'WidgetState'];
    function register(widgetManagerProvider, WidgetState) {
        widget_state = WidgetState;
        widgetManagerProvider.register('Defect', config);
    }

    function getState(widgetConfig) {
        // make sure config values are set
        return HygieiaConfig.local || widgetConfig.id ?
        widget_state.READY :
        widget_state.CONFIGURE;
    }
})();
