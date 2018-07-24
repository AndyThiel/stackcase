<template>
  <section class="app-banner">
    <div class="banner-articles">
      <article v-if="stackCaseBanner" class="stackCase-banner">
        <header><h1>{{ stackCaseBanner.title }}</h1></header>
        <main>
          <div v-html="stackCaseBanner.content"/>
          <div v-if="action">
            <button @click="executeAction">{{stackCaseBanner.stackCaseLabel}}</button>
          </div>
        </main>
        <footer><span>{{stackCaseBanner.createdDate}} &nbsp; {{stackCaseBanner.author}}</span></footer>
      </article>
    </div>
  </section>
</template>

<script>
export default {

  data () {
    return {
      stackCaseBanner: {
        title: 'Do THIS Now!',
        stackCaseLabel: 'Do it!',
        content: '<p>There are reasons why you <i><strong>should</strong></i>.</p><p>Plus everybody else does it, too.</p>',
        createdDate: '10/01/2018 2:00pm',
        author: 'Andreas Thiel',
      },
      action: null,
    }
  },

  methods: {
    executeAction () {
      if (this.stackCaseBanner.action) {
        this.stackCaseBanner.action()
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.app-banner
  background-image linear-gradient(right, $color-accent1, $color-primary)
  text-align center
  padding 0
  margin 0

  h1
    color: $color-accent1
    text-align center
    margin 0
    padding 0

  .stackCase-banner
    display inline-block
    background-color aliceblue
    margin 15px auto
    text-align center
    min-width 250px
    max-width 250px
    min-height 200px
    max-height 200px
    box-shadow 4px 4px 3px 0px rgba(0,0,0,0.25)

    main
      color #999999

    footer
      margin 0 15px
      font-size 0.6em
      text-align right

</style>
