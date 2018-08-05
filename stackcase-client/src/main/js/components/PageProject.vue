<template>
  <section class="content-page">
    <article class="content-article">
      <h1>Project Administration</h1>

      <router-view />

    </article>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.content-page
  padding 5px
  flex: 0 0 20em;
  order -1

</style>
