
<template>
  <form data-abide novalidate :action="'/api/makeorder/'+couponNumber">
    
    

    <div id='storeComponent' class="row align-middle vertical-100vh">
  
      <div class="large-12 column">
        <div class="row align-middle padding-10">
  
          <!--FORM SIDE -->
          <div class="large-8 small-12 column">
  
            <!-- SELECT GROUP -->
            <div class="row">
              <div class="large-12 small-12 column">
                <select name="Group" id="Group" v-model="groupSelect" @change.prevent.stop='onChangeGroup'>
                  <option value disabled selected hidden>БТ / Кондиционер / ТВ / Спутниковое ТВ / ЦТ </option>
                  <option v-for="option in groupOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                  </option>
                </select>
                <!-- TODO перенести в схему купона -->
                <!--<span>{{groupSelect.text}}</span>-->
              </div>
            </div>
  
            <!--SELECT TYPE & PROPERTY -->
            <div class="row">
              <div v-if="typeOptions && typeOptions.length" :class="selectPropertyClass+' small-12 column'">
  
                <select name="applianceType" id="applianceType" v-model="typeSelect" @change.prevent.stop='onChangeType'>
                  <option value disabled selected hidden class="option-gray">А именно</option>
                  <option v-for="option in typeOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                  </option>
                </select>
                <!-- TODO перенести в схему купона -->
                <!--<span>{{ typeText }}</span>-->
  
              </div>
              <div v-if="premiumOptions && premiumOptions.length" :class="selectPropertyClass+' small-12 column'">
  
                <select name="applianceType" id="applianceType" v-model="premiumSelect" @change.prevent.stop='onChangePremium'>
                  <option value disabled selected hidden class="option-gray">Стандарт / Премиум</option>
                  <option v-for="option in premiumOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                  </option>
                </select>
                <!-- TODO перенести в схему купона -->
                <!--<span>{{ typeText }}</span>-->
  
              </div>
              <div v-if="propertyOptions && propertyOptions.length" :class="selectPropertyClass + ' small-12 column'">
  
                <select name="propertyOption" id="propertyOption" v-model="propertySelect" @change.prevent.stop='onChangeProperty'>
                  <option value disabled selected hidden>Встраиваемая/Соло</option>
                  <option v-for="option in propertyOptions" :value='{ text: option.text, value: option.value }' :key='option.value'>
                    {{option.text}}
                  </option>
                </select>
                <!-- TODO propertyText перенести в схему купона -->
                <!--<span>{{ propertyText }}</span>-->
  
              </div>
            </div>
  
            <!-- SWITCH ADDITIONAL -->
            <div v-if="additionalOptions && additionalOptions.length" class="row">
              <div v-for="(option,index) in additionalOptions" :key="option.value" class="large-4 columns text-left">
                <div class="row align-middle">
                  <div class="large-3 columns">
                    <div class="switch tiny">
                      <input class="switch-input" :value="{ text: option.text, value: option.value, price: option.price }" :id="'exampleSwitch'+index" type="checkbox" :name="'exampleSwitch'+index" v-model="chekedAdditionalOptions" @change.prevent.stop="function(e) { onChangeSwitch(e, option.price) }">
                      <label class="switch-paddle" :for="'exampleSwitch'+index">
                        <span class="show-for-sr">option.text</span>
                      </label>
                    </div>
                  </div>
                  <div class="columns additional-text">
                    {{option.text}} +{{option.price}}
                  </div>
                </div>
              </div>
            </div>
  
            <!-- CUSTOMER INFO -->
            <div class="row additional">
              <div class="large-6 columns">
                <input type="text" placeholder="Иванов Иван Иванович" required v-model="fullname">
              </div>
              <div class="large-6 columns">
                <input type="text" placeholder="+7 (999) 945 94 93" required v-model="phone">
              </div>
            </div>
            <div class="row">
  
            </div>
            <div class="row">
              <div class="large-12 columns">
                <input type="text" placeholder="Йошкра-Ола, Садовая 11-14" required v-model="address">
              </div>
            </div>
  
            <div v-f="change">
              вошли в change
              <div>
                <ul>
                  <li v-for="(comment,index) in commentsArr" :key="comment">{{comment}}</li>
                </ul>
              </div>
            </div>

            <div class="row">
              <div class="large-12 column ">
                <textarea name="" id="" cols="30" rows="4" class="textarea" v-model="comment"></textarea>
              </div>
            </div>
          </div>
          <!--COUPON SIDE -->

          <coupon :couponNumber='couponNumber' :productFullName='productFullName' :couponDate='couponDate' :fullname='fullname' :phone='phone' :address='address' :productPrice='productPrice'>
          </coupon>
          
        </div>
      </div>
  
    </div>
    <!--BUTTONS SECTION -->
    <div class="row">
      <div class="large-8 columns text-center buttons">
        <button class="button" type="submit" value="Submit" @click.prevent.stop="newOrder">Новая заявка</button>
      </div>
      <div class="large-4 columns text-center buttons">
        <button class="button" type="submit" value="Submit" :disabled="!isSendButton" @click.prevent="sendOrder">Отправить заявку на кассу</button>
      </div>
  
    </div>
  </form>
</template>

<script>

import axios from 'axios';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

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

let premiumOptions = {
  WM: [
    { text: 'Стандарт', value: 'WM_BASIC' },
    { text: 'Премиум', value: 'WM_VIP' },
    { text: 'Доработки', value: 'WMB_BASIC' },
  ],
  DM: [
    { text: 'Стандарт', value: 'DM_BASIC' },
    { text: 'Премиум', value: 'DM_VIP' },
    { text: 'Доработки', value: 'DM_ADD' },
  ]
}

let propertyOptions = {
  WM_BASIC: [
    { text: 'Встроенная', value: 'WMB_BASIC' },
    { text: 'Соло', value: 'WMS_BASIC' }
  ],
  WM_VIP: [
    { text: 'Встроенная', value: 'WMB' },
    { text: 'Соло', value: 'WMS' }
  ],
  DM_BASIC: [
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

let additionalOptions = {
  WMB_BASIC: [
    { text: 'Доработка электросети', value: 'ADD_WM_E', price: '400' },
    { text: 'Доработка водоснабжения', value: 'ADD_WM_W', price: '500' },
    { text: 'Доработка слива', value: 'ADD_WM_G', price: '600' }
  ]
}

export default {
  name: 'makeorderComponent',
  props: ['change','id'],
  data: function () {
    return {
      
      ishq: false,
      username: '',

      groupSelect: '',
      groupOptions: [
        { text: 'Бытовая техника', value: 'BT' },
        { text: 'Кондиционер', value: 'COND' },
        { text: 'ТВ', value: 'TV' },
        { text: 'Спутниковое телевидение', value: 'SAT' },
        { text: 'Цифровая техника', value: 'C' },
      ],

      typeSelect: { text: '', value: ''},
      typeOptions: [],

      propertySelect: { text: '', value: ''},
      propertyOptions: [],

      premiumSelect: { text: '', value: ''},
      premiumOptions: [],

      additionalOptions: [],
      showAdditionalOptions: false,
      chekedAdditionalOptions: [],

      // данные пользователя
      fullname: '',
      phone: '',
      address: '',
      comment: '',
      commentsArr: [],

      // Данные для купона
      couponNumber: '',
      productFullName: '',
      couponDate: '',
      productPrice: 0,

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
    isSendButton: function () {
      return !!this.productPrice && !!this.fullname && !!this.phone && !!this.address;
    },
    selectPropertyClass: function () {
      if (this.propertyOptions.length && this.premiumOptions.length) {
        return 'large-4'
      }
      if (this.propertyOptions.length || this.premiumOptions.length) {
        return 'large-6'
      }

      return 'large-12'

    }
  },
  methods: {
    getResult: function () {

      let priceId = this.groupSelect.value + this.typeSelect.value + this.premiumSelect.value + this.propertySelect.value; 
      console.log(priceId);
      
      this.productFullName = this.groupSelect.text + ' ' + this.typeSelect.text + ' ' + this.premiumSelect.text + ' ' + this.propertySelect.text; 
      
      // написать через промисы получение даты с сервера а не с клиента
      this.couponNumber = this.groupSelect.value + '/' + this.typeSelect.value + ' - ' + getRandomInt(100,0) + ' - ' + new Date().getDay() + new Date().getMonth() + new Date().getFullYear();      
        
        axios
          .get(productPriceUrl + priceId)
          .then(r => this.productPrice = parseInt(r.data.price))
          .catch(err => console.log(err))
    
    },
    onChangeSwitch: function (elem, price) {
      elem.target.checked ?
        this.productPrice += parseInt(price)
        : this.productPrice -= parseInt(price);
    },
    onChangeGroup: function () {
      if (!!this.groupSelect) {
        this.initChoise('group');
        let typeId = this.groupSelect.value;
        this.typeOptions = typesOptions[typeId];
      }
    },
    onChangeType: function () {
      if (!!this.typeSelect) {
        this.initChoise('type');

        let premiumId = this.typeSelect.value;
        let propertyId = this.typeSelect.value;

        if (premiumOptions[premiumId]) {
          this.premiumOptions = premiumOptions[premiumId];
        }
        if (!premiumOptions[premiumId]) {
          this.propertyOptions = propertyOptions[propertyId];
        }

        if (!premiumOptions[premiumId] && !propertyOptions[propertyId]) {
          this.getResult();
        }

      }
    },
    onChangePremium: function () {
      if (!!this.premiumSelect) {
        this.initChoise('premium');

        let propertyId = this.premiumSelect.value;
        let additionalId = this.premiumSelect.value;
        
        if (propertyOptions[propertyId]) {
          this.propertyOptions = propertyOptions[propertyId]
        }
        if (additionalOptions[additionalId]) {
          this.additionalOptions = additionalOptions[additionalId];
        }
      }
    },

    onChangeProperty: function () {
      if (!!this.propertySelect) {
        this.initChoise('property')
        let additionalId = this.propertySelect.value;

        if (additionalOptions[additionalId]) {
          this.additionalOptions = additionalOptions[additionalId];
        }
        this.getResult();
      }
    },
    initChoise: function (stage,initObject) {

      

      switch (stage) {
        
        case 'change':
          
          // TODO функция которая берет value-name и делает маппинг на this.[value-name] = initObject.valueName
          
          for (let keyName in initObject) {
            this[keyName] = initObject[keyName];
          }

          
          

          break; 

        case 'new':
          
          this.groupSelect = '';

          this.typeSelect = '';
          this.typeOptions = '';

          this.premiumSelect = '';
          this.premiumOptions = [];

          this.propertySelect = '';
          this.propertyOptions = [];

          this.additionalOptions = [];
          this.chekedAdditionalOptions = [];

          this.productPrice = 0;

          this.fullname = '';
          this.phone = '';
          this.address = '';
          this.comment = '';
        
          
          this.couponNumber = '';
          this.productFullName = '';
          this.couponDate = '';
          

          break;
        case 'group':

          this.typeSelect = '';

          this.premiumSelect = '';
          this.premiumOptions = [];

          this.propertySelect = '';
          this.propertyOptions = [];

          this.additionalOptions = [];
          this.chekedAdditionalOptions = [];

          this.productPrice = 0;
          break;
        case 'type':


          this.premiumSelect = '';
          this.premiumOptions = [];

          this.propertySelect = '';
          this.propertyOptions = [];

          this.additionalOptions = [];
          this.chekedAdditionalOptions = [];

          this.productPrice = 0;
          break;
        case 'premium':

          this.propertySelect = '';
          this.propertyOptions = [];

          this.additionalOptions = [];
          this.chekedAdditionalOptions = [];

          this.productPrice = 0;
          break;
        case 'property':

          this.additionalOptions = [];
          this.chekedAdditionalOptions = [];

          this.productPrice = 0;
          break;
        default:
          console.log('initChoise default handle');
          break;
      }

    },
    newOrder:function () {
      this.initChoise('new')
    },
    sendOrder:function () {
      
      if (this.comment) { this.commentsArr.push(this.comment)};

      let order = {
        
        groupSelect: this.groupSelect,
        groupOptions: this.groupOptions,
        typeSelect: this.typeSelect,
        typeOptions: this.typeOptions,
        propertySelect: this.propertySelect,
        propertyOptions: this.propertyOptions,
        premiumSelect: this.premiumSelect,
        premiumOptions: this.premiumOptions,
        additionalOptions: this.additionalOptions,
        showAdditionalOptions: this.showAdditionalOptions,
        chekedAdditionalOptions: this.chekedAdditionalOptions,
        fullname: this.fullname,
        phone: this.phone,
        address: this.address,
        comments: this.commentsArr,
        
        productId: this.groupSelect.value + this.typeSelect.value + this.premiumSelect.value + this.propertySelect.value,
        couponNumber: this.couponNumber,
        productFullName: this.productFullName,
        couponDate: this.couponDate,
        productPrice: this.productPrice,
        
        creationUser: this.username,
        creationDate: new Date(),

        modifyDates: [],
        modifyUsers: [],
        deleted: false, 

        reservationTime: false,

        artasians: [],
        payed: false,
        logHistory: [],
        
        
        addOption1: this.chekedAdditionalOptions.length > 0 ? this.chekedAdditionalOptions[0].value : '',
        addOption2: this.chekedAdditionalOptions.length > 1 ? this.chekedAdditionalOptions[1].value : '',
        addOption3: this.chekedAdditionalOptions.length > 2 ? this.chekedAdditionalOptions[2].value : '',

      }
      
      axios
        .post('/api/postorder/', order)
        .then(r => {
          console.log('then 1' + r.data);
          return r.data;
        })
        .then(data => console.log('then 2: '+data))
        .then(() => this.initChoise('new'))
        .catch(err => console.log(err))
    }
  },
  beforeMount: function () {
    
    const getUserUrl = '/api/getuser';
    let _this = this;
      axios
        .get(getUserUrl)
        .then( function (response) {
            if (response.data.role === 'hq') {
            _this.ishq = true;
            }
            _this.username = response.data.username;
            
        })
        .catch(function (err) {
          console.log(err);
        });

    if (this.change) {
      let initObject = '';
      let id = this.id; // TODO берем ID из параметров router после нажатия кнопки 'Изменить'
      axios
        .get('/api/getorder/'+id)
        .then ( r => {
            initObject = r.data[0];
            console.log(initObject)
            this.initChoise('change', initObject);
        })
        .catch(err => console.log(err));

      
      
    }
  }



}
</script>

<style>

</style>

