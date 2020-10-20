<template>
    <div class="field is-horizontal">
        <div class="field-label">
            <label class="label">{{label}}</label>
        </div>
        <div class="field-body">
            <div class="field" :class="{'has-addons': hasAddons}">
                <span v-if="readonly===true">{{value}}</span>
                <div class="control" v-else>
                    <input class="input" 
                        :type="type" 
                        :size="size"
                        :maxlength="maxlength"
                        :pattern="pattern"
                        :title="title"
                        :required="required===true" 
                        :name="name" 
                        :value="value"
                        @input="$emit('input', $event.target.value)">
                </div>
                <div class="control" v-if="hasAddons">
                    <button type="button" class="button" :class="{'is-loading': loading}" @click="$emit('click', $event)">{{addon}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: String | Number,
        label: String,
        name: String,
        type: String,
        pattern: String,
        title: String,
        maxlength: Number|String,
        size: Number|String,
        required: Boolean,
        addon: String,
        loading: Boolean,
        readonly: Boolean
    },
    computed: {
        hasAddons() {
            return this.addon != null
        }
    }
}
</script>