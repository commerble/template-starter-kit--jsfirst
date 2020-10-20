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
                <h2 class="is-size-4 mb-4">ポイント</h2>

                <dl class="mb-4">
                    <dt>有効ポイント</dt>
                    <dd>{{activePoint}} pt</dd>

                    <dt>仮ポイント</dt>
                    <dd>{{temporaryPoint}} pt</dd>
                </dl>
                <p>仮ポイントは発送後に有効ポイントに有効化されます。</p>
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