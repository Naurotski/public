<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="600px">
      <template v-slot:activator="{ on }">
        <v-btn :x-small="$vuetify.breakpoint.xs" color="#90CAF9" text v-on="on">
          <slot name="nameActivator">
            Муравьеды (F) - что это и зачем?
          </slot>
        </v-btn>
      </template>
      <v-card>
        <slot name="text">
          <v-card-title>
            <span style="word-break: normal" class="headline"
              >Муравьеды в MetaMorfosi. Как собирать и для чего?</span
            >
          </v-card-title>
          <v-card-text class="text-justify">
            Муравьеды - это наша внутренняя "валюта". В ценах они обозначены латинской буквой F (от
            итальянского Formichieri - муравьеды).
            <br />
            Муравьеды приносят большие скидки на участие в студиях или играх. За них можно получать
            бонусы.<br />
            За муравьедов можно присоединиться к некоторым играм и студиям. Следите за анонсами и
            обновлениями на нашем сайте.<br /><br />
            <b>Как собирать муравьедов?</b><br />
            1. Быть зарегистрированным на нашем сайте metamorfosi.eu Важно, чтобы аккаунт был
            зарегистрирован на ваш действующий e-mail.<br />
            2. Полностью пройти любую студию или мини-студию.<br />
            3. Подписаться на наши аккаунты в социальных сетях – фейсбук и инстаграм, участвовать в
            наших играх-погружениях, писать содержательные комментарии (муравьедам важно слышать
            ваши мысли!).<br /><br />
            <b>Вопросы и ответы</b><br />
            Вопрос. Как узнать, сколько муравьедов и за что можно получить?<br />
            Ответ. В анонсе каждой игры либо студии будет написано, сколько муравьедов и за что
            можно собрать.<br />
            Вопрос. Как узнать, сколько муравьедов у меня есть?<br />
            Ответ. Количество муравьедов отображается в вашем личном кабинете на сайте
            www.metamorfosi.eu.<br />
            Вопрос: Можно ли воспользоваться муравьедами после оплаты студии\игры и вернуть часть
            стоимости?<br />
            Ответ. Нет. Использовать муравьедов или нет (если они у вас есть) можно только в момент
            оплаты.<br />
            Вопрос. Можно ли подарить муравьедов другу?<br />
            Ответ. Да, можно.<br />
          </v-card-text>
        </slot>
        <v-card-actions>
          <v-spacer />
          <v-btn color="#FB8C00" text @click="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogCmp',
  data: () => ({
    dialog: false
  })
}
</script>

<style scoped />
