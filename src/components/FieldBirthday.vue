<template>
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">{{label}}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <div class="select">
                        <select :name="nameY" v-model="year" @change="update">
                            <option v-for="y in years" :key="y" :value="y">{{y}}</option>
                        </select>
                    </div>
                    <div class="select">
                        <select name="BirthdayM" v-model="month" @change="update">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                    </div>
                    <div class="select">
                        <select name="BirthdayD" v-model="day" @change="update">
                            <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                            <option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                            <option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>
                            <option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option>
                            <option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option>
                            <option>31</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['value', 'label', 'nameY', 'nameM', 'nameD'],
    data() {
        if (!this.value)
            return { year: null, month: null, day: null}

        const d = new Date(this.value)
        return {
            year : d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        }
    },
    computed: {
        years() {
            const years = []
            for (let y = new Date().getFullYear(), i = 0; i < 150; i++ ) {
                years.push(y--);
            }
            return years
        }
    },
    methods: {
        update() {
            if (this.year == null || this.month == null || this.day == null)
                return

            const d = new Date(this.year, this.month-1, this.day)
            this.$emit('input', d.toISOString())
        }
    },
    watch: {
        value(newValue) {
            if (!newValue) {
                this.year = null
                this.month = null
                this.day = null
            } else {
                const d = new Date(newValue)
                this.year = d.getFullYear()
                this.month = d.getMonth() + 1
                this.day = d.getDate()
            }
        }
    }
}
</script>