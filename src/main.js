import { createApp } from 'vue'
import VueGoogleMaps from "@fawmi/vue-google-maps";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from './App.vue'

createApp(App)
    .use(VueGoogleMaps, {
        load: {
            key: "google_map_api_key_here"
        }
    }).mount('#app')
