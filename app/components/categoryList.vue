<template>
  <div>
    <Row type="flex" justify="center" align="top" class="category-card-wrapper">
      <Col :xs="22" :sm="22" :md="18" :lg="18">
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Стиральные и посудомоечные машины</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 0">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Кондиционеры</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 1">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
        </ul> 
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Электро плиты / панели / духовки и вытяжки</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 2">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>ТВ и домашние кинотеатры</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 3">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
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
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 4">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Холодильники</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 5">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
        </ul>
      </div>
      </Col>
  
      <Col :xs="22" :sm="22" :md="10" :lg="6" class="category-card">
      <div class="category-card-ul">
        <h4>Спутниковые тарелки</h4>
        <ul>
          <li v-for="(item, index) in products" :key="index">
            <div v-if="item['KS_OPERATION_CATEGORY'] === 6">
              <a @click="handleLinkClick(item.id, item['Наименование услуги'], item.additionals)">{{item['Наименование услуги']}}</a>
            </div>
          </li>
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
    handleLinkClick (key, name, additionals) {
      this.$store.commit('changeOrderLayoutState', { init: false, new: true, edit: false, key: key, name: name, all: false, id: false})
    }
  },
  computed: {
    products () {
      return this.$store.getters.getProductsForCategoryList.filter((item) => {
        let matchProductName = item['Наименование услуги'].toLowerCase().includes(this.$store.state.filterSearch.toLowerCase());
        return matchProductName
      })
    }
  }
}
</script>

<style scoped>

</style>