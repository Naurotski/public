<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center subtitle-1 font-weight-bold"
            :class="{ 'caption font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>Что в наших легких?</h1></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <transition appear name="fadeGroup">
      <v-row justify="space-around" align="center">
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Когда мы делаем первый вдох – мы начинаем жить в человеческом мире. Бог вдохнул жизнь
              в первого человека. Жизнь уходит с последним выдохом. Дух, душа, дыхание – про одно.
              <br />
              Что же происходит с человеком, когда он не может свободно дышать? Что является
              психологической причиной легочных заболеваний?
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FLungs%2Flegkie_15.jpg?alt=media&token=542b1d47-27a2-4429-bab1-726229f23cd1"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Начнем с туберкулеза, чахотки. Мы часто сталкиваемся с возбудителем туберкулеза, даже
              не догадываясь об этом. Общественный транспорт, подъезды, оживленные места. Но
              заболевают далеко не все. Туберкулез с точки зрения психосоматики – болезнь изнурения.
              Жизнь из дефицита. Постоянное ощущение отсутствия ресурса. Как будто мало
              возможностей, чтобы жить. Мало-мало-мало. Поэтому людям с туберкулиновой конституцией
              постоянно нужны перемены. Новые впечатления, новые места, новая любовь, новые игрушки
              детям, и все равно дыра дефицита не затягивается. Бесконечное ощущение
              неудовлетворенности не проходит.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Астма – распространенное заболевание. Практически всегда психосоматическое.
              Невозможность свободно вдохнуть и выдохнуть. Невозможность дышать полной грудью.
              <br />
              Это всегда про свободу. Когда нет свободы самостоятельно принимать решения. Нет
              свободы в выражении чувств. Нет свободы жить… Когда рядом тиран или авторитарный
              контролирующий родитель. Когда в семье или в обществе запрет на выражение чувств.
              Когда человека отвергают и тем самым он как будто не живет, не дышит.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FLungs%2Flegkie_23.jpg?alt=media&token=3bf863fb-08ba-4d34-b142-72957fb83a3f"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Острые бронхиты и пневмонии – чаще всего возникают в ситуации, когда было нарушено
              право на жизнь и свободу. Часто бронхитами начинают болеть дети, попадающие к
              авторитарным педагогам. Повторными пневмониями нередко болеют в более тяжелой ситуации
              – когда свободно вздохнуть невозможно нигде. Ни в семье, ни в новом коллективе. Еще
              одна психосоматическая причина пневмоний – бессознательный страх ограниченных
              пространств, ощущение, что невозможно покинуть пространство. Тогда может возникнуть
              вирусная пневмония после перелета или переезда. И конечно, возникнет она далеко не у
              всех пассажиров.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Что интересно – в психосоматике психика-тело работают и наоборот. Если вы не дышите в
              полную силу по каким-то причинам – у вас подавляется потребность в свободе. Опыт
              удушения нередко ломает волю и блокирует волю к жизни в целом. То есть формируется
              замкнутый круг: ограничение свободы – астма – снижается потребность в свободе – нет
              поиска свободы – астма сохраняется.
              <br />
              В целом нарушение дыхания вызывает мгновенный страх смерти и часто – панические атаки.
              На бессознательном уровне заложено знание: прекращение дыхания означает прекращение
              жизни. <br />
              Интересен в этом разрезе опыт с ковид-19. Огромное количество людей пережили опыт
              депривации дыхания и… смирились с большим количеством ограничений, хотя раньше это
              было бы немыслимо.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FLungs%2Flegkie_30.jpg?alt=media&token=12214f61-e36c-4979-9faf-88dfff198211"
          />
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Что делать?
              <ol>
                <li>
                  Дышать. Начинать с того, чтобы учиться дышать заново. Йога, дыхательная
                  гимнастика.
                </li>
                <li>
                  Выезжать в открытые пространства и смотреть за горизонт. Это дает ощущение
                  свободы.
                </li>
                <li>
                  Осознавать свои ограничения и выходить за них. Это можно делать с психологом,
                  коучем, специалистом по психосоматике и нашими студиями.
                </li>
              </ol>
              Для работы с психосоматическими симптомами у нас есть специальная студия
              <router-link :to="pathDialogue"> <b>«Диалог с болезнью»</b></router-link> , а для
              того, чтобы вернуть себе свободу - бесплатная студия
              <router-link :to="pathWant"> <b>«Хочу и буду!»</b></router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: 'BlogLungs',
  metaInfo: {
    title: 'Что в наших легких?',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Что является психологической причиной легочных заболеваний? Что же происходит с человеком, когда он не может свободно дышать?'
      },
      {
        property: 'og:url',
        content: 'https://metamorfosi.eu/blog/lungs'
      },
      {
        property: 'og:title',
        content: 'Что в наших легких?'
      },
      {
        property: 'og:description',
        content:
          'Что является психологической причиной легочных заболеваний? Что же происходит с человеком, когда он не может свободно дышать?'
      },
      {
        property: 'og:image',
        content:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FLungs%2Flegkie_15.jpg?alt=media&token=542b1d47-27a2-4429-bab1-726229f23cd1'
      }
    ]
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    user() {
      return this.$store.getters.user
    },
    pathDialogue() {
      if (this.user.payments && this.user.payments['Dialogue with the disease']) {
        return `/studios/home/Dialogue%20with%20the%20disease`
      } else {
        return `/studios/preview/Dialogue%20with%20the%20disease`
      }
    },
    pathWant() {
      if (this.user.payments && this.user.payments.want) {
        return `/studios/home/want`
      } else {
        return `/studios/preview/want`
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
