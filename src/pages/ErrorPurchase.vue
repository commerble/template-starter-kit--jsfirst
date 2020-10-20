<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">注文作中にエラーが発生しました。</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 
                
	            <p>メッセージをご確認ください。</p>
                
                <a :href="back" class="button is-expanded">Topへ戻る</a>
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