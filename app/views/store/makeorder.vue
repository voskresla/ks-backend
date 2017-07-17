
<template>
  <div>
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
              <div class="large-4 columns">
                <input type="text" placeholder="Иванов Иван Иванович" required v-model="fullname">
              </div>
              <div class="large-4 columns">
                <input type="text" placeholder="+7 (999) 945 94 93" required v-model="phone">
              </div>
              <div class="large-4 columns">
                <Date-picker :value="dateValue" @on-change="handleDateChange" type="date" placeholder="Выберите дату установки" :options="dateOptions"></Date-picker>
              </div>
            </div>
            <div class="row">
  
            </div>
            <div class="row">
              <div class="large-12 columns">
                <input type="text" placeholder="Йошкра-Ола, Садовая 11-14" required v-model="address">
              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <Select 
                v-model="suggestions"
                filterable
                remote
                :remote-method="suggestionRemote">
                  <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.value}}</Option>
                </Select>
              </div>
            </div>
  
            

            <div v-if="!change" class="row">
              <div class="large-12 column ">
                <textarea name="" id="" cols="30" rows="4" class="textarea" v-model="comment"></textarea>
              </div>
            </div>
          </div>
          <!--COUPON SIDE -->

          <coupon :dateValue='dateValue' :couponNumber='couponNumber' :productFullName='productFullName' :couponDate='couponDate' :fullname='fullname' :phone='phone' :address='address' :productPrice='productPrice'>
          </coupon>
          
        </div>
      </div>
  
    </div>
    <!--BUTTONS SECTION -->
    <div class="row">
      <div v-if="!change" class="columns text-center buttons">
        <button class="button" type="submit" value="Submit" @click.prevent.stop="newOrder">Новая заявка</button>
      </div>
      <div class="columns text-center buttons">
        <button v-if="!change" class="button" type="submit" value="Submit" :disabled="!isSendButton" @click.prevent="sendOrder">Отправить заявку на кассу</button>
        <button v-if="change" class="button" type="submit" value="Submit" :disabled="!isSendButton" @click.prevent="changeOrder">Принять изменения</button>
      </div>
  
    </div>
  </form>
  
  <template v-if="change">
    <Tabs value="tabs">
      <Tab-pane label="Комментарии">
        <comments :orderId="id" :commentsArr="commentsArr" :username="username"></comments>
      </Tab-pane>
      <Tab-pane label="Претензии">
        <claims :orderId="id" :username="username"></claims>
        <!--<claims></claims>-->
      </Tab-pane>
      <Tab-pane label="История">
        History Component
        <!--<history></history>-->
      </Tab-pane>
    </Tabs>
  </template>

  </div>
</template>

<script>


import axios from 'axios';

function getProductFullName (priceId) {
  let fullname = fullNamesArr[priceId]
  return fullname;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let productPriceUrl = '/api/getproductprice/'; // param1 = db.prices.priceid = 'BTWMWMB'
let coupon = require('./coupon.vue');
let comments = require('./comments.vue');
let claims = require('./claims.vue');

let fullNamesArr = {
  "BTE": "Подключ. Эл.плиты(стандарт)",
  "BTDMDM_BASIC_MS": "Подключ. DW (стандарт)",
  "BTWMWM_BASICWMS_BASIC": "Подключ. WM (стандарт)",
  "BTDMDM_VIPDMS": "Подключ. DW (Премиум)",
  "BTWMWM_VIPWMS": "Подключ. WM (Премиум)",
  "ADD_WM_G": "Подключ. дораб.слива ",
  "ADD_WM_W": "Подключ. дораб.водоснабжения",
  "ADD_WM_E": "Подключ. дораб.электросети",
  "CONDCOND_SETUP7000": "Подключ.кондиц. (7000-9000)",
  "CONDCOND_SETUP12000": "Подключ.кондиц. (12000)",
  "CONDCOND_SETUP16000": "Подключ.кондиц. (16000-24000)",
  "BTEP": "Подключ.В\\Эл.панель (незав)",
  "BTO": "Подключ.В\\Эл.шкаф (незав)",
  "BTOEPA": "Подключ.В\\Эл.пан. и шкаф(зав)",
  "BTDMDM_BASIC_MB": "Подключ.В\\ DW (стандарт)",
  "BTWMWM_BASICWMB_BASIC": "Подключ.В\\ WM (стандарт)",
  "BTVVB": "Подключ.В\\Вытяжки",
  "BTHHB": "Подключ.В\\RF",
  "BTWWP": "Подключ. WH проточн. элек.",
  "BTWW50": "Подключ. WH накопит.эл , до 50 л",
  "BTWW00": "Подключ. WH накопит.эл, от 51 л",
  "": "Подкл.дор.RFпер.дв.без эл.дисп",
  "BTHHSS": "Подключ.RF Side-by-Side(станд)",
  "BTVVP": "Подключ.вытяжки (плоской)",
  "BTVVK": "Подключ.вытяжки (купольной)",
  "TVTV_HOME_SETUP": "Подкл. Дом.кинот.1 кор.(уст.)",
  "TVTV_HOME_WALL": "Подкл. Дом.кинот.1 кор.(подв.)",
  "SATSAT_TEST": "Подкл. тестиров. спутн. сигн.",
  "SATSAT_SETUPSAT_SETUP_79": "Подкл. спутн.тел.(d до 0.79м)",
  "SATSAT_SETUPSAT_SETUP_00": "Подкл. спутн.тел.(d от 0.8м)",
  "BTHHS": "Подключ.RF /стандарт/",
  "": "Подк.дор.RF пер.дв. с эл. дисп",
  "": "Дораб. сбор.мебели",
  "": "Подкл. игр.консоль",
  "TVTV_SETUPTV_SETUP_46": "Подкл. ТВ до 46",
  "TVTV_SETUPTV_SETUP_00": "Подкл. ТВ свыше 46",
  "TVTV_WALLTV_SETUP_46": "Подкл. ТВ до 46",
  "TVTV_WALLTV_SETUP_00": "Подкл. ТВ свыше 46",
  "TVSMART": "Дораб. SMART +",
  "": "Подкл.фильтра воды(3степени)",
  "": "Подкл.выезд мастера /по городу",
  "CONDCOND_SERVICE": "Подкл. Обслуж.кондиц.(станд)",
  "": "Подкл.демонтаж WM/DW(станд)",
  "": "Подкл.демонтаж В\\WM/DW(станд)",
  "CONDCOND_REMOVE7000": "Подкл.демонтаж AC(7000-9000)",
  "CONDCOND_REMOVE12000": "Подкл.демонтаж AC(12000)",
  "CONDCOND_REMOVE16000": "Подкл.демонтаж AC(16000-24000)",
  "TVTV_SETUPTV_SETUP_32": "Подкл. ТВ до 32",
  "TVTV_WALLTV_SETUP_32": "Подкл. ТВ до 32",
  "": "Подкл. ТВ свыше 65",
  "": "Подкл. ТВ свыше 65",
  "": "Дораб. Маршрутизатор Wi-Fi",
  "": "Дораб.NAS(сетевое хранилище)",
  "": "Дораб. Пульт ДУ универсальный",
  "": "Дораб. CAM-модуль",
  "": "Дораб. Саундбар     ",
  "": "Дораб. Саундбар (Подвес)",
  "CC_ROUTE": "Настройка интернет подключения (подключение роутера)",
  "CC_HARDWARE": "Подключение периферийного устройства",
  "C__SERVICE": "Настройка и оптимизация",
  "C__OS": "Операционная система (установка ОС)"
}

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
    { text: 'Доработки', value: 'ВMB' },
  ]
}

let propertyOptions = {
  WM_BASIC: [
    { text: 'Встроенная', value: 'WMB_BASIC' },
    { text: 'Соло', value: 'WMS_BASIC' }
  ],
  WM_VIP: [
    // { text: 'Встроенная', value: 'WMB' },
    { text: 'Соло', value: 'WMS' }
  ],
  DM_BASIC: [
    { text: 'Встроенная', value: 'ВMB' },
    { text: 'Соло', value: 'ВMS' }
  ],
  DM_VIP: [
    // { text: 'Встроенная', value: 'DMB' },
    { text: 'Соло', value: 'DMS' }
  ],
  H: [
    { text: 'Встроенный', value: 'HB' },
    { text: 'Соло', value: 'HS' },
    { text: 'Side-by-Side', value: 'HSS' },
    { text: 'Доработки', value: 'HB' },
  ],
  // 'Подключ. Эл.плиты(стандарт)': [],
  // EP: [],
  // O: [],
  // OEPA: [],
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
    { text: '7000-9000', value: '7000' },
    { text: '12000', value: '12000' },
    { text: '16000-24000', value: '18000' }
  ],
  COND_REMOVE: [
    { text: '7000-9000', value: '7000' },
    { text: '12000', value: '12000' },
    { text: '16000-24000', value: '16000' }
  ],
  // COND_SERVICE: [],
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
  // TV_HOME_SETUP: [],
  // TV_HOME_WALL: [],
  // SMART: [],
  // SAT_TEST: [],
  SAT_SETUP: [
    { text: 'Диаметр до 0.79', value: 'SAT_SETUP_79' },
    { text: 'Диаметр свыше 0.8', value: 'SAT_SETUP_00' }
  ],
  // C_ROUTE: [],
  // C_HARDWARE: [],
  // С_SERVICE: [],
  // C_OS: []

}

let additionalOptions = {
  WMS_BASIC: [
    { text: 'Доработка электросети', value: 'ADD_WM_E', price: '400' },
    { text: 'Доработка водоснабжения', value: 'ADD_WM_W', price: '500' },
    { text: 'Доработка слива', value: 'ADD_WM_G', price: '600' }
  ],
  WMB_BASIC: [
    { text: 'Доработка электросети', value: 'ADD_WM_E', price: '400' },
    { text: 'Доработка водоснабжения', value: 'ADD_WM_W', price: '500' },
    { text: 'Доработка слива', value: 'ADD_WM_G', price: '600' }
  ],
  ВMS: [
    { text: 'Доработка электросети', value: 'ADD_WM_E', price: '400' },
    { text: 'Доработка водоснабжения', value: 'ADD_WM_W', price: '500' },
    { text: 'Доработка слива', value: 'ADD_WM_G', price: '600' }
  ],
  ВMB: [
    { text: 'Доработка электросети', value: 'ADD_WM_E', price: '400' },
    { text: 'Доработка водоснабжения', value: 'ADD_WM_W', price: '500' },
    { text: 'Доработка слива', value: 'ADD_WM_G', price: '600' }
  ],
  HS: [
    { text: 'Перенавес дверей холодильника с электронным табло', value: 'ADD_HE', price: '100' },
    { text: 'Перенавес дверей холодильника без электронным табло', value: 'ADD_H', price: '100' }, 
  ],
  HB: [
    { text: 'Перенавес дверей холодильника с электронным табло', value: 'ADD_HE', price: '100' },
    { text: 'Перенавес дверей холодильника без электронным табло', value: 'ADD_H', price: '100' }, 
  ]
}

export default {
  
  name: 'makeorderComponent',
  props: ['change','id'],
  data: function () {
    return {
      dateValue: '',
      dateOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
        shortcuts: [
          {
            text: 'Стандартная',
            value() {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
              return date;
            },
            onClick: (picker) => {
              // this.$Message.info('');
            }
          }
        ]
      },

      suggestions: '',
      options1: [],

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
    coupon: coupon,
    comments: comments,
    claims: claims
    
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
    handleDateChange (data) {
      this.dateValue = data;
    },
    suggestionRemote: function (value) {
      axios
        .post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {

          "query": value,
          "count": 3,
          "locations": [{
            "region": "Марий Эл"
          }],
          "restrict_value": true
            
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token daa7df9d3d75b308e28317375c6c0587d5c17c06',
          }
        })
        .then(r => {
          this.options1 = r.data.suggestions

          })
    }
    ,
    getResult: function (priceId) {

      let city = "Йошкар-Ола";

      console.log(priceId);
      
      //this.productFullName = getProductFullName(priceId); 
      
      // написать через промисы получение даты с сервера а не с клиента
      this.couponNumber = this.groupSelect.value + '/' + this.typeSelect.value + ' - ' + getRandomInt(100,0) + ' - ' + new Date().getDay() + new Date().getMonth() + new Date().getFullYear();      
        
        axios
          .get(productPriceUrl + priceId)
          .then(r => {
            this.productPrice = parseInt(r.data[city]);
            this.productFullName = r.data['Наименование услуги']
          })
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
        if (!premiumOptions[premiumId] && propertyOptions[propertyId]) {
          this.propertyOptions = propertyOptions[propertyId];
        }

        if (!premiumOptions[premiumId] && !propertyOptions[propertyId]) {
          this.getResult(this.groupSelect.value + this.typeSelect.value);
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
        this.getResult(this.groupSelect.value + this.typeSelect.value + (this.premiumSelect.value || '') + this.propertySelect.value);
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
          this.dateValue = '';
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
    changeOrder: function () {
      alert('changeOrder handler call')
    },
    sendOrder: function () {
      
      

      if (this.comment) { this.commentsArr.push(
        {
          text : this.comment,
          user : this.username
        })};

        

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
        dateValue: this.dateValue,
        commentsArr: this.commentsArr,
        
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
        payDate: '',
        logHistory: [],
        
        
        addOption1: this.chekedAdditionalOptions.length > 0 ? this.chekedAdditionalOptions[0].value : '',
        addOption2: this.chekedAdditionalOptions.length > 1 ? this.chekedAdditionalOptions[1].value : '',
        addOption3: this.chekedAdditionalOptions.length > 2 ? this.chekedAdditionalOptions[2].value : '',

      }
      
      console.log(order.productId);

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
            _this.username = response.data.user;
            
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
  },
  watch: {
    address: function (value) {
      axios
        .post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {

          "query": value,
          "count": 3,
          "locations": [{
            "region": "Марий Эл"
          }],
          "restrict_value": true
            
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token daa7df9d3d75b308e28317375c6c0587d5c17c06',
          }
        })
        .then(r => {
          console.log(r.data)

          })
    }
  }



}
</script>

<style>

</style>

