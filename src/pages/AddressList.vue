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
                <h2 class="is-size-4 mb-4">登録住所</h2>

                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div>
               
                <a :href="action" class="button mb-4">新規登録</a>

                <ul v-if="list.length > 0">
                     <li class="mb-4" v-for="addr in list" :key="addr.AddressId">
                        <header class="is-size-5">{{addr.AddressName}}</header>
                        <p>{{addr.Address.Recipientlastname}} {{addr.Address.Recipientfirstname}}</p>
                        <p>{{addr.Address.Recipientlastnamekana}} {{addr.Address.Recipientfirstnamekana}}</p>
                        <p>〒{{addr.Address.ZipCode}} {{addr.Address.Pref}}{{addr.Address.City}}{{addr.Address.Street}} {{addr.Address.Building}}</p>
                        <p>電話番号：{{addr.Address.Tel}}</p>
                        <a class="button is-text" :href="`${addressesUrl}/${addr.AddressId}`">編集・削除</a>
                    </li>
                </ul>

                <p class="mb-4" v-else>登録されている送り先住所はありません。</p>

                <Pagination :url="addressesUrl" :page="page" :last-page="lastPage"></Pagination>
            </div>
        </div>
    </main>
</template>
<script>
import Pagination from '../components/Pagination.vue'
export default {
    components: { Pagination },
    data() {
        const data = JSON.parse(document.getElementById('pagedata').innerText)
        return {
            ...data,
        }
    }
}
</script>