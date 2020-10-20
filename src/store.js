import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = sessionStorage

const CART_ITEMS = 'CART_ITEMS'

function save(key, obj) {
    storage.setItem(key, JSON.stringify(obj))
}
function load(key) {
    const json = storage.getItem(key)
    if (typeof json !== 'string')
        return null

    return JSON.parse(json);
}

let loadedCart = false

const LOADED_FAV_NOT_YET = 'NOT_YET'
const LOADED_FAV_WAIT_LOGIN = 'WAIT_LOGIN'
const LOADED_FAV_LOADED = 'LOADED'
let loadedFav = LOADED_FAV_NOT_YET


export default function createStore() {
    return new Vuex.Store({
        state: {
            layout: 'default',
            modalCart: false,
            cartItems: [],
            cartExpandItems: [],
            cartErrors: [],
            cartCampaigns: [],
            cartSubtotal: 0,
            cartCancelable: true,
            cartLoading: false,
            favorites: [],
        },
        getters:{
            existsInCart(state) {
                return id => state.cartItems.some(item => item.id == id)
            },
            existsInCartReserve(state) {
                return reserve => state.cartItems.some(item => item.reserve == reserve)
            },
            existsInFavs(state) {
                return id => state.favorites.some(_ => _ == id)
            }
        },
        mutations: {
            setLayout(state, layout) {
                state.layout = layout
            },
            openModalCart(state) {
                state.modalCart = true
            },
            closeModalCart(state) {
                state.modalCart = false
            },
            replaceCartItems(state, items) {
                state.cartItems.splice(0, state.cartItems.length, ...items)
            },
            replaceCartExpandItems(state, items) {
                state.cartExpandItems.splice(0, state.cartExpandItems.length, ...items)
            },
            replaceCartErrors(state, items) {
                state.cartErrors.splice(0, state.cartErrors.length, ...items)
            },
            replaceCartCampaigns(state, items) {
                state.cartCampaigns.splice(0, state.cartCampaigns.length, ...items)
            },
            appendCartItem(state, item) {
                state.cartItems.push(item)
            },
            removeCartItem(state, index) {
                state.cartItems.splice(index, 1)
            },
            setCartSubtotal(state, subtotal) {
                state.cartSubtotal = subtotal
            },
            setCartCancelable(state, cancelable) {
                state.cartCancelable = cancelable
            },
            setCartLoading(state) {
                state.cartLoading = true
            },
            clearCartLoading(state) {
                state.cartLoading = false
            },
            appendFav(state, id) {
                state.favorites.push(id)
            },
            replaceFavs(state, favs) {
                state.favorites.splice(0, state.favorites.length, ...favs)
            }
        },
        actions: {
            loadCartOnce({commit}) {
                if (loadedCart == false) {
                    const items = load(CART_ITEMS)
                    if (items && Array.isArray(items)) {
                        commit('replaceCartItems', items)
                    }
                }
            },
            clearCart({commit}) {
                commit('replaceCartItems', [])
                save(CART_ITEMS, [])
            },
            appendCartItem({commit, state}, { id, name, color, size, icon, unitPriceWithTax, qty, reserve }) {
                commit('appendCartItem',  { id, name, color, size, icon, unitPriceWithTax, qty, reserve })
                save(CART_ITEMS, state.cartItems)
            },
            removeCartItem({commit, state, dispatch }, index) {
                commit('removeCartItem', index)
                save(CART_ITEMS, state.cartItems)
                if (state.modalCart) {
                    dispatch('syncCart')
                }
            },
            closeModalCart({commit}) {
                commit('closeModalCart')
                window.document.body.classList.remove('is-clipped')
            },
            openModalCart({commit, dispatch}) {
                commit('openModalCart')
                window.document.body.classList.add('is-clipped')
                dispatch('syncCart')
            },
            async syncCart({commit, state}) {
                commit('setCartLoading')
                try {
                    const payload = state.cartItems.map(item=> `item=${item.id}&qty=${item.qty}&reserve=${item.reserve||''}`).join('&')
                    const returnUrl = href(`~/order/cart?${payload}`)
                    const result = await fetch(href(`~/order/cart?returnUrl=${encodeURIComponent(returnUrl)}`), { 
                        method: 'POST',
                        mode: 'same-origin',
                        cache: 'no-cache',
                        credentials: 'same-origin', 
                        redirect: 'follow',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                        body:'CartId=1&itemclear=itemclear'
                    })
            
                    if (result.ok) {
                        const carts = await result.json()
                        const cart = carts[0]
                        commit('replaceCartExpandItems', cart.items)
                        commit('replaceCartErrors', cart.errors)
                        commit('replaceCartCampaigns', cart.campaigns)
                        commit('setCartSubtotal', cart.subtotal)
                        commit('setCartCancelable', cart.canCancel)
                    } else {
                        const text = await result.text()
                        alert(`status: ${result.statusText}\n${text}`)
                    }
                }
                finally{
                    commit('clearCartLoading')
                }
            },
            async registerFav({commit, getters}, {id, url}) {
                if (getters.existsInFavs(id))
                    return
                
                let response = await fetch(href('~/member/createfavorite?item='+id), { redirect: 'manual' })
                if (response.status == 0) {
                    location.replace(href('~/site/login?returnUrl=')+url)
                    return
                }
                
                if (loadedFav == LOADED_FAV_WAIT_LOGIN) {
                    await dispatch('loadFavs')
                }

                if (getters.existsInFavs(id))
                    return

                if (!response.ok ||!response.headers.get('content-type').includes('application/json')) {
                    const text = await response.text()
                    console.error(text)
                    return
                }

                const op = await response.json()
                response = await fetch(op.action, { method: 'post', headers: { 'X-Template-Suffix': 'Json', 'Content-Type': 'application/x-www-form-urlencoded' }, body: `__RequestVerificationToken=${encodeURIComponent(op.token)}` })
                if (response.status == 200 || response.status == 409) {
                    commit('appendFav', id)
                }
            },
            async loadFavs({commit}) {
                let response = await fetch(href('~/member/favorites'), { redirect: 'manual', headers: { 'X-Template-Suffix': 'Json' } })

                if(response.status == 0) {
                    loadedFav = LOADED_FAV_WAIT_LOGIN
                    return
                }

                if (response.status == 200 && response.headers.get('content-type').includes('application/json')) {
                    const favs = await response.json()
                    commit('replaceFavs', favs)
                    loadedFav = LOADED_FAV_LOADED
                }
            },
            async loadFavsOnce({dispatch}) {
                if (loadedFav == LOADED_FAV_NOT_YET) {
                    await dispatch('loadFavs')
                }
            }
        }
    })
}