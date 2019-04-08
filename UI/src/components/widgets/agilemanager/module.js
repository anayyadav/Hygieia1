(function () {
    'use strict';

    var widget_state,
        config = {
            view: {
                defaults: {
                    title: 'Story Cards' // widget title
                },
                controller: 'AgileManagerWidgetViewController',
                controllerAs: 'agileManagerView',
                templateUrl: 'components/widgets/agilemanager/view.html'
            },
            config: {
                controller: 'AgileManagerWidgetConfigController',
                controllerAs: 'agilemanagerConfig',
                templateUrl: 'components/widgets/agilemanager/config.html'
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
        widgetManagerProvider.register('Story Cards', config);
    }

    function getState(widgetConfig) {
        // make sure config values are set
        return HygieiaConfig.local || widgetConfig.id ?
        widget_state.READY :
        widget_state.CONFIGURE;
    }
})();
