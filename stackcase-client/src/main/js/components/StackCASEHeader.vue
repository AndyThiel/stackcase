<template>
  <header class="stackcase-header">
    <div class="content">
      <router-link class="link" :to="{ name: 'home' }"><h1 v-html="stackCaseTitle"></h1></router-link>
      <h2 class="subtitle">Texts are meant to be played</h2>
    </div>
    <!--div class="header-quick-navigation">
      <QuickNavigation />
    </div-->
  </header>
</template>

<script>
export default {
  data () {
    return {
      stackCaseTitle: null,
    }
  },

  mounted () {
    this.stackCaseTitle = 'StackCASE.com'
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.stackcase-header
  text-align left
  background-color #333333
  box-shadow 4px 4px 3px 0px rgba(0,0,0,0.65)
  min-height 100px

  .content
    display inline-block
    max-width $page-size
    margin 15px
    padding 10px
    box-sizing border-box
    position relative
    height 75px

  h1, h2.subtitle
    padding 0
    margin 0

  .subtitle
    color #66cc00
    font-size 1em

</style>
