<template>
  <div>
    <Card v-for="item in claims" :key="item._id" class="card-claim">
      <p slot="title">
        <Tag :color="item.status === 'open' ? 'red' : 'green'">{{item.status === 'open' ? 'в работе' : 'закрыта'}}</Tag><a @click="handleClaimClick(item._id)">{{item._id}}</a></p>
      <p>{{item.text}}</p>
      <p class="claim-bottom-info">{{item.claimCategory}} | {{item.creationUser}} | {{item.creationDate}}</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'cliamsLayout',
  props: ['claims'],
  data: function () {
    return {

    }
  },
  methods: {
    handleClaimClick(claimid) {
      this.$store.commit('changeClaimIdInStore', { claimId: claimid })
      this.$emit('changeClaimCurrentView')
    }
  },
  
}
</script>

<style scoped>

</style>