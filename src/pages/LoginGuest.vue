<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">ゲスト注文詳細　閲覧</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <form :action="action" method="post">
                    <div class="field">
                        <label class="label">お客様情報電話番号下4桁</label>
                        <div class="control">
                            <input name="authCode" type="tel" maxlength="4" class="input">
                        </div>
                    </div>

                    <button type="submit" class="button is-primary is-expanded mb-2">ログイン</button>
                </form>
            </div>
        </div>
        <hr>

        <nav class="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li class="is-active"><router-link :to="`/Site/Login`" area-current-value="page">ログイン</router-link></li>
            </ul>
        </nav>
    </main>
</template>
<script>
export default {
    data() {
        return JSON.parse(document.getElementById('pagedata').innerText)
    }
}
</script>