<template>
  <div class="quick-navigation">

    <button
      class="icon-button"
      icon="add"
      @click="togglePanelVisible">
      <i class="material-icons icon">add</i>
      Browse
    </button>

    <section v-if="panelVisible" class="quick-navigation-panel">
      <article class="quick-navigation-item">
        <router-link class="link" :to="{ name: 'home' }" exact>Home</router-link>
      </article>
      <article class="quick-navigation-item">
        <router-link class="link" :to="{ name: 'projects' }">Projects</router-link>
      </article>
      <article class="quick-navigation-item">
        <router-link class="link" :to="{ name: 'stacks' }">Stacks</router-link>
      </article>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      navLabel: null,
      panelVisible: false,
    }
  },

  methods: {
    togglePanelVisible () {
      if (this.panelVisible) {
        this.panelVisible = false
      } else {
        this.panelVisible = true
      }
    },
  },

  mounted () {
    this.navLabel = 'Navigation'
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.quick-navigation
  button
    position absolute
    background-color #666666
    color #ffcc66
    top 10px
    left 300px

  .quick-navigation-panel
    position absolute
    padding 10px
    top 10px
    left 400px
    min-width 640px
    max-width 640px
    min-height 480px
    max-height 640px
    overflow-y auto
    z-index 10
    background #333333
    box-shadow 4px 4px 3px 0px rgba(0,0,0,0.25)

    .quick-navigation-item
      float left
      margin 10px
      padding 5px
      min-width 150px
      min-height 150px
      background #666666
      box-shadow 4px 4px 3px 0px rgba(0,0,0,0.25)

      a
        color #ffcc66

</style>
