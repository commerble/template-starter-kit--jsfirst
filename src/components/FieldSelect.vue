<template>
    <div class="field is-horizontal">
        <div class="field-label">
            <label class="label">{{label}}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <div class="select">
                        <select :name="name" :value="value" @input="$emit('input',$event.target.value)" @change="$emit('change',$event.target.value)" :required="required">
                            <slot></slot>
                            <option v-for="item in items||[]" :key="item.Value" :value="item.Value" :selected="item.Selected">{{item.Text}}</option>
                        </select>
                    </div>
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
        items: Array,
        required: Boolean,
    }
}
</script>