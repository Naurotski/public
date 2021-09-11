<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center subtitle-1 font-weight-bold"
            :class="{ 'caption font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>7 признаков гедониста</h1></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <transition-group appear name="fadeGroup">
      <v-row key="a" justify="space-around" align="center">
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              У меня нет цели излагать историческую справку зарождения и развития понятия гедонизма.
              Мировоззрение человека меняется с течением времени. Меняется и гедонизм. Одно остается
              неизменным – это противопоставление гедонизма страданию.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              Современный человек не так часто подвергается страданиям, как люди во времена голодной
              смерти, болезней от антисанитарии или кровной мести. Сейчас душевные страдания гораздо
              более распространены. Депрессии, тревога, панические атаки, потеря смысла жизни,
              отсутствие чувства собственной значимости – вот страдания нашего времени. Поэтому
              сейчас гедонизм – это гораздо больше образ мышления и чувствования, чем условия жизни.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row key="b" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text
              :class="{ 'body-2': $vuetify.breakpoint.xs }"
              class="body-1 text-center font-weight-black"
            >
              Признаки гедониста или как им стать
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row key="c" justify="space-around" align="center">
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60Seven%60%2Fhedonism_37.jpg?alt=media&token=7c3c37be-2ae0-44ed-be9c-56b05f943e54"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              1. Развивать сенситивность. Сенситивность – это умение тонко чувствовать.
              Останавливаться и фокусироваться на ощущениях. Фактура тканей и их прикосновение к
              коже, тончайшие запахи, оттенки вкуса еды, звуки природы, цвет и формы интерьера. Все,
              что нас окружает – влияет на нас. Цвет стен, фактура мебели, расположение предметов в
              пространстве, в котором мы живем и работаем, - все это создает настроение, задает
              работоспособность или наоборот снижет ее. Постоянный шум машин за окном может
              создавать необъяснимое на первый взгляд раздражение, а запах корицы – давать чувство
              защищенности. Сенситивность – это целый мир! Люди с развитой сенситивностью гораздо
              легче фокусируются на удовольствии и получают его буквально каждую минуту!
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              2. Любовь к своему телу. Гедонисты наслаждаются своим телом и всеми приятными
              переживаниями, которое оно дает. Они могут стараться делать свое тело более здоровым
              или красивым, но для того, чтобы чувствовать себя лучше, а не для того, чтобы
              соответствовать ожиданиям. Гедонисты любят чувствовать себя здоровыми и бодрыми.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60Seven%60%2Fhedonism_4.jpg?alt=media&token=db6f00eb-072b-4276-b6d0-5b5a68a7b68f"
          />
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              3. Легализация чувств. Гедонисты хорошо понимают свои чувства. Они знают, что их злит,
              что расстраивает, что радует, что огорчает, что лишает энергии, а что, наоборот, -
              наполняет. Они разрешают себе испытывать любые чувства, но стараются организовать свою
              жизнь так, чтобы испытывать больше приятных чувств и не терять энергию.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60Seven%60%2Fhedonism_16.jpg?alt=media&token=e330ed51-91db-4859-bc6d-127aa6179dc6"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              4. Примирение ума и чувств. Гедонисты не сфокусированы только на ощущениях. Они любят
              новые знания, открытия, они любознательны. Увлекательная беседа для них – ничуть не
              меньшее удовольствие, чем тонкий вкус нового блюда. Ум гедониста тоже нуждается в
              хорошей литературе, качественном кино, в научных открытиях. <br /><br />
              5. Расширение опыта. Гедонист всегда ищет новое. Новые знания, новые ощущения, новый
              взгляд на мир. Гедонист нуждается в развитии и новых желаниях, в мечтах и целях.
              Постоянное движение ума дает ощущение жизни. <br /><br />
              6. Творчество. Гедонист создает. Существует миф, что гедонист умеет только потреблять,
              но это не так. Наибольшее удовольствие человек испытывает в процессе создания нового,
              когда из пустоты рождается нечто.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              7. Наслаждение результатом. Гедонисты любят результат и наслаждаются им. Для того,
              чтобы начать новое. Гедонисты довольны своим результатом, но всегда хотят создавать
              еще лучшее. И, конечно, гедонисты любят, когда их результат нравится другим. Ложная
              скромность – это не про них.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            contain
            max-height="300"
            class="white--text align-end"
            src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%20%60Seven%60%2Fhedonism_30.jpg?alt=media&token=6f9577b7-9d40-4be2-bf62-0db6cabbe226"
          />
        </v-col>
        <v-col cols="12" sm="11">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              А как же любовь? Гедонисты могут любить или не любить. Быть экстравертами или
              интровертами. Любить одиночество или компании. Они могут быть разными. Но они понимают
              себя, они созидают и они счастливы.
              <br /><br />
              Хотите раскрыть в себе гедониста? Приглашаем вас в мини-студию
              <router-link :to="createPath"><b>«Вход в гедонизм».</b></router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </transition-group>
  </v-container>
</template>

<script>
export default {
  name: 'BlogSeven',
  metaInfo: {
    title: '7 признаков гедониста',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Гедонисты могут быть разными. Но они понимают себя, они созидают и они счастливы. Хотите раскрыть в себе гедониста? Приглашаем вас в мини-студию «Вход в гедонизм».'
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
    createPath() {
      if (this.user.payments && this.user.payments.Hedonism) {
        return `/studios/home/Hedonism`
      } else {
        return `/studios/preview/Hedonism`
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
