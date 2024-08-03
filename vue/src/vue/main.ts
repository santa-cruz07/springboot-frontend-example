// @ts-nocheck
import App from './App.vue'
import {createApp} from 'vue'
import router from './router'
import {createPinia} from "pinia";

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.scss';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import TabMenu from 'primevue/tabmenu';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button"
import Password from "primevue/password"
import Dialog from "primevue/dialog";
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';
import '@/assets/table.css';
import ToastService from 'primevue/toastservice';
import mitt from 'mitt';
import PrimeNavigation from "@/components/PrimeNavigation.vue";


export const emitter = mitt();

async function initializeApp() {

    const app = createApp(App);

    // Use plugins and other setups
    app.use(createPinia());

    app.use(PrimeVue)

    app.use(VueDiff);
    app.use(ToastService);

    app.component('PrimeNavigation', PrimeNavigation);
    app.component('Menubar', Menubar)
    app.component('Menu', Menu)
    app.component('InputText', InputText)
    app.component('TabMenu', TabMenu)
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('Button', Button);
    app.component('Password', Password);
    app.component('Dialog', Dialog);


    app.use(router)
    // Mount app
    app.mount("#app");
}

// Initialize the app
initializeApp().catch((err) => {
    console.error("Failed to initialize app:", err);
});
