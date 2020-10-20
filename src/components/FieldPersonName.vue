<template>
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">{{label}}</label>
        </div>
        <div class="field-body is-flex">
            <div class="field mr-2">
                <p class="control is-expanded">
                     <slot name="lastname"></slot>
                </p>
            </div>
            <div class="field">
                <p class="control is-expanded">
                <slot name="firstname"></slot>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['label']
}
</script>