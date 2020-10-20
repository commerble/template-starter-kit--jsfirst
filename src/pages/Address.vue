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
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 

                <h2 class="is-size-4 mb-4">お届け先リスト</h2>

                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">

                    <FieldInput label="登録名" name="AddressName" maxlength="10" v-model="address.AddressName" required></FieldInput>

                    <FieldPersonName label="氏名">
                        <template v-slot:lastname>
                            <input class="input" name="Address.Recipientlastname" type="text" v-model="address.Address.Recipientlastname" required  
                                pattern="^[\u3040-\u30FF|\u4E00-\u9FFF|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]+$" 
                                title="ひらがな、カタカタ、漢字、全角英数字、－―ー‐ヽヾゝゞ〃仝々〆〇 のみ使用可能です。">
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="Address.Recipientfirstname" type="text" v-model="address.Address.Recipientfirstname" required  
                                    pattern="^[\u3040-\u30FF|\u4E00-\u9FFF|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]+$" 
                                    title="ひらがな、カタカタ、漢字、全角英数字、－―ー‐ヽヾゝゞ〃仝々〆〇 のみ使用可能です。">
                        </template>
                    </FieldPersonName>

                    <FieldPersonName label="シメイ">
                        <template v-slot:lastname>
                            <input class="input" name="Address.Recipientlastnamekana" type="text" v-model="address.Address.Recipientlastnamekana" required  
                                    pattern="^[\u30A2-\u30FD]+$" 
                                    title="カタカタのみ使用可能です。">
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="Address.Recipientfirstnamekana" type="text" v-model="address.Address.Recipientfirstnamekana" required  
                                    pattern="^[\u30A2-\u30FD]+$" 
                                    title="カタカタのみ使用可能です。">
                        </template>
                    </FieldPersonName>
                    
                    <FieldInput label="郵便番号" name="Address.ZipCode" type="tel" maxlength="7" size="7" v-model="address.Address.ZipCode" required addon="検索" :loading="searchingZipCode" @click="searchZipCode"></FieldInput>

                    <FieldInput label="都道府県" name="Address.Pref" type="text" maxlength="10" size="10" v-model="address.Address.Pref" required></FieldInput>
                    
                    <FieldInput label="市区町村" name="Address.City" type="text" maxlength="128" size="10" v-model="address.Address.City" required></FieldInput>
                    
                    <FieldInput label="通り・丁目・番地・号" name="Address.Street" type="text" maxlength="128" size="10" v-model="address.Address.Street"></FieldInput>
                    
                    <FieldInput label="建物名・部屋番号" name="Address.Building" type="text" maxlength="128" size="10" v-model="address.Address.Building"></FieldInput>
                    
                    <FieldInput label="電話番号" name="Address.Tel" type="text" maxlength="11" size="10" v-model="address.Address.Tel" required></FieldInput>

                    <button class="button is-primary" name="update" value="update">更新</button>
                    <button class="button is-text" name="delete" value="delete">削除</button>
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
            ...data,
            searchingZipCode: false
        }
    },
    methods: {
        async searchZipCode() {
            this.searchingZipCode = true
            const response = await fetch(href('~/Site/ZipCode/' + this.address.Address.ZipCode))
            if (!response.ok) {
                const text = await response.text()
                throw text
            }
            this.searchingZipCode = false
            const addresses = await response.json()
            if (addresses.length > 0) {
                const addr = addresses[0]
                this.address.Address.Pref = addr.Prefecture
                this.address.Address.City = addr.City
                this.address.Address.Street = addr.Street
            }
        }
    }
}
</script>