<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">パスワード再発行</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">{{error}}</div> 
                <form :action="action" method="post">
                    <input type="hidden" name="__RequestVerificationToken" :value="token">
                    <div class="field">
                        <label class="label">新しいパスワード</label>
                        <div class="control">
                            <input name="Password" type="password" class="input">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">新しいパスワード再入力</label>
                        <div class="control">
                            <input name="ConfirmPassword" type="password" class="input">
                        </div>
                    </div>

                    <button type="submit" name="update" value="update" class="button is-primary is-expanded mb-2">変更</button>
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