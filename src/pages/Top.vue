<template>
    <div>
         <section class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        SAMPLE SHOP
                    </h1>
                    <h2 class="subtitle">
                        So cool
                    </h2>
                </div>
            </div>
        </section>
        <main class="container is-max-desktop py-6">
            <ul class="item-list mx-3">
                <li v-for="(item, index) in items" :key="index">
                    <router-link :to="`/item/${item.id}`">
                        <figure class="image is-square is-rounded-1 has-background-light">
                            <img :src="item.thumb" loading="lazy">
                        </figure>
                    </router-link>
                    <h4 class="is-size-6">{{item.name}}</h4>
                    <p>&yen; {{item.unitPriceWithTax.toLocaleString()}}</p>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []
        }
    },
    methods: {
        async init() {
            document.title = "SAMPLE SHOP"
            const search = await fetch(href('~/'), { headers: { 'X-Template-Suffix': 'Json' } })
            if (!search.ok) {
                this.$emit('error', result.status)
                return
            }
            const products = await search.json();
            this.items.splice(0, this.items.length, ...products)
        }
    },
    watch: {
        async $route(route) {
            await this.init()
        }
    },
    mounted() {
        this.init()
    }
}
</script>