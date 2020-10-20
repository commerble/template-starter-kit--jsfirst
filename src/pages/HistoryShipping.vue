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
                <h2 class="is-size-4 mb-4">配送先の変更</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <form :action="action" method="post">
                    <input name="X-HTTP-Method-Override" type="hidden" value="put">

                    <div class="field is-horizontal" v-if="savedDestAddresses.length > 0">
                        <div class="field-label">
                            <label class="label">保存済み配送先</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select">
                                        <select name="DeliveryOrderAddress.AddressId" v-model="destAddress.AddressId" @change="selectDestAddress">
                                            <option value="0">新しく入力する</option>
                                            <option v-for="addr in savedDestAddresses" :key="addr.AddressId" :value="addr.AddressId" :selected="addr.AddressId == destAddress.AddressId">
                                                〒{{addr.ZipCode}} {{addr.Pref}}{{addr.City}}{{addr.Street}}{{addr.Building}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FieldPersonName label="氏名">
                        <template v-slot:lastname>
                            <input class="input" name="DeliveryOrderAddress.Recipientlastname" type="text" v-model="destAddress.Recipientlastname" required>
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="DeliveryOrderAddress.Recipientfirstname" type="text" v-model="destAddress.Recipientfirstname" required>
                        </template>
                    </FieldPersonName>

                    <FieldPersonName label="シメイ">
                        <template v-slot:lastname>
                            <input class="input" name="DeliveryOrderAddress.Recipientlastnamekana" type="text" v-model="destAddress.Recipientlastnamekana" required>
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="DeliveryOrderAddress.Recipientfirstnamekana" type="text" v-model="destAddress.Recipientfirstnamekana" required>
                        </template>
                    </FieldPersonName>
                    
                    <FieldInput label="郵便番号" name="DeliveryOrderAddress.ZipCode" type="tel" maxlength="7" v-model="destAddress.ZipCode" addon="検索" :loading="searchingDestZipCode" @click="searchZipCodeDest"></FieldInput>
                    
                    <FieldInput label="都道府県" name="DeliveryOrderAddress.Pref" maxlength="10" v-model="destAddress.Pref"></FieldInput>
                    
                    <FieldInput label="市区町村" name="DeliveryOrderAddress.City" maxlength="64" v-model="destAddress.City"></FieldInput>
                    
                    <FieldInput label="通り・丁目・番地・号" name="DeliveryOrderAddress.Street" maxlength="128" v-model="destAddress.Street"></FieldInput>
                    
                    <FieldInput label="建物・部屋番号" name="DeliveryOrderAddress.Building" maxlength="128" v-model="destAddress.Building"></FieldInput>
                    
                    <FieldInput label="電話番号" name="DeliveryOrderAddress.Tel" type="tel" maxlength="11" v-model="destAddress.Tel"></FieldInput>

                    <a :href="`${historyUrl}/${$route.params.orderId}`" class="button">戻る</a>
                    <button type="submit" name="shipping" value="shipping" class="button is-primary">変更する</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import FieldPersonName from '../components/FieldPersonName.vue'
import FieldInput from '../components/FieldInput.vue'
export default {
    components: {FieldPersonName, FieldInput},
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        data.destAddress.AddressId = 0
        return {
            ...data,
            searchingDestZipCode: false,
        }
    },
    methods: {
        async searchZipCode(zipcode) {
            const response = await fetch(href('~/Site/ZipCode/' + zipcode))
            if (!response.ok) {
                const text = await response.text()
                throw text
            }
            return await response.json()
        },
        async searchZipCodeDest() {
            try {
                this.searchingDestZipCode = true
                const addresses = await this.searchZipCode(this.destAddress.ZipCode)
                if (addresses.length > 0) {
                    const addr = addresses[0]
                    this.destAddress.Pref = addr.Prefecture
                    this.destAddress.City = addr.City
                    this.destAddress.Street = addr.Street
                }
            } finally {
                this.searchingDestZipCode = false;
            }
        },
        selectDestAddress() {
            if (this.destAddress.AddressId > 0) {
                const addr = this.savedDestAddresses.find(addr => addr.AddressId == this.destAddress.AddressId)
                if (addr) {
                    this.destAddress.ZipCode = addr.ZipCode
                    this.destAddress.Pref = addr.Pref
                    this.destAddress.City = addr.City
                    this.destAddress.Street = addr.Street
                    this.destAddress.Building = addr.Building
                    this.destAddress.Tel = addr.Tel
                    this.destAddress.Recipientlastname = addr.Recipientlastname
                    this.destAddress.Recipientfirstname = addr.Recipientfirstname
                    this.destAddress.Recipientlastnamekana = addr.Recipientlastnamekana
                    this.destAddress.Recipientfirstnamekana = addr.Recipientfirstnamekana
                }
            }
        }
    }
}
</script>