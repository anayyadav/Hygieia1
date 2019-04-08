(function () {
    'use strict';

    var widget_state,
        config = {
        view: {
            defaults: {
                title: 'Code Repo' // widget title
            },
            controller: 'RepomViewController',
            controllerAs: 'repomView',
            templateUrl: 'components/widgets/mendixteamserver/view.html'
        },
        config: {
            controller: 'RepomConfigController',
            controllerAs: 'repomConfig',
            templateUrl: 'components/widgets/mendixteamserver/config.html'
        },
        getState: getState
    };

    angular
        .module(HygieiaConfig.module)
        .config(register);

    register.$inject = ['widgetManagerProvider', 'WidgetState'];
    function register(widgetManagerProvider, WidgetState) {
        widget_state = WidgetState;
        widgetManagerProvider.register('mendixteamserver', config);
    }

    function getState(widgetConfig) {
        return HygieiaConfig.local || (widgetConfig.id) ? widget_state.READY : widget_state.CONFIGURE;
    }
})();
