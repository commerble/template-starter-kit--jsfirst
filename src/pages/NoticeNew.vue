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
                        <li><a :href="quitUrl">退会</a></li>
                        <li><a :href="historyUrl">受注履歴</a></li>
                        <li><a :href="noticeUrl" class="is-active">仮予約</a></li>
                        <li><a :href="favoriteUrl">お気に入り</a></li>
                        <li><a :href="addressesUrl">登録住所</a></li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <h2 class="is-size-4 mb-4">お届け先リスト</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">

                    <article class="media mb-4">
                        <figure class="media-left">
                            <p class="image is-64x64 is-rounded-1">
                                <img :src="notice.product.icon">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <router-link :to="`/item/${notice.product.id}`">
                                        <strong>{{notice.product.name}}</strong>
                                        <small v-if="notice.product.color">{{notice.product.color}}</small>
                                        <small v-if="notice.product.size">{{notice.product.size}}</small>
                                    </router-link>
                                    <br>
                                    &yen; {{notice.product.unitPriceWithTax.toLocaleString()}}（税込） &times; {{notice.qty}}個
                                </p>
                            </div>
                        </div>
                    </article>
                    <article class="media  is-align-center">
                        <div class="media-left">
                            <div class="field has-addons">
                                <div class="control">
                                    <div class="select">
                                        <select name="RequestAmount">
                                            <option v-for="item in selectableAmounts" :key="item.Value" :selected="item.Value == notice.qty.toString()">{{item.Value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control"> 
                                    <button class="button" name="recalc" value="recalc">再計算</button>
                                </div>
                            </div>
                        </div>
                        <div class="media-content">
                            <p class="is-pulled-right">合計</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{notice.subtotal.toLocaleString()}}</p>
                        </div>
                    </article>
                    
                    <hr>

                    <button class="button is-primary" name="commit" value="commit">登録</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import FieldInput from '../components/FieldInput.vue'
import FieldPersonName from '../components/FieldPersonName.vue'
export default {
    components: {FieldInput, FieldPersonName},
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data
        }
    },
    methods: {
        itemUrl(id) {
            return href(`~/item/${id}`)
        }
    }
}
</script>