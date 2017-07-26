<template>
  <div class="large-4 small-12 column pricebckg">
    <div class="row">
      <div class="large-7 columns line">
  
      </div>
      <div class="large-5 columns">
        №: {{localOrder.couponNumber}}
      </div>
    </div>
  
    <div class="row">
      <div class="large-10 columns line">
      </div>
    </div>
  
    <div class="row">
      <div class="large-10 columns productname">
        <h6 class="">
          <strong>
            <p>{{localOrder.productFullName}}</p>
            <p v-for="(item,index) in localAditionalProductsChecked" :key="index">
              {{localOrder.productAdditionals[item].name}}
            </p> 
          </strong>
        </h6>
      </div>
    </div>
  
    <div class="row">
      <div class="large-4 columns line"></div>
      <div class="large-1 columns"></div>
      <div class="large-6 columns line"></div>
    </div>
    <div class="row">
      <div class="large-8 columns line"></div>
    </div>
  
    <div class="row">
      <div class="large-4 columns data">{{localOrder.couponSaleDate}}</div>
      <div class="large-5 columns line"></div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns line"></div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns text-left fullname">
        {{localOrder.customerFullName}}
      </div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns text-left tel">
        {{localOrder.customerPhone}}
      </div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns text-left tel">
        {{localOrder.customerAddress}}
      </div>
  
    </div>

    <div class="row">
      <div class="large-10 columns text-left tel">
        {{localOrder.masterWorkDate}}
      </div>
  
    </div>
  
    <div class="row lastline">
      <div class="large-1 columns line"></div>
      <div class="large-1 columns"></div>
      <div class="large-9 columns line"></div>
  
    </div>
  
    <div class="row">
      <div class="large-3 columns line"></div>
      <div class="large-1 columns"></div>
      <div class="large-6 columns line"></div>
  
    </div>
  
    <div class="row bottomprice">
      <div class="large-5 columns barcode">
  
      </div>
      <div class="columns text-right">
        <span class="price">&#8381 {{couponPrice}}</span>
      </div>
    </div>
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
    couponPrice () {
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