<template>
  <div>
  
    <Card v-for="item in currentClaimFromClaimsProp" :key="item._id" class="card-claim">
      <p slot="title">
        <Tag :color="item.status === 'open' ? 'red' : 'green'">{{item.status === 'open' ? 'в работе' : 'закрыта'}}</Tag>
        <a @click="handleClaimClick(item._id)">{{item._id}}</a>
      </p>
      <p>{{item.text}}</p>
      <p class="claim-bottom-info">{{item.claimCategory}} | {{item.creationUser}} | {{item.creationDate}}</p>
    </Card>

    <div v-for="(item, index) in currentClaimComments" :key="index" class='claim-comment'>
      <p>{{item.text}}</p>
      <p class="claim-comment-bottom-info">{{item.user}}</p>
    </div>

    <Row>
      <Input v-model="claimCommentText" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="Пиши Ебко! Плизки, фастиком!"></Input>
      <Button type="primary" @click="handleSendClaimCommentClick">Отправить</Button>
      <Button type="info" @click="handleChangeClaimStatusToClosed">Сменить статус</Button>
    </Row>
  
    <!-- <a @click="handleCloseClaimClick">закрыть</a> -->
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'claimForm',
  props: ['claims'],
  data: function () {
    return {
      claimCommentText: ''
    }
  },
  computed: {
    currentClaimFromClaimsProp() {
      return this.claims.filter((item) => {
        return item._id === this.$store.state.claimComponents.claimId
      })
    },
    currentClaimComments() {
      return this.currentClaimFromClaimsProp[0].commentsArr
    }
  },
  methods: {
    // handleCloseClaimClick() {
    //   this.$emit('changeClaimCurrentView')
    // },
    handleSendClaimCommentClick: function () {
      if (!this.claimCommentText) {
        this.$Message.error('Нахуй нам твой пустой комментарий не нужен.');
      } else {
        let tmpArr = this.currentClaimComments.slice();
        let pushComment = { id: new Date(), text: this.claimCommentText, user: this.$store.state.user.user };
        tmpArr.push(pushComment);
        
        axios
          .put('/api/updateclaim/' + this.currentClaimFromClaimsProp[0]._id, { commentsArr: tmpArr })
          .then(() => {
            this.currentClaimFromClaimsProp[0].commentsArr.push(pushComment);
            this.claimCommentText = '';
          })
          .catch(err => console.log(err));
      }

    },
    handleChangeClaimStatusToClosed: function () {
      
      let updateObject = {
        status: 'closed'
      }

      axios
        .put('/api/updateclaim/'+this.currentClaimFromClaimsProp[0]._id, updateObject)
        .then(() => {
          this.currentClaimFromClaimsProp[0].status = 'closed'
        })
    }
  }
}
</script>

<style scoped>

</style>