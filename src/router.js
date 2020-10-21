import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from './pages/Page.vue'
import Error404Page from './pages/Error404.vue'

Vue.use(VueRouter)

export default function createRouter(store) {
    const router = new VueRouter({
        mode: 'history',
        base: window.href('~/'),
        routes: [
            { path: '/',                                    component: Page, meta: { layout: 'default', component: 'TopPage',  loadFavs: true } },
            { path: '/item/:id',                            component: Page, meta: { layout: 'default', component: 'ItemPage', loadFavs: true } },
            { path: '/site/guestorder/:id',                 component: Page, meta: { layout: 'simple',  component: 'LoginGuestPage',      pagedata: true } },
            { path: '/site/login',                          component: Page, meta: { layout: 'simple',  component: 'LoginPage',           pagedata: true } },
            { path: '/site/account',                        component: Page, meta: { layout: 'simple',  component: 'SignupPage',          pagedata: true } },
            { path: '/site/accountcomplete',                component: Page, meta: { layout: 'simple',  component: 'SignedupPage',        pagedata: true } },
            { path: '/site/recovery',                       component: Page, meta: { layout: 'simple',  component: 'RecoveryPage',        pagedata: true } },
            { path: '/site/recovery/:id',                   component: Page, meta: { layout: 'simple',  component: 'RecoveryUpdatePage',  pagedata: true } },
            { path: '/site/recoverycomplete',               component: Page, meta: { layout: 'simple',  component: 'RecoveryCompletePage',pagedata: true } },
            { path: '/purchase/:cartId/shipping',           component: Page, meta: { layout: 'simple',  component: 'ShippingPage',        pagedata: true } },
            { path: '/purchase/:cartId/payment',            component: Page, meta: { layout: 'simple',  component: 'PaymentPage',         pagedata: true } },
            { path: '/purchase/:cartId/confirm',            component: Page, meta: { layout: 'simple',  component: 'ConfirmPage',         pagedata: true } },
            { path: '/purchase/:cartId/external/:orderId',  component: Page, meta: { layout: 'simple',  component: 'ExternalPage',        pagedata: true } },
            { path: '/purchase/:cartId/complete/:orderId',  component: Page, meta: { layout: 'simple',  component: 'CompletePage',        pagedata: true } },
            { path: '/purchase/:cartId/error',              component: Page, meta: { layout: 'simple',  component: 'ErrorPurchasePage',   pagedata: true } },
            { path: '/member/index',                        component: Page, meta: { layout: 'default', component: 'MemberPage',          pagedata: true } },
            { path: '/member/account',                      component: Page, meta: { layout: 'default', component: 'AccountPage',         pagedata: true } },
            { path: '/member/accountaddress',               component: Page, meta: { layout: 'simple',  component: 'AccountAddressPage',  pagedata: true } },
            { path: '/member/username',                     component: Page, meta: { layout: 'simple',  component: 'UserNamePage',        pagedata: true } },
            { path: '/member/password',                     component: Page, meta: { layout: 'simple',  component: 'PasswordPage',        pagedata: true } },
            { path: '/member/point',                        component: Page, meta: { layout: 'default', component: 'PointPage',           pagedata: true } },
            { path: '/member/addresses',                    component: Page, meta: { layout: 'default', component: 'AddressListPage',     pagedata: true } },
            { path: '/member/addresses/:addressId',         component: Page, meta: { layout: 'simple',  component: 'AddressPage',         pagedata: true } },
            { path: '/member/createaddress',                component: Page, meta: { layout: 'simple',  component: 'AddressNewPage',      pagedata: true } },
            { path: '/member/quit',                         component: Page, meta: { layout: 'default', component: 'QuitPage',            pagedata: true } },
            { path: '/member/notices',                      component: Page, meta: { layout: 'default', component: 'NoticeListPage',      pagedata: true } },
            { path: '/member/notices/:reserveId',           component: Page, meta: { layout: 'simple',  component: 'NoticePage',          pagedata: true } },
            { path: '/member/createnotice',                 component: Page, meta: { layout: 'default', component: 'NoticeNewPage',       pagedata: true } },
            { path: '/member/favorites',                    component: Page, meta: { layout: 'default', component: 'FavoriteListPage',    pagedata: true } },
            { path: '/member/favorites/:productId',         component: Page, meta: { layout: 'simple',  component: 'FavoritePage',        pagedata: true } },
            { path: '/order/history',                       component: Page, meta: { layout: 'default', component: 'HistoryListPage',     pagedata: true } },
            { path: '/order/history/:orderId',              component: Page, meta: { layout: 'default', component: 'HistoryPage',         pagedata: true } },
            { path: '/order/historyshipping/:orderId',      component: Page, meta: { layout: 'simple',  component: 'HistoryShippingPage', pagedata: true } },
            { path: '/order/historycancel/:orderId',        component: Page, meta: { layout: 'simple',  component: 'HistoryCancelPage',   pagedata: true } },
            { path: '*',                                    component: Error404Page, meta: { layout: 'default' } },
        ],
        scrollBehavior (to, from, savedPosition) {
            return savedPosition ? savedPosition : { x: 0, y: 0 }
        }
    })

    router.beforeEach((to, from, next) => {
        if (to.matched.length > 0) {
            if (to.matched[0].meta.layout)
                store.commit('setLayout', to.matched[0].meta.layout)
            if (to.matched[0].meta.layout !== 'simple')
                store.dispatch('loadCartOnce')
            if (to.matched[0].meta.loadFavs === true)
                store.dispatch('loadFavsOnce')

            store.commit('closeModalCart')
        }
        next();
    })

    return router
}