<template>
  <div>
    <Button type="primary" @click="openNewClaimModal = true">Добавить претензию</Button>
    <Modal v-model="openNewClaimModal" :closable="false" :mask-closable="false">
      <div slot="header">
         Новая претензия
      </div>
      <Input v-model="claimText" type="textarea" :rows="10"></Input>
    <Select v-model="claimCategory" style="width:200px" placeholder="Выберите категорию">
        <Option v-for="item in claimCategoryList" :value="item.value" :key="item">{{ item.label }}</Option>
    </Select>
      <div slot="footer">
        <Button type="primary" @click="openNewClaimModal = false">Закрыть</Button>
        <Button type="primary" @click="sendNewClaim">Добавить</Button>
      </div>
    </Modal>


    
    
  </div>  
</template>

<script>
import axios from 'axios';
let claimCategoryList = [
  {
    value: 'category1',
    label: 'категория 1'
  },
  {
    value: 'category2',
    label: 'категория 2'
  },
  {
    value: 'category3',
    label: 'категория 3'
  },
  {
    value: 'category4',
    label: 'категория 4'
  },
]

export default {
  name: 'calimMakeCommentLayout',
  props: ['orderId','username'],
  data: function () {
    return {
       openNewClaimModal: false,
       claimCategoryList: claimCategoryList,
       claimText: '',
       claimCategory: ''
    }
  },
  methods: {
    sendNewClaim: function () {
      // TODO обрати внимание что потом этот массив будет браться из пропсов
      let commentsArr = [];
      commentsArr.push({
        id: new Date(),
        text: this.claimText,
        user: this.username
      })

      let claimObject = {
        orderId: this.orderId,
        commentsArr: commentsArr,
        status: 'open',
        creationUser: this.username,
        creationDate: new Date(),
        claimCategory: this.claimCategory
      }

      axios
        .post('/api/postclaim/', claimObject)
        .then(() => {
          this.$emit('refresh');
          this.openNewClaimModal = false;
          this.$Message.info('Претензия отправлена');
          
        })
    }
  },
  
}
</script>

<style>
  
</style>
