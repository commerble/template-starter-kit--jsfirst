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
                <h2 class="is-size-4 mb-4">仮予約</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div>

                <form>
                    <article class="media mb-4" v-for="reserve in list" :key="reserve.id">
                        <figure class="media-left">
                            <p class="image is-64x64 is-rounded-1">
                                <img :src="reserve.product.icon">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <router-link :to="`/item/${reserve.product.id}`">
                                        <strong>{{reserve.product.name}}</strong>
                                        <small v-if="reserve.product.color">{{reserve.product.color}}</small>
                                        <small v-if="reserve.product.size">{{reserve.product.size}}</small>
                                    </router-link>
                                    <br>
                                    &yen; {{reserve.product.unitPriceWithTax.toLocaleString()}}（税込） &times; {{reserve.qty}}個
                                    <br>
                                    <template v-if="reserve.canCartIn">
                                        <button class="button is-small" disabled v-if="existsInCartReserve(reserve.id)">カートイン済</button>
                                        <button class="button is-primary is-small" v-else @click="cartin(reserve)">カートイン</button>
                                    </template>
                                    <a :href="`${noticeUrl}/${reserve.id}`" class="button is-text is-small" v-if="reserve.canCancel">キャンセル</a>
                                </p>
                            </div>
                        </div>
                        <div class="media-right">
                            {{reserve.statusText}}
                        </div>
                    </article>
                    <p class="mb-4" v-if="list.length == 0">登録されている仮予約商品はありません。</p>

                    <Pagination :url="noticeUrl" :page="page" :last-page="lastPage"></Pagination>
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
        ...mapGetters(['existsInCartReserve'])
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
                reserve: reserve.id 
            })
        }
    }
}
</script>