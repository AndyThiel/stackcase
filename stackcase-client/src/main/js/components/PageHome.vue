<template>
  <section class="content-page">
  </section>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.content-page
  display flex
  flex-direction row
  flex-wrap wrap

  .content-article
    margin 2px
    padding 2px
    min-width 360px
    max-width 360px

    h1
      margin 0
      padding 0
      font-weight bold
      color $color-accent2

</style>
