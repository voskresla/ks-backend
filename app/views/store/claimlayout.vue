<template>
  <div>
    <Card>
      <p slot="title">
         Претензия
      </p>
      <p slot="extra">
         юзер / категория / дата и время
      </p>
      Текст претензии
    </Card>
    <Card>
      <p slot="title">
         Заявка {{orderid}}
      </p>
      <p slot="extra">
         action buttons
      </p>
      Краткая инфа по заявке
    </Card>

    + Table для комментариев

    <Input v-model="claimCommentText" placeholder="Пиши Ебко! Плизки, фастиком!"></Input>
    <Button type="primary" @click="sendClaimComment">Отправить</Button>

  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'claimLayout',
  props: ['orderid'],
  data: function() {	
    return {
      claimCommentText: ''
    }

  },
  methods: {
    sendClaimComment: function () {
      alert ('send claim comment handler')
    }
  }
}
</script>

<style scoped>

</style>

