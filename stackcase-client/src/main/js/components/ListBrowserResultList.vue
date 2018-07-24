<template>
  <article class="list-browser-result-list">

    <header>
      <ResultListHeader
        :header-label="headerLabel"
        @displayOptionEvent="onDisplayOptionEvent"
        @groupingOptionEvent="onGroupingOptionEvent"
        @orderingOptionEvent="onOrderingOptionEvent"
        @userActionEvent="onUserActionEvent" />
    </header>
    <main>
      <ResultListCards
        :show-create-button="showCreateButton"
        :show-edit-buttons="showEditButtons"
        :object-descriptor="objectDescriptor"
        :object-records="getObjectRecords"
        :display-option="displayOption"
        @createRecordEvent="onCreateRecordEvent"
        @modifyRecordEvent="onModifyRecordEvent" />
    </main>
    <footer>
      <ResultListFooter
        :page-size="getRecordCount"
        :record-count="getRecordCount" />
    </footer>
  </article>
</template>

<script>
import ResultListHeader from './ResultListHeader'
import ResultListCards from './ResultListCards'
import ResultListFooter from './ResultListFooter'

export default {
  components: {
    ResultListHeader,
    ResultListCards,
    ResultListFooter,
  },

  props: {
    headerLabel: {
      type: String,
      default: 'Search Result',
    },

    showEditButtons: {
      type: Boolean,
      default: false,
    },

    showCreateButton: {
      type: Boolean,
      default: false,
    },

    displayOption: {
      type: Object,
      default: function () {
        return {
          key: 2,
          message: 'Row',
          link: '#',
        }
      },
    },

    objectDescriptor: {
      type: Object,
      default: function () {
        return {
          name: 'unknown',
          label: 'Unknown',
          columns: [
            {
              key: 1,
              type: Object,
              name: 'name',
              label: 'Name',
              required: true,
              sortable: true,
            },
          ],
          childDescriptors: [],
          searchProfiles: [],
          visibilityProfiles: [],
          tableProfiles: [],
        }
      },
    },
    objectRecords: {},
  },

  computed: {
    getObjectRecords: function () {
      return this.objectRecords
    },
    getRecordCount: function () {
      if (this.objectRecords) {
        return this.objectRecords.length
      }
      return 0
    },
  },

  methods: {
    onDisplayOptionEvent: function (selectedOption) {
      this.$emit('displayOptionEvent', selectedOption)
    },
    onGroupingOptionEvent: function (selectedOption) {
    },
    onOrderingOptionEvent: function (selectedOption) {
    },
    onUserActionEvent: function (selectedAction) {
    },
    onCreateRecordEvent: function (originalRecord) {
      this.$emit('createRecordEvent', originalRecord)
    },
    onModifyRecordEvent: function (originalRecord) {
      this.$emit('modifyRecordEvent', originalRecord)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"
@import "../styles/md-colors"

.list-browser-result-list
  margin-top 10px
  border 1px $md-grey-300 solid
  min-width 300px
  min-height 200px
  box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)

</style>
