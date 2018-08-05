<template>
  <nav class="content-navigation">
    <router-link
      v-for="entry of navEntries"
      class="link"
      :key="entry.id"
      :to="{ name: entry.route }">
      {{ entry.label }}
    </router-link>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      navEntries: [],
    }
  },

  created () {
    this.navEntries = [
      {
        id: 1,
        name: 'home',
        label: 'Home',
        route: 'home',
      },
      {
        id: 2,
        name: 'projects',
        label: 'Projects',
        route: 'projects',
      },
      {
        id: 3,
        name: 'stacks',
        label: 'Stacks',
        route: 'stacks',
      },
    ]
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports.styl"
.content-navigation
  padding 5px
  flex: 0 0 20em;
  order -1

  a
    color #ffcc66
    display block
    min-height 20px
    border 1px $md-amber-400
    background-color #333333
    padding 8px 12px
    margin 3px
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)

    &:hover
      box-shadow none

</style>
