<template>
    <div class="app">
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand is-expanded">
                <router-link class="navbar-item" to="/">
                    <img src="https://via.placeholder.com/112x28?text=LOGO" width="112" height="28">
                </router-link>
                <a class="navbar-item ml-auto" :href="mypageUrl">
                    <span class="icon mr-1">
                        <font-awesome-icon icon="user"></font-awesome-icon>
                    </span>
                    マイページ
                </a>
                <a class="navbar-item" :href="mypageUrl">
                    <span class="icon mr-1">
                        <font-awesome-icon icon="heart"></font-awesome-icon>
                    </span>
                    お気に入り
                </a>
                <button class="button is-primary is-hidden-touch m-2" @click="openModalCart" v-if="layout!='simple'">
                    <span class="icon">
                        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                    </span>
                </button>
            </div>
        </nav>
        <router-view></router-view>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>&copy; Commerble Inc.</p>
            </div>
        </footer>
        <mini-cart class="is-hidden-desktop has-background-white" v-if="layout!='simple'"></mini-cart>
        <modal-cart></modal-cart>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import MiniCart from './components/MiniCart.vue'
import ModalCart from './components/ModalCart.vue'
export default {
    components: {
        MiniCart,
        ModalCart,
    },
    computed: {
        ...mapState(['layout']),
        mypageUrl() {
            return href('~/Member/Index')
        },
        myfavoritesUrl() {
            return href('~/Member/Favorites')
        }
    },
    methods: {
        ...mapActions(['openModalCart'])
    }
}
</script>