<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">403 Forbidden : アクセスが出来ません。</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
	            <p>
                    アクセスしようとしたページは、現在利用できません。<br>
                    別のログインID でログインされている場合は、ログアウトしてからご利用下さい。
                </p>
                <router-link to="/" class="button is-expanded">Topへ戻る</router-link>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        const pagedata = document.getElementById('pagedata')
        return pagedata ? JSON.parse(pagedata.innerText) : {}
    },
    errorCaptured() {
        return false
    }
}
</script>