<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">カート</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 

                <h2 class="is-size-4 mb-4">カートの中身</h2>
                
                <article class="media" v-for="(item, index) in items" :key="index">
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
                        <p class="is-pulled-right">&yen; {{subtotal.toLocaleString()}}</p>
                    </div>
                </article>
                <article class="media">
                    <div class="media-content">
                        <p class="is-pulled-right">配送料</p>
                    </div>
                    <div class="media-right">
                        <p class="is-pulled-right">&yen; {{deliveryCharge.toLocaleString()}}</p>
                    </div>
                </article>
                <article class="media">
                    <div class="media-content">
                        <p class="is-pulled-right">決済手数料</p>
                    </div>
                    <div class="media-right">
                        <p class="is-pulled-right">&yen; {{paymentCharge.toLocaleString()}}</p>
                    </div>
                </article>
                <article class="media">
                    <div class="media-content">
                        <p class="is-pulled-right">総額</p>
                    </div>
                    <div class="media-right">
                        <p class="is-pulled-right">&yen; {{total.toLocaleString()}}</p>
                    </div>
                </article>
                
                <h2 class="is-size-4 mt-6">適用キャンペーン</h2>
                <span class="tag is-info" v-for="campaign in campaigns" :key="campaign.id">{{campaign.name}}</span>
                
                <hr>
                <h2 class="is-size-4 mt-6">購入者情報</h2>
                <p>〒 {{customerAddress.ZipCode}} {{customerAddress.Pref}} {{customerAddress.City}} {{customerAddress.Street}} {{customerAddress.Building}}</p>
                <p>{{customerAddress.Recipientlastname}} {{customerAddress.Recipientfirstname}}</p>
                <p>電話番号：{{customerAddress.Tel}}  <br> メールアドレス：{{customerEmail}}</p>

                <h2 class="is-size-4 mt-6">配送先情報</h2>
                <p>〒 {{destAddress.ZipCode}} {{destAddress.Pref}} {{destAddress.City}} {{destAddress.Street}} {{destAddress.Building}}</p>
                <p>{{destAddress.Recipientlastname}} {{destAddress.Recipientfirstname}}</p>
                <p>電話番号：{{destAddress.Tel}}</p>

                <h2 class="is-size-4 mt-6">配送オプション</h2>
                <p>配送日：{{deliveryDate}}</p>
                <p>配送時間帯：{{deliveryHourRange}}</p>
                <p>明細書への金額印字：{{wrappingType}}</p>
                <p>明細書の依頼主名：{{senderName}}</p>

                <h2 class="is-size-4 mt-6">決済</h2>nu74545
                <p>決済方法：{{paymentMethod}}</p>
                <p>決済詳細：{{paymentDetail}}</p>

                <hr>

                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <button type="submit" class="button is-primary is-expanded mb-2">確定</button>
                    <a :href="back" class="button is-expanded">戻る</a>
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