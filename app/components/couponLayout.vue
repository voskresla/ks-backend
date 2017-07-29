<template>
  <div class="coupon-height pricebckg">
  <Row>
    <Col :xs="24" :sm="24" :md="12" :lg="12" class="line"></Col>
    <Col :xs="24" :md="12" :lg="12" class="coupon-view-header"> 
      <span>Купон №: {{localOrder.couponNumber}}</span>
    </Col>
  </Row>
  
  <Row>
    
    <Col :xs="24" :md="24" :lg="24" class="coupon-view-productFullName"> 
      <span >{{localOrder.productFullName}}</span>
      <p v-for="(item,index) in localAditionalProductsChecked" :key="index">
        {{localOrder.productAdditionals[item].name}}
      </p>
    </Col>
  </Row>
  
  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="line"></Col>
  </Row>
  
  <Row>
    <Col :xs="8" :sm="8" :md="8" :lg="8" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="4" :sm="4" :md="4" :lg="4" class="line"></Col> 
  </Row>

  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="line"></Col>
  </Row>

  <Row>
    <Col :xs="2" :sm="2" :md="2" :lg="2" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="18" :sm="18" :md="18" :lg="18" class="line"></Col> 
  </Row>

  <Row>
    <Col :xs="5" :sm="5" :md="5" :lg="5" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="12" :sm="12" :md="12" :lg="12" class="line"></Col> 
  </Row>

  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="coupon-view-customerFullName">
      <span >ПОКУПАТЕЛЬ: {{localOrder.customerFullName}}</span>
    </Col>
  </Row>

  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="coupon-view-customerFullName">
      <span >ТЕЛ.: {{localOrder.customerPhone}}</span>
    </Col>
  </Row>

  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="coupon-view-customerFullName">
      <span >АДРЕС: {{localOrder.customerAddress}}</span>
    </Col>
  </Row>

  <Row>
    <Col :xs="2" :sm="2" :md="2" :lg="2" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="18" :sm="18" :md="18" :lg="18" class="line"></Col> 
  </Row>

  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="coupon-view-date">
      <span>ДАТА УСТАНОВКИ: {{localOrder.masterWorkDate}}</span>
    </Col>
  </Row>  
  
  <Row>
    <Col :xs="2" :sm="2" :md="2" :lg="2" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="18" :sm="18" :md="18" :lg="18" class="line"></Col> 
  </Row>

  <Row>
    <Col :xs="5" :sm="5" :md="5" :lg="5" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="12" :sm="12" :md="12" :lg="12" class="line"></Col> 
  </Row>

  <Row>
    <Col :xs="24" :sm="24" :md="24" :lg="24" class="line"></Col>
  </Row>
  
  <Row>
    <Col :xs="8" :sm="8" :md="8" :lg="8" class="line"></Col>
    <Col :xs="1" :sm="1" :md="1" :lg="1" class="line-white"></Col>
    <Col :xs="4" :sm="4" :md="4" :lg="4" class="line"></Col> 
  </Row>
  
  <Row class="barcode-wrapper">
    <Col :xs="12" :sm="12" :md="12" :lg="12" class="barcode">
      &nbsp
    </Col>
    <Col :xs="8" :sm="8" :md="8" :lg="8" class="price"> 
      <span >&#8381 {{couponPrice}}</span>
    </Col>

  </Row> 
  
  </div>
</template>

<script>
export default {
  name: 'couponLayout',
  props: [
    'localOrder',
    'localAditionalProductsChecked'
  ],
  data: function () {
    return {

    }
  },
  computed: {
    couponPrice() {
      let additionalPriceText = this.localOrder.productPrice;
      for (var i = 0; i < this.localAditionalProductsChecked.length; i++) {
        var element = this.localAditionalProductsChecked[i];
        additionalPriceText += this.localOrder.productAdditionals[element].price

      }
      return additionalPriceText
    }
  },
  methods: {}
}
</script>

<style>

</style>