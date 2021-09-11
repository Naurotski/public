<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center subtitle-1 font-weight-bold"
            :class="{ 'caption font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>Либидо и Мортидо</h1></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <transition appear name="fadeGroup">
      <v-row justify="space-around" align="center">
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              С 1 мая начинаем арт-терапевтическое путешествие в мир творческой и сексуальной
              энергии в онлайн-ретрите
              <router-link :to="pathLibidoRetreat"> <b>«Пробуждение Либидо»</b></router-link
              >. <br />
              Автор понятия "либидо" – Зигмунд Фрейд. И, пожалуй, никто лучше него не знает, что он
              подразумевал. Его ученики пробовали развить тему либидо: кто-то, как Юнг, ушел от
              основного смысла – сексуального влечения, кто-то остался верен первоисточнику. Так или
              иначе, ответ на вопрос «Что такое либидо» можно найти в трудах Фрейда.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60%D0%9B%D0%B8%D0%B1%D0%B8%D0%B4%D0%BE%60%2F%D1%84%D1%80%D0%B5%D0%B9%D0%B4%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%201.jpg?alt=media&token=71f27ce3-f848-4764-ad79-4cfdd757b870"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Фрейд был <b>ученым</b>. В основе его воззрений не было мистики, только чистая
              биология. Он изучал труды биологов, и пришел к выводу, что либидо – это, условно
              говоря, движущая энергия, импульс. И этот импульс переживает (именно переживает) любая
              живая субстанция, переходя из неживого состояния в живое, а затем возвращаясь к
              смерти. То есть либидо - это именно переживание движения энергии. Иначе говоря, либидо
              - это энергия, благодаря которой мы чувствуем жизнь и живем.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Почему же либидо ассоциируется в первую очередь с сексуальной энергией? Во-первых,
              потому что Фрейд начал изучать именно сексуальные отклонения и сексуальную причину
              психических и неврологических расстройств. Таким образом, термин уже закрепился. А
              во-вторых, потому что в основе появления живого из неживого действительно лежит акт
              деления, совокупления, то есть секс в том или ином смысле.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60%D0%9B%D0%B8%D0%B1%D0%B8%D0%B4%D0%BE%60%2FIMG_4190.png?alt=media&token=09e5874e-6d75-4c75-a855-2069f3319aef"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Куда «пропадает» либидо? Никуда. Первичное сексуальное влечение в социальном
              современно мире частично попросту сублимируется – превращается в активную
              деятельность, творчество, дружбу, спорт и т.д. Но оно может и блокироваться, и тогда
              человек переживает апатию, утрату энергии, интереса к жизни. Блокируется либидо чаще
              при переживании психотравмирующей ситуации, когда ребенку (или взрослому) не позволяют
              реализовать либидо. Попросту – запрещают выражать чувства, мысли, ограничивают свободу
              действий; наказывают, принуждают, связывают обстоятельствами.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Когда запреты слишком сильны, либидо стремится разрушить ограничения и превращается в
              <b>мортидо</b> (этот термин ввел последователь Фрейда <b>Пауль Федерн</b>) – энергию
              разрушения. Проявляется оно как напрямую в агрессивном и разрушительном поведении, так
              и в сублимированном виде – просмотр фильмов со сценами насилия, экстремальные виды
              спорта (мортидо, направленное на себя), вербальная агрессия в соцсетях и т.д. Но и
              мортидо может быть подавлено! Ведь вполне закономерно, что агрессивное и
              саморазрушительное поведение порицается обществом. Подавление мортидо, в свою очередь,
              может приводить к развитию психосоматических заболеваний, утрате интереса к жизни,
              снижению сексуального влечения и т.д.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60%D0%9B%D0%B8%D0%B1%D0%B8%D0%B4%D0%BE%60%2FIMG_4779-25-01-20-02-13.JPG?alt=media&token=2a8329e3-70a4-4540-bcdf-f6936e8e52d8"
          />
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Что делать? Исследовать заблокированную энергию, находить способы освободить и
              легализовать мортидо, а затем и восстановить либидо. Исследовать историю своей
              жизненной силы можно в нашем майском ретрите (начало 1 мая 2021 года, количество мест
              ограничено)
              <router-link :to="pathLibidoRetreat"> <b>«Пробуждение Либидо»</b></router-link> или в
              самостоятельных студиях
              <router-link :to="pathLibido"> <b>«Либидо – энергия жизни»</b></router-link>
              и
              <router-link :to="pathDialogue"> <b>«Диалог с болезнью»</b></router-link
              >.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: 'BlogLibido',
  metaInfo: {
    title: 'Либидо и Мортидо',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Исследовать заблокированную энергию, находить способы освободить и легализовать мортидо, а затем и восстановить либидо. Исследовать историю своей жизненной силы самостоятельно можно в наших студиях «Либидо – энергия жизни» и «Диалог с болезнью».'
      }
    ]
  },
  data: () => ({
    dialog: 'Dialogue with the disease'
  }),
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    user() {
      return this.$store.getters.user
    },
    pathLibido() {
      if (this.user.payments && this.user.payments.Libido) {
        return `/studios/home/Libido`
      } else {
        return `/studios/preview/Libido`
      }
    },
    pathLibidoRetreat() {
      if (this.user.payments && this.user.payments.libido_retreat) {
        return `/studios/home/Libido`
      } else {
        return `/studios/preview/Libido`
      }
    },
    pathDialogue() {
      if (this.user.payments && this.user.payments[this.dialog]) {
        return `/studios/home/Dialogue%20with%20the%20disease`
      } else {
        return `/studios/preview/Dialogue%20with%20the%20disease`
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.fadeGroup-enter-active, .fadeGroup-leave-active {
  transition: opacity 2s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
