<template>
  <section class="result-list-footer">
    <article><p>{{ getMessage }}</p></article>
  </section>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 0,
    },
    recordCount: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    getMessage: function () {
      if (this.pageSize === 0) {
        return '0 - 0 of 0'
      }
      return '' +
        (1 + this.offset) + ' - ' + (this.pageSize + this.offset) +
        ' of ' + this.recordCount
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.result-list-footer
  display inline-block
  width 100%
  padding 2px

  article
    display inline-block
    float right
    margin 2px 5px 0 0

</style>
