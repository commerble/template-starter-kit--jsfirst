<template>
    <component ref="page" :is="component" @error="handleError"></component>
</template>
<script>
import LoginPage from './Login.vue'
import LoginGuestPage from './LoginGuest.vue'
import SignupPage from './Signup.vue'
import SignedupPage from './Signedup.vue'
import RecoveryPage from './Recovery.vue'
import RecoveryUpdatePage from './RecoveryUpdate.vue'
import RecoveryCompletePage from './RecoveryComplete.vue'
import ShippingPage from './Shipping.vue'
import PaymentPage from './Payment.vue'
import ConfirmPage from './Confirm.vue'
import ExternalPage from './External.vue'
import CompletePage from './Complete.vue'
import MemberPage from './Member.vue'
import AccountPage from './Account.vue'
import AccountAddressPage from './AccountAddress.vue'
import UserNamePage from './UserName.vue'
import PasswordPage from './Password.vue'
import PointPage from './Point.vue'
import QuitPage from './Quit.vue'
import AddressListPage from './AddressList.vue'
import AddressNewPage from './AddressNew.vue'
import AddressPage from './Address.vue'
import NoticeListPage from './NoticeList.vue'
import NoticeNewPage from './NoticeNew.vue'
import NoticePage from './Notice.vue'
import FavoriteListPage from './FavoriteList.vue'
import FavoritePage from './Favorite.vue'
import HistoryListPage from './HistoryList.vue'
import HistoryPage from './History.vue'
import HistoryShippingPage from './HistoryShipping.vue'
import HistoryCancelPage from './HistoryCancel.vue'
import Error400Page from './Error400.vue'
import Error403Page from './Error403.vue'
import Error404Page from './Error404.vue'
import Error406Page from './Error406.vue'
import Error409Page from './Error409.vue'
import Error500Page from './Error500.vue'
import ErrorPurchasePage from './ErrorPurchase.vue'
import TopPage from './Top.vue'
import ItemPage from './Item.vue'
export default {
    components: {
        // Cart pages
        LoginPage, LoginGuestPage, SignupPage, SignedupPage, RecoveryPage, RecoveryUpdatePage, RecoveryCompletePage,
        ShippingPage, PaymentPage, ConfirmPage, ExternalPage, CompletePage, 
        MemberPage, AccountPage, AccountAddressPage, UserNamePage, PasswordPage, PointPage, QuitPage,
        AddressListPage, AddressNewPage, AddressPage,
        NoticeListPage, NoticeNewPage, NoticePage, 
        FavoriteListPage, FavoritePage,
        HistoryListPage, HistoryPage, HistoryShippingPage, HistoryCancelPage,
        // Error pages
        Error400Page, Error403Page, Error404Page, Error406Page, Error409Page, Error500Page, ErrorPurchasePage,
        // Front pages
        TopPage, ItemPage, 
    },
    data() {
        return {
            error: null,
        }
    },
    computed: {
        component() {
            if (this.error) {
                return this.error == 400 ? 'Error400Page'
                     : this.error == 403 ? 'Error403Page'
                     : this.error == 404 ? 'Error404Page'
                     : this.error == 406 ? 'Error406Page'
                     : this.error == 409 ? 'Error409Page'
                     : 'Error500Page'
            }
            
            if (this.$route.meta.pagedata === true) {
                const pagedata = document.getElementById('pagedata')
                if (pagedata == null) {
                    return 'Error404Page'
                }
                else if (pagedata.dataset.component) {
                    return pagedata.dataset.component
                }
            }

            return this.$route.meta.component
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.error = null
        next()
    },
    beforeRouteLeave(to, from, next) {
        this.error = null
        next()
    },
    methods: {
        handleError(error) {
            this.error = error
        }
    },
}
</script>