<template>
  <article class="list-header-option">
    <main>
      <label>Order By</label>
      <div class="button-container">
        <button
          v-for="option in options"
          :key="option.key"
          @click="selectOrderingOption(option)">
          {{ option.message }}
        </button>
      </div>
    </main>
  </article>
</template>

<script>
export default {
  data () {
    return {
      options: [],
    }
  },

  methods: {
    selectOrderingOption: function (selectedOption) {
      this.$emit('orderingOptionEvent', selectedOption)
    },
  },

  mounted () {
    this.options = [
      {
        key: 1,
        message: 'Option 1',
        link: '#',
      },
      {
        key: 2,
        message: 'Option 2',
        link: '#',
      },
      {
        key: 3,
        message: 'Option 3',
        link: '#',
      },
    ]
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"
@import "../styles/md-colors"

.list-header-option
  position relative
  min-width 450px
  margin 0
  padding 0

  main
    display inline-block
    margin 0
    padding 0
    min-width 100%

    label
      display inline-block
      margin 10px 5px
      font-weight bold

    .button-container
      display inline-block
      max-width 300px
      float right

      button
        background-color $md-amber-100
        margin 2px 5px
        box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)

</style>
