<template>
    <main class="container p-3">
        <div class="columns">
            <div class="column is-3">
                <h2 class="is-size-4 mb-4">マイページ</h2>
                <aside class="menu">
                    <ul class="item-list">
                        <li><a :href="accountUrl">会員情報</a></li>
                        <li><a :href="pointUrl">ポイント</a></li>
                        <li><a :href="passwordUrl">パスワード</a></li>
                        <li><a :href="quitUrl" class="is-active">退会</a></li>
                        <li><a :href="historyUrl">受注履歴</a></li>
                        <li><a :href="noticeUrl">仮予約</a></li>
                        <li><a :href="favoriteUrl">お気に入り</a></li>
                        <li><a :href="addressesUrl">登録住所</a></li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <h2 class="is-size-4 mb-4">お気に入り</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div>

                <form>
                    <article class="media mb-4" v-for="fav in list" :key="fav.id">
                        <figure class="media-left">
                            <p class="image is-64x64 is-rounded-1">
                                <img :src="fav.product.icon">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <router-link :to="`/item/${fav.product.id}`">
                                        <strong>{{fav.product.name}}</strong>
                                        <small v-if="fav.product.color">{{fav.product.color}}</small>
                                        <small v-if="fav.product.size">{{fav.product.size}}</small>
                                    </router-link>
                                    <br>
                                    &yen; {{fav.product.unitPriceWithTax.toLocaleString()}}（税込）
                                    <br>
                                    <a :href="`${favoriteUrl}/${fav.product.id}`" class="button is-text is-small">登録解除</a>
                                </p>
                            </div>
                        </div>
                        <div class="media-right">
                            <button class="button" disabled v-if="existsInCart(fav.product.id)">カートイン済</button>
                            <div class="field has-addons" v-else>
                                <div class="control">
                                    <div class="select">
                                        <select v-model="fav.qty">
                                            <option v-for="i in [1,2,3,4,5,6,7,8,9,10]" :key="i">{{i}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control">
                                    <button class="button is-primary" @click="cartin(fav)">カートイン</button>
                                </div>
                            </div>
                        </div>
                    </article>
                    <p class="mb-4" v-if="list.length == 0">登録されているお気に入りはありません。</p>

                    <Pagination :url="favoriteUrl" :page="page" :last-page="lastPage"></Pagination>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue'
export default {
    components: { Pagination },
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data,
        }
    },
    computed: {
        ...mapGetters(['existsInCart'])
    },
    methods: {
        ...mapActions(['appendCartItem']),
        cartin(reserve) {
            this.appendCartItem({
                id: reserve.product.id, 
                name: reserve.product.name, 
                color: reserve.product.color, 
                size: reserve.product.size, 
                icon: reserve.product.icon, 
                unitPriceWithTax: reserve.product.unitPriceWithTax, 
                qty: reserve.qty,
            })
        }
    }
}
</script>