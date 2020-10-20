<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">500 Internal Server Error : 予期せぬエラーが発生しました。</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
	            <p>
                    不正な入力がされたか、アクセスが集中している可能性があります。<br>
                    入力を見直していただくか、しばらく時間をおいてから再度お試しください。<br>
                </p>
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