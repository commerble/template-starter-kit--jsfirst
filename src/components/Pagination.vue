<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" :href="page==0?null:`${url}?page=${page-1}`" :disabled="page==0">前へ</a>
        <a class="pagination-next" :href="page==lastPage?null:`${url}?page=${page+1}`" :disabled="page==lastPage">次へ</a>
        <ul class="pagination-list">
            <li v-if="page>1">
                <a class="pagination-link" :href="`${url}?page=0`" >1</a>
            </li>
            <li v-if="page>1">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-if="page>0">
                <a class="pagination-link" :href="`${url}?page=${page-1}`" >{{page}}</a>
            </li>
            <li>
                <a class="pagination-link is-current" aria-current="page">{{page+1}}</a>
            </li>
            <li v-if="page<lastPage">
                <a class="pagination-link" :href="`${url}?page=${page+1}`" >{{page+2}}</a>
            </li>
            <li v-if="page<lastPage-1">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-if="page<lastPage-1">
                <a class="pagination-link" :href="`${url}?page=${lastPage}`">{{lastPage+1}}</a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props: ['page', 'lastPage', 'url']
}
</script>