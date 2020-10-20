<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">400 Bad Request : 不正な操作</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
	            <p>不正な操作をされました。先のページにすすむことは出来ません。</p>
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