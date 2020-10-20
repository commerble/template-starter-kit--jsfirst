<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">カート</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <div class="field" v-if="canSpecifyDeliveryDate">
                        <label class="label">お届け日時</label>
                        <div class="control">
                            <div class="select">
                                <select name="DeliveryOrder.DeliveryDate" >
                                    <option value="">最短でお届け</option>
                                    <option v-for="date in selectableDeliveryDates" :key="date.Text" :value="date.Value">{{date.Text}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field" v-if="canSpecifyDeliveryTime">
                        <label class="label">お届け日時</label>
                        <div class="control">
                            <div class="select">
                                <select name="DeliveryOrder.HourRange">
                                    <option value="">最短でお届け</option>
                                    <option v-for="date in selectableDeliveryTimes" :key="date.Text" :value="date.Value">{{date.Text}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">明細書への金額印字</label>
                        <div class="control">
                            <label class="radio"><input type="radio" name="DeliveryOrder.WrappingType" value="2" v-model="wrappingType">金額印字する</label>
                            <label class="radio"><input type="radio" name="DeliveryOrder.WrappingType" value="1" v-model="wrappingType">金額印字しない</label>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">明細書への金額印字 依頼主名</label>
                        <div class="control">
                            <input class="input" name="DeliveryOrder.SenderName" v-model="senderName">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">ポイント利用 (保有ポイント{{activePoint}}pt)</label>
                        <div class="control">
                            <input class="input" name="InputUsagePoint" value="0" :max="pointMaxAmount" type="integer">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">支払い方法</label>
                        <div class="control">
                            <label class="radio" v-for="method in usablePaymentMethods" :key="method.Value">
                                <input type="radio" name="PaymentMethod" :value="method.Value" :disabled="method.Disabled" v-model="paymentMethod">{{method.Text}}
                            </label>
                        </div>
                    </div>
                    <template v-if="paymentMethod == 6">
                    <div class="field">
                        <label class="label">カード番号</label>
                        <div class="control">
                            <input type="text" maxlength="16" v-model="cardnumber">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">有効期限</label>
                        <div class="control">
                            <input type="month" v-model="cardexpiry">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">名義</label>
                        <div class="control">
                            <input type="text" v-model="cardholder">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">セキュリティーコード</label>
                        <div class="control">
                            <input type="text" maxlength="4" v-model="cardsec">
                        </div>
                    </div>
                    <input type="hidden" name="PaymentDetail" v-model="paymentDetail">
                    </template>
                    <div class="field" v-if="paymentMethod == 3">
                        <label class="label">コンビニ</label>
                        <div class="control">
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="seven" v-model="paymentDetail">セブンイレブン</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="familymart" v-model="paymentDetail">ファミリーマート</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="lawson" v-model="paymentDetail">ローソン</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="yamazaki" v-model="paymentDetail">デイリー</label>
                        </div>
                    </div>
                    <div class="field" v-if="paymentMethod == 100">
                        <label class="label">外部決済</label>
                        <div class="control">
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="card" v-model="paymentDetail">クレジットカード</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="cvs" v-model="paymentDetail">コンビニ</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="docomo" v-model="paymentDetail">Docomo</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="au" v-model="paymentDetail">au</label>
                            <label class="radio"><input type="radio" name="OrderCustomer.PaymentDetail" value="softbak" v-model="paymentDetail">SoftBank</label>
                        </div>
                    </div>
                    <button type="submit" class="button is-primary is-expanded">確認する</button>
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
            cardnumber: null,
            cardexpiry: null,
            cardholder: null,
            cardsec: null
        }
    },
    watch: {
        paymentMethod() {
            this.paymentDetail = null;
        }
    },
    methods: {
        
    }
}
</script>