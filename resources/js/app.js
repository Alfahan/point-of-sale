import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress';

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            // Set Mixins
            .mixins({
                methods: {
                    // method "hasAnyPermission"

                    hasAnyPermission: function (permission) {
                        // get permissions from props
                        let allPermissions = this.$page.props.auth.permission;

                        let hasPermission = false;
                        permission.forEach(function(item){
                            if(allPermissions[item]) hasPermission = true ;
                        });

                        return hasPermission;
                    }
                },
            })
            .use(plugin)
            .mount(el)
    },
});

InertiaProgress.init()
