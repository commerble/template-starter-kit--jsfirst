<template>
    <main class="container p-3">
        <header class="mb-6">
            <h1 class="is-size-5">決済処理に進みます</h1>
        </header>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <form :action="action" method="post">
                    <button type="submit" class="button is-primary is-expanded mb-2">決済に進む</button>
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