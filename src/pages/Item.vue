<template>
    <main class="container p-3">
        <template v-if="detail">
            <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/">Category</router-link></li>
                    <li class="is-active"><router-link :to="`/item/${$route.params.id}`" area-current-value="page">{{detail.name}}</router-link></li>
                </ul>
            </nav>
            <div class="columns">
                <div class="column">
                    <figure class="image is-square has-background-light mb-1">
                        <img :src="mainImage.full">
                    </figure>
                    <ul class="thumb-list">
                        <li v-for="(img, index) in detail.images" :key="index" @click="imgIndex = index">
                            <figure class="image is-64x64 has-background-light">
                                <img :src="img.mini">
                            </figure>
                        </li>
                    </ul>
                </div>
                <div class="column">
                    <div class="card my-4">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p>
                                        <strong>{{detail.name}}</strong>
                                        <button class="button is-small" :disabled="sku==null" @click="makeFav">
                                            <span class="icon">
                                                <font-awesome-icon :icon="[sku && existsInFavs(sku.id) ? 'fas' : 'far', 'heart']"></font-awesome-icon>
                                            </span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div class="content">
                                <div class="field" v-if="colors.length > 0">
                                    <label class="label">色・柄</label>
                                    <div class="control">
                                        <label class="radio" v-for="value in colors" :key="value">
                                            <input type="radio" name="color" :disabled="!selectableColor(value)" :value="value" v-model="color"> {{value}}
                                        </label>
                                    </div>
                                </div>
                                <div class="field" v-if="sizes.length > 0">
                                    <label class="label">サイズ</label>
                                    <div class="control">
                                        <label class="radio" v-for="value in sizes" :key="value">
                                            <input type="radio" name="size" :disabled="!selectableSize(value)" :value="value" v-model="size"> {{value}}
                                        </label>
                                    </div>
                                </div>
                                <div class="level is-mobile">
                                    <div class="level-left">
                                        <p class="level-item has-text-weight-bold is-size-3"> &yen; {{unitPriceWithTax}}</p>
                                    </div>
                                    <div class="level-right">
                                        <label class="level-item">個数</label>
                                        <div class="level-item">
                                            <div class="control">
                                                <div class="select">
                                                    <select v-model="qty">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <span class="card-footer-item" v-if="sku && existsInCart(sku.id)">カートイン済み</span>
                            <span class="card-footer-item" v-else-if="stockout">入荷待ち</span>
                            <button class="card-footer-item button is-primary" @click="cartin(detail)" :disabled="sku == null" v-else>
                                <span class="icon mr-2">
                                    <font-awesome-icon icon="cart-arrow-down"></font-awesome-icon>
                                </span>
                                カートに入れる
                            </button>
                        </footer>
                    </div>

                    <div class="content" v-html="detail.description"></div>
                </div>
            </div>

            <hr>

            <header class="mb-2">
                <h2 class="is-size-4">特集</h2>
            </header>
            <div class="item-list">
                <router-link to="/item/1000">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://via.placeholder.com/640x480?text=Landing Page 1" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p><strong>夏目漱石　「吾輩は猫である」</strong></p>
                                    <time datetime="2020-1-1">2020/01/01</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/item/1001">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://via.placeholder.com/640x480?text=Landing Page 2" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p><strong>夏目漱石　「坊ちゃん」</strong></p>
                                    <time datetime="2020-1-1">2020/01/01</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>

            <hr>

            <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/">Category</router-link></li>
                    <li class="is-active"><router-link :to="`/item/${$route.params.id}`" area-current-value="page">{{detail.name}}</router-link></li>
                </ul>
            </nav>
        </template>
    </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            detail: null,
            imgIndex: 0,
            color: null,
            size: null,
            qty: 1,
            fav: false,
        }
    },
    computed: {
        ...mapGetters(['existsInCart', 'existsInFavs']),
        mainImage() {
            if (this.detail == null || this.detail.images == null)
                return null;
            return this.detail.images[this.imgIndex]
        },
        colors() {
            if (this.detail == null || this.detail.variations == null)
                return [];
            
            return [...new Set(this.detail.variations.map(v => v.color))]
        },
        sizes() {
            if (this.detail == null || this.detail.variations == null)
                return [];
            
            return [...new Set(this.detail.variations.map(v => v.size))]
        },
        sku() {
            if (this.detail == null || this.detail.variations == null)
                return null

            if (this.detail.variations.length == 1)
                return this.detail.variations[0]

            return this.detail.variations.find(v => v.color == this.color && v.size == this.size)
        },
        unitPriceWithTax() {
            if (this.sku != null)
                return this.sku.unitPriceWithTax.toLocaleString()
                
            if (this.detail == null || this.detail.variations == null)
                return 0
                
            const price = this.detail.variations[0].unitPriceWithTax

            if (this.detail.variations.every(v => v.unitPriceWithTax == price))
                return price.toLocaleString()
                
            const min = Math.min(...this.detail.variations.map(v => v.unitPriceWithTax))

            return `${min.toLocaleString()} ～`
        },
        stockout() {
            const variations = this.detail.variations
                                    .filter(v => this.color == null || v.color == this.color)
                                    .filter(v => this.size == null || v.size == this.size)
            return variations.length == 0 || variations.every(v => v.stockout)
        }
    },
    methods: {
        ...mapActions(['appendCartItem', 'registerFav']),
        cartin() {
            this.appendCartItem({
                id: this.sku.id,
                name: this.detail.name,
                color: this.sku.color,
                size: this.sku.size,
                icon: this.sku.icon,
                unitPriceWithTax: this.sku.unitPriceWithTax,
                qty: this.qty
            })
        },
        selectableSize(size) {
            return this.detail.variations.filter(v => v.size == size).some(v => this.color == null || v.color == this.color)
        },
        selectableColor(color) {
            return this.detail.variations.filter(v => v.color == color).some(v => this.size == null || v.size == this.size)
        },
        makeFav() {
            this.registerFav({ id: this.sku.id, url: href('~/item/' + this.$route.params.id) })
        },
        async init() {
            const result = await fetch(href('~/item/' + this.$route.params.id), { headers: { 'X-Template-Suffix': 'Json' } })
            this.detail = await result.json()
            document.title = this.detail.name
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