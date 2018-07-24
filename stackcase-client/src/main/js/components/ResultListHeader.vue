<template>
  <section class="result-list-header">
    <h1>{{ headerLabel }}</h1>

    <button class="panel-options-button"
            @click="toggleExpanded">Options</button>

    <div class="popup-panel" v-if="expanded">
      <ListHeaderDisplayOptions
        @displayOptionEvent="onDisplayOptionEvent"
        @groupingOptionEvent="onGroupingOptionEvent"
        @orderingOptionEvent="onOrderingOptionEvent"
        @userActionEvent="onUserActionEvent" />
      <ListHeaderGroupingOptions />
      <ListHeaderOrderingOptions />
      <ListHeaderUserActions />
    </div>

    <div class="section-end"></div>
  </section>
</template>

<script>
import ListHeaderDisplayOptions from './ListHeaderDisplayOptions'
import ListHeaderGroupingOptions from './ListHeaderGroupingOptions'
import ListHeaderOrderingOptions from './ListHeaderOrderingOptions'
import ListHeaderUserActions from './ListHeaderUserActions'

export default {
  components: {
    ListHeaderDisplayOptions,
    ListHeaderGroupingOptions,
    ListHeaderOrderingOptions,
    ListHeaderUserActions,
  },

  props: {
    headerLabel: {
      type: String,
      default: 'Search Result',
    },
  },

  data () {
    return {
      expanded: false,
    }
  },

  methods: {
    toggleExpanded: function () {
      if (this.expanded) {
        this.expanded = false
        return
      }
      this.expanded = true
    },

    onDisplayOptionEvent: function (selectedOption) {
      this.$emit('displayOptionEvent', selectedOption)
    },
    onGroupingOptionEvent: function (selectedOption) {
      this.$emit('groupingOptionEvent', selectedOption)
    },
    onOrderingOptionEvent: function (selectedOption) {
      this.$emit('orderingOptionEvent', selectedOption)
    },
    onUserActionEvent: function (selectedAction) {
      this.$emit('userActionEvent', selectedAction)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"
@import "../styles/md-colors"

.result-list-header
  position relative
  background-color $md-amber-200
  padding 2px

  h1
    margin 0
    float left

  .panel-options-button
    float right
    background-color $md-amber-100
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)

  .popup-panel
    position absolute
    background-color $md-amber-100
    display flex
    flex-direction column
    border 1px $md-grey-300 solid
    right 0
    top 40px
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)
    z-index 10

  .section-end
    clear both

</style>
