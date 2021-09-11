<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center subtitle-1 font-weight-bold"
            :class="{ 'caption font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>Что лечит психосоматика</h1></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <transition appear name="fadeGroup">
      <v-row justify="space-around" align="center">
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Психосоматика – это раздел медицины, который в основном изучает влияние психических
              процессов и состояний на физическое здоровье, или иногда – влияние физических
              процессов на психику пациента.
              <br />Фразу «Все болезни от нервов». Пожалуй, уже знают все. Так ли это? <br />Чаще
              всего все же да. Даже когда мы касаемся большинства сезонных вирусных заболеваний,
              обнаруживается, что человек, находящийся в стрессовой ситуации, заболевает легче,
              переносит заболевание тяжелее, выздоравливает медленнее либо не выздоравливает вовсе.
              Просто симптомы переходят в разряд хронических.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Конечно, есть ряд заболеваний, которые принято считать психосоматическими: астма,
              мигрени, язва желудка и двенадцатиперстной кишки, нейродермит, сердечные заболевания…
              Однако моя многолетняя практика показывает, что психологическая причина есть
              практически в любом заболевании. И если ее найти, увидеть, обозначить и как минимум
              осознать, а как максимум – разрешить – заболевание уходит.
              <br />Ярче всего психосоматические реакции проявляются у детей. Там связь «эмоция –
              реакция тела» очевидна. Крик воспитателя в детском саду провоцирует у чувствительного
              ребенка отит, контроль со стороны тревожной матери – атопический дерматит, конфликт
              между родитеми – бронхиальную астму. И реакции наступают практически мгновенно.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FPsychosomatics%2Fpexels-photo-3887616.jpeg?alt=media&token=ac01b9ed-c4ef-4a3f-8a95-2d3c5c12589a"
          />
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Однако и взрослые могут легко заметить связь заболеваний с психологическим
              напряжением. Как правило, напряжение в органе или тканях приводит либо к нарушению
              кровоснабжения локально в этом органе, либо к воспалению. В первом случае происходит
              «замораживание» или «схлопывание» психической энергии, во втором – подавление
              избыточного жара. Примером первой ситуации является цистит как результат страха или
              тревоги. Примером второй ситуации – боль в горле или ангина при невозможности
              высказаться. Тело подает нам четкие сигналы того, что с ним происходит. При цистите
              часть есть желание приложить тепло и прогреть пораженную область. При боле в горле в
              результате подавленного гнева – ощущается сильный жар и сухость и желание мороженного,
              например. <br />
              Тело чаще всего говорит достаточно прямо, хотя людям кажется, что язык тела сложен и
              метафоричен. Чтобы понять причину заболевания, следует обратиться к появлению самых
              первых симптомов. Что тогда происходило в жизни? Какой орган отреагироал? За что этот
              орган отвечает?
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FPsychosomatics%2Fhjk_d_850.jpg?alt=media&token=91cd07b0-b5a4-4447-b9da-28f165f75d5d"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Все довольно прозрачно. <br />Поражение глаз – невозможность или нежелание что-либо
              видеть, ушей - слышать <br />Легкие – невозможно вдохнуть полной грудью, ограничения
              свободы (вспоминаем количество туберкулеза в тюрьмах и больницах закрытого типа, при
              том что с туберкулезом мы встречаемся в общественных местах каждый день). <br />Кожные
              заболевания и заболевания внешних слизистых – чаще всего про нарушение границ и
              повышенную чувствительность к внешним раздражителям. <br />Желудок и кишечник –
              невозможность переварить происходящее. <br />Головные боли – стремление слишком много
              «брать в голову». <br />Заболевание суставов – невозможность больше работать или
              двигаться вперед, усталость. <br />Заболевания печени и желчного – подавленная злость
              («в печени сидит»). <br />Аутоиммунные заболевания – причина может крыться в
              аутоагрессии, самонаказании.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              По сути, можно найти причину большинства заболеваний. Что делать дальше? Работать
              непосредственно с причиной. Менять условия жизни. Создавать для своего тела наилучшие
              условия.
              <br />
              Работать с причиной можно с психологом, а можно самостоятельно. На нашем сайте вы
              можете найти бесплатные
              <router-link to="/miniGames/GameWithPictures"> <b>игры с картинами</b></router-link> с
              разделом «Здоровье», а также самостоятельную студию
              <router-link :to="pathPsychosomatics"> <b>«Диалог с болезнью»</b></router-link> , в
              которой вы сможете найти и проработать причину своего заболевания.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BlogPsychosomatics',
  metaInfo: {
    title: 'Что лечит психосоматика',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Психосоматика – это раздел медицины, который в основном изучает влияние психических процессов и состояний на физическое здоровье, или иногда – влияние физических процессов на психику пациента.'
      },
      {
        property: 'og:url',
        content: 'https://metamorfosi.eu/blog/psychosomatics'
      },
      {
        property: 'og:title',
        content: 'Что лечит психосоматика'
      },
      {
        property: 'og:description',
        content:
          'Психосоматика – это раздел медицины, который в основном изучает влияние психических процессов и состояний на физическое здоровье, или иногда – влияние физических процессов на психику пациента.'
      },
      {
        property: 'og:image',
        content:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FNeurographics%2Fnejro_4_v.jpg?alt=media&token=a3461111-b3af-4b69-8de7-17e749e63aa0'
      }
    ]
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading,
      user: state => state.user.user
    }),
    pathPsychosomatics() {
      if (this.user.payments && this.user.payments.neurography) {
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
