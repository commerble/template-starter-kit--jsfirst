<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">サインアップ</h1>
        </header>

        <div class="columns is-flex-center">
            <div class="column is-8-desktop is-10-tablet">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <form :action="action" method="post" v-if="command=='confirm'">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <FieldInput label="メールアドレス" name="UserName" type="email" v-model="account.UserName" required></FieldInput>

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

                    <FieldInput label="パスワード" name="Password" type="password" required 
                        pattern="^(?=.*?[a-zA-Z!#$%&^~])(?=.*?\d)[a-zA-Z\d!#$%&^~]{6,18}$" 
                        title="英数字6文字以上である必要があります。"></FieldInput>

                    <FieldInput label="パスワード再入力" name="ConfirmPassword" type="password" required 
                        pattern="^(?=.*?[a-zA-Z!#$%&^~])(?=.*?\d)[a-zA-Z\d!#$%&^~]{6,18}$" 
                        title="英数字6文字以上である必要があります。"></FieldInput>
                    

                    <FieldBirthday label="生年月日" name-y="BirthdayY" name-m="BirthdayM" name-d="BirthdatD" v-model="account.Birthday"></FieldBirthday>

                    <FieldRadio label="性別" name="Sex" :items="sexes" v-model="account.Sex"></FieldRadio>
                    
                    <FieldRadio label="メール購読" name="Subscribe" :items="subscribes" v-model="account.Subscribe"></FieldRadio>

                    <button type="submit" class="button is-primary is-expanded mb-2" :name="command" :value="command">{{commandText}}</button>
                </form>
                <form :action="action" method="post" v-else>
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <input type="hidden" name="model" :value="model">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">メールアドレス</label>
                        </div>
                        <div class="field-body">
                            <span>{{username}}</span>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">氏名</label>
                        </div>
                        <div class="field-body is-flex">
                            <span>{{name}}</span>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">シメイ</label>
                        </div>
                        <div class="field-body is-flex">
                            <span>{{kana}}</span>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">生年月日</label>
                        </div>
                        <div class="field-body">
                            <span>{{birthday}}</span>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">性別</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <span>{{sex}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">メール購読</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <span>{{subscribe}}</span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="button is-primary is-expanded mb-2" :name="command" :value="command">{{commandText}}</button>
                    <button type="submit" class="button is-expanded  mb-2">戻る</button>
                </form> 
            </div>
        </div>
        <hr>

        <nav class="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li class="is-active"><router-link :to="`/Site/Account`" area-current-value="page">サインアップ</router-link></li>
            </ul>
        </nav>
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
        }
    }
}
</script>