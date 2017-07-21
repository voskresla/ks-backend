<template>
  <div>
    <Row type="flex" justify="center" align="top" class="category-card-wrapper">
      <Col :xs="22" :sm="22" :md="18" :lg="18">
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Стиральные и посудомоечные машины</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <a @click="handleLinkClick(item.id)">{{item['Наименование услуги']}}</a>
          </li>
          <!-- <li>
            <a @click="handleLinkClick('value')">Подключ. DW (стандарт)</a>
          </li>
          <li>
            <a href="#">Подключ. WM (стандарт)</a>
          </li>
          <li>
            <a href="#">Подключ. DW (Премиум)</a>
          </li>
          <li>
            <a href="#">Подключ. WM (Премиум)</a>
          </li>
          <li>
            <a href="#">Подключ.В\ DW (стандарт)</a>
          </li>
          <li>
            <a href="#">Подключ.В\ WM (стандарт)</a>
          </li>
  
          <li>
            <a href="#">Подключ. дораб.слива</a>
          </li>
          <li>
            <a href="#">Подключ. дораб.водоснабжения</a>
          </li>
          <li>
            <a href="#">Подключ. дораб.электросети</a>
          </li> -->
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Кондиционеры</h4>
        <ul>
          <li>
            <a href="#">Подключ.кондиц. (7000-9000)</a>
          </li>
          <li>
            <a href="#">Подключ.кондиц. (12000-16000)</a>
          </li>
          <li>
            <a href="#">Подключ.кондиц. (18000-24000)</a>
          </li>
          <li>
            <a href="#">Подкл. Обслуж.кондиц.(станд)</a>
          </li>
          <li>
            <a href="#">Подкл.демонтаж AC(7000-9000)</a>
          </li>
          <li>
            <a href="#">Подкл.демонтаж AC(12000)</a>
          </li>
          <li>
            <a href="#">Подкл.демонтаж AC(16000-24000)</a>
          </li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Электро плиты / панели / духовки и вытяжки</h4>
        <ul>
          <li>Подключ. Эл.плиты(стандарт)</li>
          <li>Подключ.В\Эл.панель (незав)</li>
          <li>Подключ.В\Эл.шкаф (незав)</li>
          <li>Подключ.В\Эл.пан. и шкаф(зав)</li>
          <li>Подключ.В\Вытяжки</li>
          <li>Подключ.вытяжки (плоской)</li>
          <li>Подключ.вытяжки (купольной)</li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>ТВ и домашние кинотеатры</h4>
        <ul>
          <li>Подкл. ТВ до 46" </li>
          <li>Подкл. ТВ свыше 46" </li>
          <li>Подкл. ТВ до 46" (Подвес) </li>
          <li>Подкл. ТВ свыше 46" (Подвес) </li>
          <li>Подкл. ТВ до 32" </li>
          <li>Подкл. ТВ до 32" (Подвес) </li>
          <li>Подкл. ТВ свыше 65" </li>
          <li>Подкл. ТВ свыше 65" (Подвес) </li>
          <li>Подкл. Дом.кинот.1 кор.(уст.) </li>
          <li>Подкл. Дом.кинот.1 кор.(подв.)</li>
        </ul>
      </div>
      </Col>
      </Col>
    </Row>
  
    <Row type="flex" justify="center" align="top" class="category-card-wrapper">
      <Col :xs="22" :sm="22" :md="18" :lg="18">
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Водонагреватели</h4>
        <ul>
          <li>Подключ. WH проточн. элек.</li>
          <li>Подключ. WH накопит.эл(до 50л)</li>
          <li>Подключ. WH накопит.эл(от 51л)</li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Холодильники</h4>
        <ul>
          <li>Подключ.В\RF</li>
          <li>Подключ.RF Side-by-Side(станд)</li>
          <li>Подключ.RF (стандарт)</li>
          <li>Подк.дор.RF пер.дв. с эл. дисп</li>
          <li>Подкл.дор.RFпер.дв.без эл.дисп</li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Спутниковые тарелки</h4>
        <ul>
          <li>Подкл. тестиров. спутн. сигн.</li>
          <li>Подкл. спутн.тел.(d до 0.79м)</li>
          <li>Подкл. спутн.тел.(d от 0.8м)</li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      </Col>
      </Col>
    </Row>
</div>
</template>

<script>
export default {
  name: 'categoryList',
  data: function () {
    return {
      
    }
  },
  methods: {
    handleLinkClick (value) {
      this.$store.commit('changeOrderLayoutState', { init: false, key: value })
    }
  },
  computed: {
    products () {
      //onsole.log(this.$store.getters('getProductsForCategoryList'))
      return this.$store.getters.getProductsForCategoryList
    }
  }
}
</script>

<style scoped>

</style>