<template>
  <article class="list-browser-search">
    <header><h1>{{ searchLabel }}</h1></header>
    <main>
      <p>Search unsupported</p>
    </main>
  </article>
</template>

<script>
import CardEditor from './CardEditor'
export default {
  components: {
    CardEditor,
  },

  data () {
    return {
      searchLabel: null,
    }
  },

  methods: {
    getOriginalRecord: function () {
      return {
        name: 'account',
        label: 'Account',
      }
    },
  },

  mounted () {
    this.searchLabel = 'Search Form'
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"
@import "../styles/md-colors"

.list-browser-search
  border 1px $md-grey-400 solid
  min-width 300px
  min-height 120px
  box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)
  margin-top 10px

  header
    background-color $md-amber-200
    padding 2px

  h1
    margin 0
    padding 0

</style>
