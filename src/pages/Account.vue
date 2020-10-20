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
            <div class="column" v-if="command=='confirm'">
                <h2 class="is-size-4 mb-4">会員情報</h2>
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div>
                <form :action="actionUsernameUrl" method="post" class="mb-4">
                    <FieldInput label="メールアドレス" name="UserName" type="email" v-model="account.UserName" required></FieldInput>
                    <button class="button" type="submit" name="confirm" value="confirm">変更</button>
                </form>
                <form :action="actionAccountUrl" method="post" class="mb-4">
                    <FieldPersonName label="氏名">
                        <template v-slot:lastname>
                            <input class="input" name="LastName" type="text" v-model="account.LastName" required  
                                pattern="^[\u3040-\u30FF|\u4E00-\u9FFF|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]+$" 
                                title="ひらがな、カタカタ、漢字、全角英数字、－―ー‐ヽヾゝゞ〃仝々〆〇 のみ使用可能です。">
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="FirstName" type="text" v-model="account.FirstName" required  
                                    pattern="^[\u3040-\u30FF|\u4E00-\u9FFF|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]+$" 
                                    title="ひらがな、カタカタ、漢字、全角英数字、－―ー‐ヽヾゝゞ〃仝々〆〇 のみ使用可能です。">
                        </template>
                    </FieldPersonName>

                    <FieldPersonName label="シメイ">
                        <template v-slot:lastname>
                            <input class="input" name="LastNameKana" type="text" v-model="account.LastNameKana" required  
                                    pattern="^[\u30A2-\u30FD]+$" 
                                    title="カタカタのみ使用可能です。">
                        </template>
                        <template v-slot:firstname>
                            <input class="input" name="FirstNameKana" type="text" v-model="account.FirstNameKana" required  
                                    pattern="^[\u30A2-\u30FD]+$" 
                                    title="カタカタのみ使用可能です。">
                        </template>
                    </FieldPersonName>

                    <FieldBirthday label="生年月日" name-y="BirthdayY" name-m="BirthdayM" name-d="BirthdatD" v-model="account.Birthday"></FieldBirthday>
                    <FieldRadio label="性別" name="Sex" :items="sexes" v-model="account.Sex"></FieldRadio>
                    <FieldRadio label="メール購読" name="Subscribe" :items="subscribes" v-model="account.Subscribe"></FieldRadio>

                    <button type="submit" class="button" :name="command" :value="command">変更</button>
                </form>
                <form :action="actionAddressUrl" method="post" class="mb-4">
                    <FieldInput label="郵便番号" name="Address.ZipCode" type="tel" maxlength="7" size="7" v-model="account.Address.ZipCode" required addon="検索" :loading="searchingZipCode" @click="searchZipCode"></FieldInput>
                    <FieldInput label="都道府県" name="Address.Pref" type="text" maxlength="10" size="10" v-model="account.Address.Pref" required></FieldInput>
                    <FieldInput label="市区町村" name="Address.City" type="text" maxlength="128" size="10" v-model="account.Address.City" required></FieldInput>
                    <FieldInput label="通り・丁目・番地・号" name="Address.Street" type="text" maxlength="128" size="10" v-model="account.Address.Street"></FieldInput>
                    <FieldInput label="建物名・部屋番号" name="Address.Building" type="text" maxlength="128" size="10" v-model="account.Address.Building"></FieldInput>
                    <FieldInput label="電話番号" name="Address.Tel" type="text" maxlength="11" size="10" v-model="account.Address.Tel" required></FieldInput>
                    <button class="button" type="submit" name="confirm" value="confirm">変更</button>
                </form>
            </div>
            <div class="column" v-else>
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div>

                <h2 class="is-size-4 mb-4">確認</h2>
                <p>会員情報を変更しますか？</p>
                <form :action="actionAccountUrl" method="post" class="my-4">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <input type="hidden" name="model" v-model="model">

                    <FieldInput label="氏名" :value="name" readonly></FieldInput>
                    <FieldInput label="シメイ" :value="kana" readonly></FieldInput>
                    <FieldInput label="生年月日" :value="birthday" readonly></FieldInput>
                    <FieldInput label="性別" :value="sex" readonly></FieldInput>
                    <FieldInput label="メール購読" :value="subscribe" readonly></FieldInput>
                    
                    <a class="button" :href="accountUrl">いいえ</a>
                    <button class="button is-danger" type="submit" :name="command" :value="command">はい</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import FieldInput from '../components/FieldInput.vue'
import FieldRadio from '../components/FieldRadio.vue'
import FieldBirthday from '../components/FieldBirthday.vue'
import FieldPersonName from '../components/FieldPersonName.vue'
export default {
    components: { FieldInput, FieldRadio, FieldBirthday, FieldPersonName },
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
            const response = await fetch(href('~/Site/ZipCode/' + this.account.Address.ZipCode))
            if (!response.ok) {
                const text = await response.text()
                throw text
            }
            this.searchingZipCode = false
            const addresses = await response.json()
            if (addresses.length > 0) {
                const addr = addresses[0]
                this.account.Address.Pref = addr.Prefecture
                this.account.Address.City = addr.City
                this.account.Address.Street = addr.Street
            }
        }
    }
}
</script>