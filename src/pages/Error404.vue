<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">404 Not Found : ページが見つかりません</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
	            <p>アクセスしようとしたページは、現在利用できません。</p>
                <p v-if="controller">発生コントローラ：{{controller}}</p>
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