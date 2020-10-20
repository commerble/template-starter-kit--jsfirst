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
                        <li><a :href="noticeUrl">仮予約</a></li>
                        <li><a :href="favoriteUrl">お気に入り</a></li>
                        <li><a :href="addressesUrl">登録住所</a></li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <h2 class="is-size-4 mb-4">確認</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <p class="mb-2">仮予約をキャンセルしますか？</p>

                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <input name="X-HTTP-Method-Override" type="hidden" value="delete">

                    <article class="media mb-4">
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
                                </p>
                            </div>
                        </div>
                        <div class="media-right">
                            {{reserve.statusText}}
                        </div>
                    </article>
                    <article class="media">
                        <div class="media-content">
                            <p class="is-pulled-right">合計</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{reserve.subtotal.toLocaleString()}}</p>
                        </div>
                    </article>

                    <a class="button" :href="noticeUrl">いいえ</a>
                    <button class="button is-danger" type="submit">はい</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data,
        }
    }
}
</script>