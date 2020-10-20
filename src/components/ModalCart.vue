<template>
    <div class="modal" :class="{'is-active':modalCart}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">カート</p>
            </header>
            <section class="modal-card-body">
                <p class="has-text-centered" v-if="cartItems.length == 0">カートは空です</p>
                <div class="notification is-danger is-light" v-for="(error, index) in errors" :key="index">
                    {{error.type}} {{error.code}} {{error.message}} {{error.item ? error.item.name : ''}}
                </div>
                <article class="media" v-for="(item, index) in items" :key="index">
                    <figure class="media-left">
                        <p class="image is-64x64 is-rounded-1">
                            <img :src="item.icon">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <router-link :to="`/item/${item.id}`">
                                    <strong>{{item.name}}</strong>
                                    <small v-if="item.color">{{item.color}}</small>
                                    <small v-if="item.size">{{item.size}}</small>
                                </router-link>
                                <br>
                                &yen; {{item.unitPriceWithTax.toLocaleString()}}（税込） &times; {{item.qty}}個
                            </p>
                        </div>
                    </div>
                    <div class="media-right">
                        <button class="delete is-pulled-right" @click="removeCartItem(index)"></button>
                        <br>
                        &yen; {{item.linePrice.toLocaleString()}}
                    </div>
                </article>
            </section>
            <footer class="modal-card-foot is-flex-vertical">
                <span class="tag is-info" v-for="campaign in cartCampaigns" :key="campaign.id">{{campaign.name}}</span>
                <div class="block is-expanded">
                    <article class="media">
                        <div class="media-content">
                            <p class="is-pulled-right">合計</p>
                        </div>
                        <div class="media-right">
                            <p class="is-pulled-right">&yen; {{subtotal.toLocaleString()}}</p>
                        </div>
                    </article>
                    <article class="media">
                        <div class="media-content">
                        </div>
                        <div class="media-right">
                            &plus;配送料
                        </div>
                    </article>
                </div>
                <div class="buttons is-flex-right is-expanded">
                    <button class="button is-light" @click="closeModalCart()">とじる</button>
                    <a :href="purchaseUrl(1)" class="button is-success fg-1" :class="{'is-loading':cartLoading}" :disabled="cartLoading || cartErrors.length > 0">
                        購入に進む <span class="icon"><font-awesome-icon icon="arrow-right"></font-awesome-icon></span>
                    </a>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const ignoreErrors = ['EmptyCart']
export default {
    computed: {
        ...mapState(['modalCart', 'cartItems', 'cartExpandItems', 'cartErrors', 'cartCampaigns', 'cartSubtotal', 'cartCancelable', 'cartLoading']),
        items() {
            if (this.cartLoading) 
                return this.cartItems.map(item => ({
                    ...item,
                    linePrice: item.unitPriceWithTax * item.qty
                }))
            
            return this.cartExpandItems
        },
        subtotal() {
            if (this.cartLoading)
                return this.cartItems.reduce((total, item) => total += item.unitPriceWithTax * item.qty, 0)

            return this.cartSubtotal
        },
        errors() {
            return this.cartErrors.filter(error => ignoreErrors.indexOf(error.type) < 0)
        },
    },
    methods: {
        ...mapActions(['closeModalCart', 'removeCartItem']),
        purchaseUrl(cartId){
            return href(`~/purchase/${cartId}`)
        }
    }
}
</script>