<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">ログイン</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <form :action="loginUrl" method="post">
                    <input type="hidden" name="returnUrl" :value="returnUrl">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <div class="field">
                        <label class="label">メールアドレス</label>
                        <div class="control">
                            <input name="username" type="email" class="input">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">パスワード</label>
                        <div class="control">
                            <input name="password" type="password" class="input">
                        </div>
                    </div>

                    <button type="submit" class="button is-primary is-expanded mb-2">ログイン</button>
                    <a type="submit" class="button is-expanded  mb-2" :href="guestUrl" v-if="/purchase/i.test(returnUrl)">ゲスト購入</a>
                    <a type="submit" class="button is-text is-expanded  mb-2" :href="signupUrl">サインアップ</a>
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