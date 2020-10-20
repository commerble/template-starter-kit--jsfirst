<template>
    <main class="container p-3">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h2 class="is-size-2">会員登録完了</h2>

                <p>登録完了しました。</p>

                <a :href="top" class="button is-expanded">お買い物を続ける</a>
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
    },
    computed: {
        top() {
            return href('~/')
        }
    }
}
</script>