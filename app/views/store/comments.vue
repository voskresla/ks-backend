<template>
  <div>
    {{tableColumns}}<!--<Table></Table>-->
  </div>
</template>

<script>
export default {
  name: 'comments',
  props: ['orderId','commentsArr'],
  data: function () {
    return {
      
    }
  },
  computed: {
    tableColumns: function () {
      
      let object = [];


      for (var index = 0; index < this.commentsArr.length; index++) {
        var element = this.commentsArr[index];
        var tmpArr = {};
        for (var keyName in element) {
             
             tmpArr[keyName] = element[keyName];
        }
        console.log(tmpArr)
        object.push(tmpArr);
      }

      return object;

      // return Array.apply(null, commentsArr).map(function (item,index) {
      //     let object;
      //     for (keyName in item) {
      //       object[keyName] = item[keyName];
      //     }
      //     return object;
      // })
    }
  }
}
</script>

<style>

</style>
