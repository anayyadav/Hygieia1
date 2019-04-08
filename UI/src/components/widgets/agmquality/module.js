(function () {
    'use strict';

    var widget_state,
        config = {
            view: {
                defaults: {
                    title: 'AGM Quality' // widget title
                },
                controller: 'AgmQualityViewController',
                controllerAs: 'qaWidget',
                templateUrl: 'components/widgets/agmquality/view.html'
            },
            config: {
                controller: 'AgmQualityConfigController',
                controllerAs: 'qaWidget',
                templateUrl: 'components/widgets/agmquality/config.html'
            },
            getState: getState,
            collectors: ['agmquality']
        };

    angular
        .module(HygieiaConfig.module)
        .config(register);

    register.$inject = ['widgetManagerProvider', 'WidgetState'];
    function register(widgetManagerProvider, WidgetState) {
        widget_state = WidgetState;
        widgetManagerProvider.register('AGM QUALITY', config);
    }

    function getState(widgetConfig) {
        // make sure config values are set
        return HygieiaConfig.local || (widgetConfig.id) ? widget_state.READY : widget_state.CONFIGURE;
    }
})();
