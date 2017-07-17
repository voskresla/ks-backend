<template>
  <div class="large-4 small-12 column pricebckg">
    <div class="row">
      <div class="large-7 columns line">
  
      </div>
      <div class="large-5 columns">
        №: {{couponNumber}}
      </div>
    </div>
  
    <div class="row">
      <div class="large-10 columns line">
      </div>
    </div>
  
    <div class="row">
      <div class="large-10 columns productname">
        <h6 class="">
          <strong>{{productFullName}}</strong>
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
      <div class="large-4 columns data">{{couponDate}}</div>
      <div class="large-5 columns line"></div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns line"></div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns text-left fullname">
        {{fullname}}
      </div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns text-left tel">
        {{phone}}
      </div>
  
    </div>
  
    <div class="row">
      <div class="large-10 columns text-left tel">
        {{address}}
      </div>
  
    </div>

    <div class="row">
      <div class="large-10 columns text-left tel">
        {{dateValue}}
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
        <span class="price">&#8381 {{productPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'storelayout',
  props: [
    'couponNumber',
    'productFullName',
    'couponDate',
    'fullname',
    'phone',
    'address',
    'productPrice',
    'dateValue'
  ],
  data: function () {
    return {

    }
  },
  methods: {}
}
</script>

<style>

</style>