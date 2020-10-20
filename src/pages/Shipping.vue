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
                    <h2 class="is-size-4">購入者情報</h2>

                    <FieldPersonName label="氏名">
                        <template v-slot:lastname>
                            <input class="input" name="OrderCustomerOrderedAddress.Recipientlastname" type="text" v-model="customerAddress.Recipientlastname" required>
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="OrderCustomerOrderedAddress.Recipientfirstname" type="text" v-model="customerAddress.Recipientfirstname" required>
                        </template>
                    </FieldPersonName>

                    <FieldPersonName label="シメイ">
                        <template v-slot:lastname>
                            <input class="input" name="OrderCustomerOrderedAddress.Recipientlastnamekana" type="text" v-model="customerAddress.Recipientlastnamekana" required>
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="OrderCustomerOrderedAddress.Recipientfirstnamekana" type="text" v-model="customerAddress.Recipientfirstnamekana" required>
                        </template>
                    </FieldPersonName>
                    
                    <FieldInput label="郵便番号" name="OrderCustomerOrderedAddress.ZipCode" type="tel" maxlength="7" v-model="customerAddress.ZipCode" addon="検索" :loading="searchingCustomerZipCode" @click="searchZipCodeCustomer"></FieldInput>
                    
                    <FieldInput label="都道府県" name="OrderCustomerOrderedAddress.Pref" maxlength="10" v-model="customerAddress.Pref"></FieldInput>
                    
                    <FieldInput label="市区町村" name="OrderCustomerOrderedAddress.City" maxlength="64" v-model="customerAddress.City"></FieldInput>
                    
                    <FieldInput label="通り・丁目・番地・号" name="OrderCustomerOrderedAddress.Street" maxlength="128" v-model="customerAddress.Street"></FieldInput>
                    
                    <FieldInput label="建物・部屋番号" name="OrderCustomerOrderedAddress.Building" maxlength="128" v-model="customerAddress.Building"></FieldInput>
                    
                    <FieldInput label="電話番号" name="OrderCustomerOrderedAddress.Tel" type="tel" maxlength="11" v-model="customerAddress.Tel"></FieldInput>
                    
                    <FieldInput label="メールアドレス" name="Customer.EmailAddr" type="email" v-model="customerEmail"></FieldInput>
                    

                    <template v-if="!inputDest">
                        <button type="submit" class="button is-primary is-expanded mb-2" name="next_copy" value="next_copy">購入者住所に配送する</button>
                        <a type="button" class="button is-expanded mb-2" @click="inputDest=true">別に配送先を指定する</a>
                    </template>

                    <template v-if="inputDest">
                    <h2 class="is-size-4">配送先情報</h2>
                    
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
                    
                    <button type="submit" class="button is-primary is-expanded mb-2" name="next" value="next">指定住所に配送する</button>
                    <button type="submit" class="button is-expanded mb-2" name="next_copy" value="next_copy">購入者住所に配送する</button>
                    </template>
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
        return {
            ...data,
            searchingCustomerZipCode: false,
            searchingDestZipCode: false,
            inputDest: data.destAddress.ZipCode != null
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
        async searchZipCodeCustomer() {
            try {
                this.searchingCustomerZipCode = true
                const addresses = await this.searchZipCode(this.customerAddress.ZipCode)
                if (addresses.length > 0) {
                    const addr = addresses[0]
                    this.customerAddress.Pref = addr.Prefecture
                    this.customerAddress.City = addr.City
                    this.customerAddress.Street = addr.Street
                }
            } finally {
                this.searchingCustomerZipCode = false;
            }
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