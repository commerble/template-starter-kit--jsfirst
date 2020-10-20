<template>
    <div class="field is-horizontal">
        <div class="field-label">
            <label class="label">{{label}}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <label class="radio" v-for="item in items" :key="item.Value">
                        <input type="radio" :name="name" :value="item.Value" :checked="value == item.Value || (value!=null && value.toString() == item.Value)" @change="$emit($event.target.value)"> {{item.Text}}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['value', 'label', 'name', 'items'],
    model: {
        prop: 'value',
        event: 'change'
    }
}
</script>