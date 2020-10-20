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

                <h2 class="is-size-4 mb-4">確認</h2>

                <p>登録住所を変更しますか？</p>
                
                <form :action="action" method="post" class="my-4">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <input type="hidden" name="model" v-model="model">
                    <FieldInput label="住所" :value="`〒${address.ZipCode} ${address.Pref}${address.City}${address.Street||''} ${address.Building||''}`" readonly></FieldInput>
                    <FieldInput label="電話番号" :value="address.Tel" readonly></FieldInput>
                    <a class="button" :href="accountUrl">いいえ</a>
                    <button class="button is-danger" type="submit" name="update" value="update">はい</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import FieldInput from '../components/FieldInput.vue'
export default {
    components: {FieldInput},
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data,
        }
    }
}
</script>