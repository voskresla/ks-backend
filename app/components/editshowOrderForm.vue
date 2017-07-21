<template>
<div>
  {{productKey}}
  edit-show
  
</div>
</template>

<script>
export default {
  name: 'editshowOrderForm',
  data: function() {	
    return {
      
        
        orderKsId: '',
        orderCreateAt: '',
        orderUpdateAt: '',
        orderLastModify: '',

        couponNumber: '',
        couponSaleDate: '',
        couponPrice: '',
        couponExtraInfo: '',

        customerFullName: '',
        customerAddress: '',
        customerPhone: '',
        customerComment: '',

        productKey: [],
        productPrice: '',

        masterKsId: '',
        masterFullname: '',
        masterPhone: '',

      
    }
  },
  methods: {},
}
</script>

<style scoped>

</style>