<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">パスワード再発行</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <div class="notification is-info is-light" v-for="(message, index) in messages" :key="index">{{message}}</div> 
                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <div class="field">
                        <label class="label">メールアドレス</label>
                        <div class="control">
                            <input name="UserName" type="email" class="input">
                        </div>
                    </div>

                    <button type="submit" name="request" value="request" class="button is-primary is-expanded mb-2">送信</button>
                </form>
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