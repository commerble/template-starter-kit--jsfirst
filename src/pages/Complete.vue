<template>
    <main class="container p-3">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h2 class="is-size-2">ご注文完了</h2>

                <p>ご注文ありがとうございました。</p>
                <p>登録しているEメールアドレス宛に、ご注文確認メールを送信しました。<br />
                ご注文確認メールはご注文控えとして、大切に保管してください。</p>

                <a :href="guestHistory" class="button is-primary is-expanded mb-2" v-if="isGuest">受注履歴</a>
                <a :href="memberHistory" class="button is-primary is-expanded mb-2" v-else>受注履歴</a>
                <a :href="top" class="button is-expanded">お買い物を続ける</a>
            </div>
        </div>
    </main>
</template>
<script>
import {mapActions} from 'vuex'
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
    },
    methods: {
        ...mapActions(['clearCart'])
    },
    mounted() {
        this.clearCart()
    }
}
</script>