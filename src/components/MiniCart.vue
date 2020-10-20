<template>
    <div class="minicart" v-if="!modalCart">
        <ul class="minicart-items pa-1">
            <template v-if="cartItems.length == 0">
                <li class="minicart-item mx-1" v-for="(_, index) in new Array(4)" :key="index">
                    <div class="image is-64x64 is-rounded-1 has-background-light"></div>
                </li>
            </template>
            <li class="minicart-item mx-1" v-for="(item, index) in cartItems" :key="index">
                <figure class="image is-64x64 is-rounded-1 has-background-light">
                    <img :src="item.icon">
                </figure>
                <button class="delete" @click="removeCartItem(index)"></button>
            </li>
        </ul>
        <button class="button is-primary is-large mr-2" @click="openModalCart">
            <span class="icon">
                <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
            </span>
        </button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['modalCart', 'cartItems']),
    },
    methods: {
        ...mapActions(['openModalCart', 'removeCartItem'])
    }
}
</script>