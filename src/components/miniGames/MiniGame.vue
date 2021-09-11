<template>
  <transition appear name="canvas">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" :md="localHeight">
          <v-card :loading="loading">
            <v-card-actions>
              <v-card-text
                class="text-justify headline font-weight-bold"
                :class="{ 'subtitle-1 font-weight-bold': $vuetify.breakpoint.xs }"
                style="color: #FB8C00"
              >
                {{ gameData.nameGame }}
              </v-card-text>
            </v-card-actions>

            <v-card-actions>
              <canvas
                v-if="gameData.widthGame"
                ref="renderCanvas"
                style="width:100%; height: 100%"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
import { GlowFilter } from '@pixi/filter-glow'
import * as PIXI from 'pixi.js'
import { mapState } from 'vuex'
export default {
  name: 'MiniGame',
  props: {
    titleGame: {
      type: String,
      required: true
    }
  },
  data: () => ({
    app: null,
    count: 1,
    countText: 0,
    container: null,
    containerText: null,
    countValue: 0,
    countValueText: 0,
    localGameData: null
  }),
  computed: {
    localHeight() {
      if (this.gameData.heightGame / this.gameData.widthGame > 1.2) {
        return 4
      } else {
        return 6
      }
    },
    ...mapState({
      gameData: state => state.games.gameData,
      loading: state => state.shared.loading,
      url: state => state.admin.url
    })
  },
  watch: {
    count: {
      deep: true,
      handler() {
        if (this.count >= 1) {
          this.countValue = 0
          this.count = 1
          this.containerText.children = []
          this.container.angle = 0
        } else if (this.count <= 0) {
          this.countValue = 0
          this.count = 0
          this.countValueText = 0.04
        }
      }
    },
    countText: {
      deep: true,
      handler() {
        if (this.countText >= 1) {
          this.countValueText = 0
          this.countText = 1
        } else if (this.countText <= 0) {
          this.countValueText = 0
          this.countText = 0
          this.countValue = 0.04
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('getGameData', { titleGame: this.titleGame }).then(() => {
      this.localGameData = { ...this.gameData }
      const renderCanvas = this.$refs.renderCanvas
      this.app = new PIXI.Application({
        view: renderCanvas,
        backgroundColor: 0xeceff1,
        height: this.localGameData.heightGame,
        width: this.localGameData.widthGame,
        antialias: true
      })
      this.app.stop()
      this.app.loader
        .add('picture', `${this.url}/public/image/${this.localGameData.titleGame}.json`)
        .load(this.startup)
      this.container = new PIXI.Container()
      this.container.x = this.app.screen.width / 2
      this.container.y = this.app.screen.height / 2
      this.containerText = new PIXI.Container()
      this.containerText.x = this.app.screen.width / 2
      this.containerText.y = this.app.screen.height / 2
    })
  },
  beforeDestroy() {
    this.app.stop()
  },
  methods: {
    startup() {
      const id = this.app.loader.resources['picture'].textures
      let style = new PIXI.TextStyle({
        fontFamily: 'Underdog-Regular',
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#000000',
        wordWrap: true,
        wordWrapWidth: this.gameData.widthGame - 80
      })
      let style2 = new PIXI.TextStyle({
        fontFamily: 'Underdog-Regular',
        fontSize: 24,
        fill: '#000000',
        wordWrap: true,
        wordWrapWidth: this.gameData.widthGame - 80,
        align: 'center'
      })

      this.localGameData.pictures.forEach(picture => {
        let sprite
        sprite = new PIXI.Sprite(id[picture.nameFile])
        sprite.interactive = picture.interactive
        sprite.buttonMode = picture.buttonMode
        sprite.x = picture.x
        sprite.y = picture.y
        if (picture.hitArea) {
          sprite.hitArea = new PIXI.Polygon(picture.hitArea)
        }
        sprite.on('pointerover', () => {
          sprite.filters = [new GlowFilter()]
        })
        sprite.on('pointerout', () => {
          sprite.tint = 0xffffff
          sprite.filters = null
        })
        sprite.on('pointerdown', () => {
          this.countValue = -0.04
          let title, description
          title = new PIXI.Text(picture.title, style)
          description = new PIXI.Text(picture.description, style2)
          description.y = 100
          this.containerText.addChild(title)
          this.containerText.addChild(description)
        })
        this.container.addChild(sprite)
      })

      this.app.stage.addChild(this.container)
      this.container.pivot.x = this.container.width / 2
      this.container.pivot.y = this.container.height / 2

      this.app.stage.addChild(this.containerText)

      this.containerText.pivot.x = this.container.width / 2 - 50
      this.containerText.pivot.y = this.container.height / 4
      this.containerText.interactive = true
      this.containerText.buttonMode = true
      this.containerText.on('pointerdown', () => {
        this.countValueText = -0.04
      })
      this.app.start()
      this.app.ticker.add(() => {
        this.count += this.countValue
        this.container.scale.x = this.count
        this.container.scale.y = this.count
        this.countText += this.countValueText
        this.containerText.scale.x = this.countText
        this.containerText.scale.y = this.countText
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.canvas-enter, .canvas-leave-to  {
  opacity: 0;
}
.canvas-enter-active, .canvas-leave-active  {
  transition: opacity 3s;
}
</style>
