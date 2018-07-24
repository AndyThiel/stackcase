<template>
  <article class="list-header-option">
    <main>
      <label>Display As</label>
      <div class="button-container">
        <button
          v-for="option in options"
          :key="option.key"
          @click="selectDisplayOption(option)">
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
    selectDisplayOption: function (selectedOption) {
      this.$emit('displayOptionEvent', selectedOption)
    },
  },

  mounted () {
    this.options = [
      {
        key: 1,
        message: 'Row Card',
        link: '#',
      },
      {
        key: 2,
        message: 'Row',
        link: '#',
      },
      {
        key: 3,
        message: 'Card',
        link: '#',
      },
      {
        key: 4,
        message: 'Label',
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
