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

                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <input name="X-HTTP-Method-Override" type="hidden" value="delete">

                    <p>注文番号：{{order.id}}</p>
                    <p>注文日時：{{order.orderDate}}</p>
                    <p>ステータス：{{order.orderStatus}}</p>
                    <p>配送番号：{{order.deliveryNo}}</p>
                    <p>お支払合計：&yen; {{order.total.toLocaleString()}}</p>

                    <h2 class="is-size-4 mb-4">明細</h2>
                    
                    <article class="media" v-for="(item, index) in order.items" :key="index">
                        <figure class="media-left">
                            <p class="image is-64x64 is-rounded-1">
                                <img :src="item.icon">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{item.name}}</strong> 
                                    <small v-if="item.color">{{item.color}}</small>
                                    <small v-if="item.size">{{item.size}}</small>
                                    <br>
                                    &yen; {{item.unitPriceWithTax.toLocaleString()}}（税込） &times; {{item.qty}}個
                                </p>
                            </div>
                        </div>
                        <div class="media-right">
                            &yen; {{item.linePrice.toLocaleString()}}
                        </div>
                    </article>
                    <article class="media">
                        <div class="media-content">
                            <p class="is-pulled-right">小計</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{order.subtotal.toLocaleString()}}</p>
                        </div>
                    </article>
                    <article class="media">
                        <div class="media-content">
                            <p class="is-pulled-right">配送料</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{order.deliveryCharge.toLocaleString()}}</p>
                        </div>
                    </article>
                    <article class="media">
                        <div class="media-content">
                            <p class="is-pulled-right">決済手数料</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{order.paymentCharge.toLocaleString()}}</p>
                        </div>
                    </article>
                    <article class="media">
                        <div class="media-content">
                            <p class="is-pulled-right">総額</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{order.total.toLocaleString()}}</p>
                        </div>
                    </article>

                    <template v-if="order.canCancel">
                        <p class="mb-2">この注文をキャンセルしますか？</p>
                        <a class="button" :href="action">いいえ</a>
                        <button class="button is-danger" type="submit" name="commit" value="commit">はい</button>
                    </template>
                    <template v-else>
                        <p class="mb-2">配送作業が進んでいるためWEBではキャンセルできません。</p>
                        <a class="button" :href="action">戻る</a>
                    </template>
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