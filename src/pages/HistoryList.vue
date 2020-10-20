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
                <h2 class="is-size-4 mb-4">受注履歴</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div>

                <div class="box" v-for="history in list" :key="history.id">
                    <p>注文番号：{{history.id}}</p>
                    <p>注文日時：{{history.orderDate}}</p>
                    <p>ステータス：{{history.orderStatus}}</p>
                    <p>お支払合計：&yen; {{history.total.toLocaleString()}}</p>
                    <a class="button is-text" :href="`${historyUrl}/${history.id}`">詳細</a>
                    <Intersect @enter="loadLines(history)">
                        <div>
                            <article class="media mb-4" v-for="line of history.lines" :key="line.id">
                                <figure class="media-left">
                                    <p class="image is-64x64 is-rounded-1">
                                        <img :src="line.product.icon">
                                    </p>
                                </figure>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <router-link :to="`/item/${line.product.id}`">
                                                <strong>{{line.product.name}}</strong>
                                                <small v-if="line.product.color">{{line.product.color}}</small>
                                                <small v-if="line.product.size">{{line.product.size}}</small>
                                            </router-link>
                                            <br>
                                            &yen; {{line.unitPriceWithTax.toLocaleString()}}（税込） &times; {{line.qty}}個
                                        </p>
                                    </div>
                                </div>
                                <div class="media-right">
                                    &yen; {{line.linePrice.toLocaleString()}}（税込）
                                </div>
                            </article>
                        </div>
                    </Intersect>
                </div>
                    
                <p class="mb-4" v-if="list.length == 0">受注はありません</p>

                <Pagination :url="noticeUrl" :page="page" :last-page="lastPage"></Pagination>
            </div>
        </div>
    </main>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex'
import Intersect from 'vue-intersect'
import Pagination from '../components/Pagination.vue'
export default {
    components: { Intersect, Pagination },
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data,
        }
    },
    methods: {
        async loadLines(history) {
            if (history.lines.length > 0)
                return

            const response = await fetch(href(`~/order/history/${history.id}`), { headers: {'X-Template-Suffix': 'Json'} })
            if (response.ok && response.headers.get('content-type').includes('application/json')) {
                const data = await response.json()
                history.lines.push(...data)
            }
        }
    }
}
</script>