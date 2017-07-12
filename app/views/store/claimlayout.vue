<template>
  <Row>
    <Row :gutter="10">
      <Col span="14">
      <Card>
        <p slot="title">
          Претензия № {{claim._id}}
        </p>
        <p slot="extra">
          {{claim.creationUser}} / {{claim.claimCategory}} / {{claim.creationDate}} / {{claim.status}}
        </p>
        {{claim.text}}
      </Card>
      </Col>
      <Col span="10">
      <Card>
        <p slot="title">
          Заявка {{order.couponNumber}}
        </p>
        <p slot="extra">
          action buttons
        </p>
        <p>{{order.productFullName}}</p>
        <p>{{order.fullname}}</p>
        <p>{{order.phone}}</p>
        <p>{{order.address}}</p>
        <p>{{order.payed}}</p>
        <p></p>
        <p></p>
      </Card>
      </Col>
    </Row>
    <Row>
  
       <Table :columns="columnClaimComments" :data="claim.commentsArr"></Table> 
  
    </Row>
    <Row>
      <Input v-model="claimCommentText" placeholder="Пиши Ебко! Плизки, фастиком!"></Input>
      <Button type="primary" @click="sendClaimComment">Отправить</Button>
      <Button type="info" @click="sendClaimStatusClosed">Закрыть претензию</Button>
    </Row>
  </Row>
</template>

<script>

import axios from 'axios'


export default {
  name: 'claimLayout',
  props: ['claimid'],
  data: function () {
    return {
      claimCommentText: '',
      claim: {},
      order: {},
      username: '',
      columnClaimComments: [
        {
          title: '#',
          key: 'text'
        },
        {
          title: '#',
          key: 'id'
        },
        {
          title: '#',
          key: 'user'
        }
      ]


    }

  },
  methods: {
    sendClaimComment: function () {

      if (!this.claimCommentText) {

        this.$Message.error('Нахуй нам твой пустой комментарий не нужен.');

      } else {

        // let commentsArr = [];
        // commentsArr.push({
        //   id: new Date(),
        //   text: this.claimCommentText,
        //   user: this.username
        // })

        let tmpArr = this.claim.commentsArr.slice();
        let pushComment = { id: new Date(), text: this.claimCommentText, user: this.username };
        tmpArr.push(pushComment);

        axios
          .put('/api/updateclaim/' + this.claim._id, tmpArr)
          .then(() => {
            this.claim.commentsArr.push(pushComment);
            this.claimCommentText = '';
          })
          .catch(err => console.log(err));
      }

    },
    sendClaimStatusClosed: function () {
      alert('Сменить статус претензии на "закрыто"')
    }
  },
  created: function () {
    axios
      .get('/api/getclaim/' + this.claimid)
      .then(r => {
        this.claim = r.data[0];
        return r.data[0].orderId;
      })
      .then((orderId) => {
        axios
          .get('/api/getorder/' + orderId)
          .then(r => {
            this.order = r.data[0]
          })
      }

      ).catch(err => console.log(err));

    axios
      .get('/api/getuser')
      .then(r => {
        this.username = r.data.user || 'Auth plz.';
      })
      .catch(function (err) {
        console.log(err);
      });

  }
}
</script>

<style scoped>

</style>

