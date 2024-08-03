import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores'; // Update this import based on your actual store location

// Assuming UsersTable, EditUser, KillSessions, AuditTable, and Audit are lazy-loaded components,
// if not, import them at the top like HomeView.
// Update import paths based on your project structure.

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/management/dashboard',
    },
    {
        path: '/management',
        name: 'home',
        components: {
            default: () => import('@/views/HomeView.vue'),
        },
        children: [
            {
                path: 'dashboard',
                components: {
                    management: () => import('@/views/stock/AboutView.vue'),
                },
            },
        ],
    },
    {
        path: '/management/login',
        name: 'login',
        components: {
            default: () => import('@/views/stock/LoginView.vue'),
        },
    },
    {
        path: '/management/edit-user/:userId',
        name: 'edit-user',
        component: () => import('@/views/stock/EditUser.vue'), // Lazy-load the component
    },
    {
        path: '/management/kill-sessions',
        name: 'kill-sessions',
        component: () => import('@/views/stock/KillSessions.vue'), // Lazy-load the component
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/stock/AboutView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to) => {
    const publicPages = ['/management/login'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.jwt) {
        authStore.returnUrl = to.fullPath;
        return '/management/login';
    }
});

export default router;