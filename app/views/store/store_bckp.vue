
<template>
    <div id='storeComponent'>
        <div>
            <select name="Group" id="Group" v-model="groupSelect" @change.prevent.stop='onChangeGroup'>
                <option v-for="option in groupOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                </option>
            </select>
            <span>{{groupSelect.text}}</span>
        </div>
    
        <div v-if="typeOptions && typeOptions.length">
            <select name="applianceType" id="applianceType" v-model="typeSelect" @change.prevent.stop='onChangeType'>
    
                <option v-for="option in typeOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                </option>
            </select>
            <span>{{ typeText }}</span>
        </div>
    
        <div v-if="propertyOptions && propertyOptions.length">
            <select name="applianceAdditional" id="applianceAdditional" v-model="propertySelect" @change.prevent.stop='onChangeProperty'>
    
                <option v-for="option in propertyOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                </option>
            </select>
            <span>{{ propertyText }}</span>
        </div>
    
        <div>
            <h1>Это будущий купон</h1>
            <div>Номер купона (генерируется только в конце): {{couponNumber}}</div>
            <coupon :couponNumber='couponNumber' :productFullName='productFullName' :productPrice='productPrice'>
            </coupon>
        </div>
    </div>
</template>

<script>

let productPriceUrl = '/api/getproductprice/'; // param1 = db.prices.priceid = 'BTWMWMB'
let coupon = require('./coupon.vue');

let typesOptions = {
    BT: [
        { text: 'Стиральная машина', value: 'WM' },
        { text: 'Посудомоечная машина', value: 'DM' },
        { text: 'Холодильник', value: 'H' },
        { text: 'Электрическая плита', value: 'E' },
        { text: 'Электрическая панель', value: 'EP' },
        { text: 'Духовой Шкаф (независимый)', value: 'O' },
        { text: 'Духовой шкаф и Электрическая панель (зависимые)', value: 'OEPA' },
        { text: 'Вытяжка', value: 'V' },
        { text: 'Водонагреватель', value: 'W' }
    ],
    COND: [
        { text: 'Установка', value: 'COND_SETUP' },
        { text: 'Демонтаж', value: 'COND_REMOVE' },
        { text: 'Обслуживание', value: 'COND_SERVICE' }
    ],
    TV: [
        { text: 'Установка ТВ на тумбу', value: 'TV_SETUP' },
        { text: 'Установка ТВ на подвес', value: 'TV_WALL' },
        { text: 'Установка домашенго кинотеатра на тумбу', value: 'TV_HOME_SETUP' },
        { text: 'Установка домашенго кинотеатра на подвес', value: 'TV_HOME_WALL' },
        { text: 'Доработка SMART+', value: 'SMART' }
    ],
    SAT: [
        { text: 'Тестирование спутникового сигнала', value: 'SAT_TEST' },
        { text: 'Подключение спутниковой тарелки', value: 'SAT_SETUP' }
    ],
    C: [
        { text: 'Подключение роутера', value: 'C_ROUTE' },
        { text: 'Подключение переферийного устройства', value: 'C_HARDWARE' },
        { text: 'Настройка и оптимизация', value: 'С_SERVICE' },
        { text: 'Установка операционной системы', value: 'С_OS' }
    ]
}

let propertyOptions = {
    WM: [
        { text: 'Встроенная', value: 'WMB' },
        { text: 'Соло', value: 'WMS' }
    ],
    DM: [
        { text: 'Встроенная', value: 'ВMB' },
        { text: 'Соло', value: 'ВMS' }
    ],
    H: [
        { text: 'Встроенный', value: 'HB' },
        { text: 'Соло', value: 'HS' },
        { text: 'Side-by-Side', value: 'HSS' },
    ],
    E: [],
    EP: [],
    O: [],
    OEPA: [],
    V: [
        { text: 'Купольная', value: 'VK' },
        { text: 'Плоская', value: 'VP' },
        { text: 'Встраеваемая', value: 'VB' },
    ],
    W: [
        { text: 'Проточный', value: 'WP' },
        { text: 'Накопительный до 50 л.', value: 'W50' },
        { text: 'Накопительный от 50 л.', value: 'W00' },
    ],
    COND_SETUP: [
        { text: '7000', value: '7000' },
        { text: '9000', value: '9000' },
        { text: '12000', value: '12000' }
    ],
    COND_REMOVE: [
        { text: '7000', value: '7000' },
        { text: '9000', value: '9000' },
        { text: '12000', value: '12000' }
    ],
    COND_SERVICE: [],
    TV_SETUP: [
        { text: 'Диагональ до 32"', value: 'TV_SETUP_32' },
        { text: 'Диагональ до 46"', value: 'TV_SETUP_46' },
        { text: 'Диагональ свыше 46"', value: 'TV_SETUP_00' }
    ],
    TV_WALL: [
        { text: 'Диагональ до 32"', value: 'TV_SETUP_32' },
        { text: 'Диагональ до 46"', value: 'TV_SETUP_46' },
        { text: 'Диагональ свыше 46"', value: 'TV_SETUP_00' }
    ],
    TV_HOME_SETUP: [],
    TV_HOME_WALL: [],
    SMART: [],
    SAT_TEST: [],
    SAT_SETUP: [
        { text: 'Диаметр до 0.79', value: 'SAT_SETUP_79' },
        { text: 'Диаметр свыше 0.8', value: 'SAT_SETUP_00' }
    ],
    C_ROUTE: [],
    C_HARDWARE: [],
    С_SERVICE: [],
    C_OS: []

}

export default {
    name: 'storeComponent',
    data: function () {
        return {
            groupSelect: '',
            groupOptions: [
                { text: 'Бытовая техника', value: 'BT' },
                { text: 'Кондиционер', value: 'COND' },
                { text: 'ТВ', value: 'TV' },
                { text: 'Спутниковое телевидение', value: 'SAT' },
                { text: 'Цифровая техника', value: 'C' },
            ],

            typeSelect: '',
            typeOptions: [],

            propertySelect: '',
            propertyOptions: [],

            lastSelect: '',
            lastOptions: [],

            // Данные для купона
            couponNumber: 'def number',
            productFullName: 'def name',
            productPrice: 0
        }
    },
    components: {
        coupon: coupon
    },
    computed: {
        typeText: function () {
            if (this.typeSelect) { return this.typeSelect.text }
        },
        propertyText: function () {
            if (this.propertySelect) { return this.propertySelect.text }
        },
    },
    methods: {
        onChangeGroup: function () {
            let groupId = this.groupSelect.value;
            this.typeOptions = typesOptions[groupId];

            this.typeSelect = '';
            this.propertySelect = '';
            this.propertyOptions = [];
        },
        onChangeType: function () {
            if (!!this.typeSelect) {
                let typeId = this.typeSelect.value;
                this.propertyOptions = propertyOptions[typeId];
                this.propertySelect = '';

                if (!this.propertyOptions.length) {
                    console.log(this.groupSelect.text + ' ' + this.typeSelect.text);
                    this.couponNumber = '092034092093';

                    let priceid = this.groupSelect.value + this.typeSelect.value;

                    axios
                        .get(productPriceUrl + priceid)
                        .then(r => this.productPrice = r.data.price)
                        .catch(err => console.log(err))
                }

            }
        },
        onChangeProperty: function () {
            if (!!this.propertySelect) {
                console.log(this.groupSelect.text + ' ' + this.typeSelect.text + ' ' + this.propertySelect.text);
                this.couponNumber = '092034092093';

                let priceid = this.groupSelect.value + this.typeSelect.value + this.propertySelect.value;

                axios
                    .get(productPriceUrl + priceid)
                    .then(r => this.productPrice = r.data.price)
                    .catch(err => console.log(err))
            }
        }
    },



}
</script>

<style>

</style>

