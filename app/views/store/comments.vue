<template>
  <div>
    <Table :columns="columns" :data="commentsArr"></Table>
    <Input v-model="comment" type="textarea" placeholder="Старайтесь писать лкончиный комментарий. Пишите ебко!" :rows="10"></Input>
    <Button type="primary" @click="sendComment">Отправить</Button>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'comments',
  props: ['orderId', 'commentsArr', 'username'],
  data: function () {
    return {
      comment: '',
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: 'text',
          key: 'text'
        },
        {
          title: 'user',
          key: 'user'
        }
      ]
    }
  },
  computed: {
    // TODO Дописать сортировку массива по будущему полю времени комментария чтобы выводить их с последнего по первый
  },
  methods: {
    sendComment: function () {

      if (!this.comment) {

        this.$Message.error('Нахуй нам твой пустой комментарий не нужен.');

      } else {

        let tmpArr = this.commentsArr.slice();
        let pushComment = { id: new Date(), text: this.comment, user: this.username };
        tmpArr.push(pushComment);

        axios
          .put('/api/updateorder/' + this.orderId, tmpArr)
          .then(() => {
            this.commentsArr.push(pushComment);
            this.comment = '';
          })
          .catch(err => console.log(err));
      }
    }
  }
}
</script>

<style>

</style>
