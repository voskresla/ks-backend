<template>
  <Row class="header-row" type="flex" justify="center" align="middle">
    <Col class="wrapper-18" :xs="22" :sm="22" :md="18" :lg="18">
      <Row class="wrapper-row" type="flex" justify="space-between" align="middle">
        <Col class="header-buttons" :lg="6">
          <Button type="ghost" shape="circle" icon="ios-plus" @click="handleNewOrderClick" class='header-button'></Button>
          <Button type="ghost" shape="circle" icon="ios-paper" @click="handleAllOrdersClick" class='header-button'></Button>
          <Button type="ghost" shape="circle" icon="android-notifications" @click="handleAllClaimsClick" class='header-button'></Button>
        </Col>
          
        <Col class="header-search" :lg="6">
          <Input v-model="inputSearch" placeholder="поиск" style="width: 100%">
            <span slot="prepend"><Icon type="search" size="20"></Icon></span>
          </Input>
        </Col>
  
        <Col class="header-user" :lg="6">
          <Icon type="person" size="20" color="#ffffff"></Icon>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'headerComponent',
  data: function() {	
    return {
      inputSearch: ''
    }
  },
  methods: {
    handleNewOrderClick () {
      this.$store.commit('changeOrderLayoutState', { init: true, key: false })
      this.$router.push({ name: 'newOrder' })
    },
    handleAllOrdersClick () {

    },
    handleAllClaimsClick () {

    }
  }
}
</script>

<style scoped>

</style>