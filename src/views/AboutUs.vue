<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10">
        <v-card>
          <v-card-text
            class="text-center title font-weight-bold"
            :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>О нас</h1></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <transition-group appear name="fadeGroup">
      <v-row key="a" justify="space-around" align="center">
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              МetaMorfosi – это авторский проект психолога, арт-терапевта и художницы Надежды
              Навроцкой. Это пространство погружения в творчество, пространство самопомощи и
              удивительных трансформаций. Символ нашего проекта – Голубой муравьед. Почему
              муравьед?<br />
              Это персонаж одной из живописных работ Надежды «Голубые муравьеды и невидимый Дали».
              Муравьед – символ свободы самовыражения, движения вперед и креативности. Того, к чему
              мы призываем всех наших участников. И наши участники действительно потрясающе
              интересные творческие люди! <br />
              MetaMorfosi активно развивается с 2017 года, но сейчас мы придумали и внедрили
              виртуальный формат. С ним удобно взаимодействовать участнику с любым опытом и на любом
              жизненном этапе. Специальные навыки не нужны. Лишь немного вашего времени и внимания.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card elevation="12" color="#FFF3E0">
            <v-img
              class="white--text align-end"
              src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fimage_6483441.JPG?alt=media&token=3777d0b4-ab6d-4c1a-9dff-b678a47b6aca"
              ><v-card-title
                class="text-center headline font-weight-bold mt-n6"
                :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
              >
                Надежда Навроцкая
              </v-card-title></v-img
            >

            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-2 text-justify"
              >Психолог, художник, арт-терапевт, телесный терапевт. Человек, который создает новые
              пространства и новые судьбы. <br />
              Автор многочисленных программ и тренингов по раскрытию внутреннего потенциала,
              оздоровления, самопомощи.<br />
              Основатель MetaMorfosi: Art. Game. Transformation и автор арт-терапевтического альбома
              «Маленькие шаги большой души».
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              MetaMorfosi – это пространство арт-терапевтических игр и студий на самые разные темы.
              Каждая из них уникальна, т.к. разработана именно для этого проекта. Здесь вы найдете
              <router-link to="/studios"><b>арт-студии</b></router-link>
              для самостоятельного погружения. Это универсальный способ самостоятельной работы с
              запросом любого масштаба. Мини-студии - это работа с запросом в творческой и игровой
              форме. Большие студии - более терапевтический формат, разработан для работы с более
              глубинными, основополагающими вопросами. <br />
              Важная часть проекта - <router-link to="/blog"><b>блог</b></router-link> Надежды
              Навроцкой "Записки арт-терапевта". Он постоянно будет пополняться новыми записями. И,
              конечно, самое прекрасное - наша виртуальная
              <router-link to="/gallery"><b>галерея</b></router-link
              >, где помимо постоянной экспозиции с работами Надежды, ежемесячно будут
              демонстрироваться новые выставки самых интересных авторов.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row key="b" class="my-12" justify="space-around" align="center">
        <v-col cols="12" sm="3">
          <v-card elevation="12" color="#FFF3E0">
            <v-img
              class="white--text align-end"
              src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Falena_k.jpg?alt=media&token=5dceb34a-d571-402c-97dc-058056b09263"
            >
              <v-card-text
                class="text-right headline font-weight-bold"
                :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
              >
                Алена Кушнир
              </v-card-text></v-img
            >
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-2 text-justify"
              >Тот человек, который «встречает» и сопровождает вас во всех играх и студиях
              MetaMorfosi, отвечает на ваши письма и вопросы. По образованию - искусствовед. Большой
              опыт работы в арт-проектах в сфере фотографии - куратор галереи и отдельных выставок,
              автор экспликаций, координатор фотоконкурсов. А также 15 лет в web-проектах на самых
              разных позициях - от журналиста до шеф-редактора.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-1 text-justify">
              MetaMorfosi динамично развивается. И новые арт-терапевтические активности и
              эксперименты здесь появляются регулярно. В скором будущем на сайте появятся давно
              любимые читателями наших социальных сетей мини-игры «Погружение в картину». В них мы
              ищем ответы на самые разные вопросы с помощью произведений искусства и своего
              бессознательного.<br />
              Также в виртуальный проект переместится и "муравьедный календарь", согласно которому
              происходят все события MetaMorfosi. Вы сможете следит за тем, какие мероприятия
              планируются в течение всего муравьедного года!<br />
              И немного о
              <dialog-cmp class="d-inline-block">
                <template v-slot:nameActivator>
                  муравьедах
                </template>
              </dialog-cmp>
              , вы увидите их в ценах на наши студии и игры. Их можно и нужно собирать! Муравьеды
              приносят большие скидки на участие в студиях или играх. За них можно получать бонусы.
              Для этого вам нужно активно участвовать в жизни MetaMorfosi в социальных сетях,
              проходить наши студии, и, конечно, следить за жизнью муравьедов! Оставайтесь с нами!
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card elevation="12" color="#FFF3E0">
            <v-img
              class="white--text align-end"
              src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2FIMG_1794.jpg?alt=media&token=01707373-42c1-447e-8f63-54d486838cfd"
              ><v-card-text
                class="text-right headline font-weight-bold mt-n6"
                :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
              >
                Оксана Кушнир
              </v-card-text></v-img
            >
            <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="body-2 text-justify"
              >Ассистент проекта. Хранитель муравьедов и всей почты проекта. По образованию -
              музыкант (фортепиано, вокал), пишет музыку. Создает авторские украшения.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row key="c" justify="center">
        <v-col cols="12" md="8">
          <feedback :message-subject="'O нас'"
            ><v-card-text style="color: #FB8C00" class="headline text-center"
              >Остались вопросы? <br />
              Напишите нам</v-card-text
            ></feedback
          >
        </v-col>
      </v-row>
    </transition-group>
  </v-container>
</template>

<script>
export default {
  name: 'AboutUs',
  metaInfo: {
    title: 'О нас'
  },
  components: {
    DialogCmp: () => import('../components/shared/DialogCmp'),
    Feedback: () => import('../components/shared/Feedback')
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
