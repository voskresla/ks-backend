<template>
  <div>
    <div v-for="(item, index) in localOrder.commentsArr" :key="index" class='claim-comment'>
      <p>{{item.text}}</p>
      <p class="claim-comment-bottom-info">{{item.user}}</p>
    </div>
  
    <Row>
      <Input v-model="commentsCommentText" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="Пиши Ебко! Плизки, фастиком!"></Input>
      <Button type="primary" @click="handleSendCommnetsCommentClick">Отправить</Button>
      
    </Row>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'commentsLayout',
  props: ['localOrder'],
  data: function () {
    return {
      commentsCommentText: ''
    }
  },
  methods: {
    handleSendCommnetsCommentClick () {
      if (!this.commentsCommentText) {
        this.$Message.error('Нахуй нам твой пустой комментарий не нужен.');
      } else {
        let tmpArr = this.localOrder.commentsArr.slice();
        let pushComment = { id: new Date(), text: this.commentsCommentText, user: this.$store.state.user.user };
        tmpArr.push(pushComment);
        
        axios
          .put('/api/updateorder/' + this.localOrder._id, { commentsArr: tmpArr })
          .then(() => {
            this.$emit('refreshLocalOrder');
            this.commentsCommentText = '';
          })
          .catch(err => console.log(err));
      }
    }
  }
}
</script>

<style scoped>

</style>