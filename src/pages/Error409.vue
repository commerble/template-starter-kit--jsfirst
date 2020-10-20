<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">409 Conflict : 既に登録済みです</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
	            <p>選択された項目は、既に登録済みです。</p>
                <p>発生コントローラ：{{controller}}</p>
                <router-link to="/" class="button is-expanded">Topへ戻る</router-link>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        return JSON.parse(document.getElementById('pagedata').innerText)
    }
}
</script>