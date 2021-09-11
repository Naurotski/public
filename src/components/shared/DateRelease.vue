<template>
  <v-row style="height: 100%" justify="center" align="center">
    <v-col cols="12" sm="10" md="7">
      <v-card style="background-color: #9E9E9E; opacity: 0.8">
        <v-card-text
          v-if="dataStudio.id === 'calendar2021'"
          class="text-center display-1 font-weight-bold"
          :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
          >Задания Месяца будут высланы вам в почту в ближайшее время
        </v-card-text>
        <v-card-text
          v-else-if="dataStudio.id === 'nutrition-webinar'"
          class="text-center display-1 font-weight-bold"
          :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
          >Вебинар «Сенситивное питание» состоится 22 декабря в ZOOM. В день вебинара мы пришлем
          ссылку с доступом на вебинар.
        </v-card-text>
        <template v-else>
          <v-card-text
            class="text-center display-1 font-weight-bold"
            :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
            ><slot>Будет доступно через:</slot>
          </v-card-text>
          <v-row justify="center">
            <v-col cols="8">
              <v-row>
                <v-col
                  ><v-card>
                    <v-card-text class="mb-n5 text-center title"
                      ><h1>{{ days }}</h1>
                      <p>дней</p>
                    </v-card-text>
                  </v-card></v-col
                ><v-col
                  ><v-card>
                    <v-card-text class="mb-n5 text-center title"
                      ><h1>{{ hours }}</h1>
                      <p>часов</p>
                    </v-card-text>
                  </v-card></v-col
                ><v-col
                  ><v-card>
                    <v-card-text class="mb-n5 text-center title"
                      ><h1>{{ minutes }}</h1>
                      <p>минут</p>
                    </v-card-text>
                  </v-card></v-col
                ><v-col
                  ><v-card>
                    <v-card-text class="mb-n5 text-center title"
                      ><h1>{{ seconds }}</h1>
                      <p>секунд</p>
                    </v-card-text>
                  </v-card></v-col
                >
              </v-row>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DateRelease',
  props: {
    dataStudio: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    interval: ''
  }),
  watch: {
    dataStudio: {
      deep: true,
      handler() {
        if (
          this.dataStudio.studioOpeningDate &&
          +new Date(this.dataStudio.studioOpeningDate) - +new Date() > 0
        ) {
          this.interval = setInterval(() => {
            let diff = +new Date(this.dataStudio.studioOpeningDate) - +new Date()
            this.tdays = Math.floor(diff / (1000 * 60 * 60 * 24))
            this.thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            this.tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            this.tseconds = Math.floor((diff % (1000 * 60)) / 1000)
            this.days = this.tdays < 10 ? '0' + this.tdays : this.tdays
            this.hours = this.thours < 10 ? '0' + this.thours : this.thours
            this.minutes = this.tminutes < 10 ? '0' + this.tminutes : this.tminutes
            this.seconds = this.tseconds < 10 ? '0' + this.tseconds : this.tseconds
            if (diff < 0) {
              clearInterval(this.interval)
              this.expired = true
            }
          }, 1000)
        }
      }
    }
  },
  created() {
    if (
      this.dataStudio &&
      this.dataStudio.studioOpeningDate &&
      +new Date(this.dataStudio.studioOpeningDate) - +new Date() >= 0
    ) {
      this.interval = setInterval(() => {
        let diff = +new Date(this.dataStudio.studioOpeningDate) - +new Date()
        this.tdays = Math.floor(diff / (1000 * 60 * 60 * 24))
        this.thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        this.tseconds = Math.floor((diff % (1000 * 60)) / 1000)
        this.days = this.tdays < 10 ? '0' + this.tdays : this.tdays
        this.hours = this.thours < 10 ? '0' + this.thours : this.thours
        this.minutes = this.tminutes < 10 ? '0' + this.tminutes : this.tminutes
        this.seconds = this.tseconds < 10 ? '0' + this.tseconds : this.tseconds
        if (diff < 0) {
          clearInterval(this.interval)
          this.expired = true
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped lang="stylus">
.v-card{
  background: rgba(255, 143, 0, 0.7)
  padding: 10px
  color: #fff
}
</style>
