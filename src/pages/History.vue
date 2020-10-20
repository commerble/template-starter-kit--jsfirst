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
            <div class="column" v-if="command=='customer'">
                <h2 class="is-size-4 mb-4">購入者情報の変更</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <form :action="action" method="post">
                    <input name="X-HTTP-Method-Override" type="hidden" value="put">

                    <p>〒 {{customerAddress.ZipCode}} {{customerAddress.Pref}} {{customerAddress.City}} {{customerAddress.Street}} {{customerAddress.Building}}</p>
                    <p>{{customerAddress.Recipientlastname}} {{customerAddress.Recipientfirstname}}</p>
                    <p>電話番号：{{customerAddress.Tel}}</p>
                    
                    <FieldInput label="メールアドレス" name="OrderCustomer.EmailAddr" type="email" v-model="customerEmail"></FieldInput>

                    <a :href="action" class="button">戻る</a>
                    <button type="submit" name="customer" value="customer" class="button is-primary">変更する</button>
                </form>
            </div>
            <div class="column" v-else-if="command=='delivery'">
                <h2 class="is-size-4 mb-4">配送オプションの変更</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <form :action="action" method="post">
                    <input name="X-HTTP-Method-Override" type="hidden" value="put">

                    <FieldSelect label="お届け日" name="DeliveryOrder.DeliveryDate" :items="selectableDeliveryDates" v-model="deliveryDate" v-if="canSpecifyDeliveryDate">
                        <option value="">最短でお届け</option>
                    </FieldSelect>

                    <FieldSelect label="お届け時間帯" name="DeliveryOrder.HourRange" :items="selectableDeliveryTimes" v-model="deliveryHourRange" v-if="canSpecifyDeliveryTime">
                        <option value="">最短でお届け</option>
                    </FieldSelect>
                    
                    <FieldRadio label="明細書への金額印字" name="DeliveryOrder.WrappingType" :items="selectableWrappingType" v-model="wrappingType"></FieldRadio>

                    <FieldInput label="明細書への金額印字 依頼主名" name="DeliveryOrder.SenderName" v-model="senderName"></FieldInput>

                    <a :href="action" class="button">戻る</a>
                    <button type="submit" name="delivery" value="delivery" class="button is-primary">変更する</button>
                </form>
            </div>
            <div class="column" v-else-if="command=='payment'">
                <h2 class="is-size-4 mb-4">支払い方法の変更</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <form :action="action" method="post">
                    <input name="X-HTTP-Method-Override" type="hidden" value="put">
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
                    <a :href="action" class="button">戻る</a>
                    <button type="submit" name="payment" value="payment" class="button is-primary">変更する</button>
                </form>
            </div>
            <div class="column" v-else>
                <h2 class="is-size-4 mb-4"># {{order.id}}</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 
                <div class="notification is-info is-light" v-if="hasChanges">受注変更は確定することで完了します。他の項目を編集後、確定ボタンを押してください。</div> 

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
                
                <h2 class="is-size-4 mt-6">適用キャンペーン</h2>
                <span class="tag is-info" v-for="campaign in order.campaigns" :key="campaign.id">{{campaign.name}}</span>
                
                <hr>
                <h2 class="is-size-4 mt-6">購入者情報</h2>
                <p>〒 {{order.destAddress.ZipCode}} {{order.destAddress.Pref}} {{order.destAddress.City}} {{order.destAddress.Street}} {{order.destAddress.Building}}</p>
                <p>{{order.destAddress.Recipientlastname}} {{order.destAddress.Recipientfirstname}}</p>
                <p>電話番号：{{order.destAddress.Tel}} <br> メールアドレス：{{order.customerEmail}}</p>
                <form :action="action" method="post">
                    <button class="button" type="submit" name="customer" value="customer" v-if="order.canModifyPaymentMethod">購入者情報の変更</button>
                    <p v-else>(変更は出来ません。)</p>
                </form>

                <h2 class="is-size-4 mt-6">配送先情報</h2>
                <p>〒 {{order.destAddress.ZipCode}} {{order.destAddress.Pref}} {{order.destAddress.City}} {{order.destAddress.Street}} {{order.destAddress.Building}}</p>
                <p>{{order.destAddress.Recipientlastname}} {{order.destAddress.Recipientfirstname}}</p>
                <p>電話番号：{{order.destAddress.Tel}}</p>
                <form :action="action" method="post">
                    <button class="button" type="submit" name="shipping" value="shipping" v-if="order.canModifyPaymentMethod">配送先の変更</button>
                    <p v-else>(変更は出来ません。)</p>
                </form>

                <h2 class="is-size-4 mt-6">配送オプション</h2>
                <p>配送日：{{order.deliveryDate}}</p>
                <p>配送時間帯：{{order.deliveryHourRange}}</p>
                <p>明細書への金額印字：{{order.wrappingType}}</p>
                <p>明細書の依頼主名：{{order.senderName}}</p>
                <form :action="action" method="post">
                    <button class="button" type="submit" name="delivery" value="delivery" v-if="order.canModifyPaymentMethod">配送オプションの変更</button>
                    <p v-else>(変更は出来ません。)</p>
                </form>

                <h2 class="is-size-4 mt-6">決済</h2>
                <p>決済方法：{{order.paymentMethod}}</p>
                <p>決済詳細：{{order.paymentDetail}}</p>
                <form :action="action" method="post">
                    <button class="button" type="submit" name="payment" value="payment" v-if="order.canModifyPaymentMethod">お支払方法の変更</button>
                    <p v-else>(変更は出来ません。)</p>
                </form>

                <hr>

                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <input name="X-HTTP-Method-Override" type="hidden" value="put">
                    <button class="button is-primary is-expanded mb-2" name="commit" value="commit" v-if="hasChanges && (order.canModify || order.canModifyPaymentMethod)">変更を確定</button>
                    <a :href="historyUrl" class="button is-expanded mb-2">一覧に戻る</a>
                    <a :href="cancelUrl" class="button is-text is-expanded mb-2" v-if="order.canCancel">注文キャンセル</a>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import FieldSelect from '../components/FieldSelect.vue'
import FieldRadio from '../components/FieldRadio.vue'
import FieldInput from '../components/FieldInput.vue'
export default {
    components: {FieldSelect, FieldRadio, FieldInput},
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data,
        }
    }
}
</script>