<template>
  <section class="list-browser">

    <!--ClippedCardSlider /-->

    <div
      v-if="showCardEditor"
      class="list-browser-editors">
      <CardEditor class="list-browser-session-editor"
                  v-for="editorSession of sessions"
                  :key="editorSession.id"
                  :object-descriptor="objectDescriptor"
                  :session="editorSession"
                  @maximizeSession="onMaximizeSession"
                  @closeSession="onCloseSession"
                  @saveRecord="onSaveRecord" />
    </div>

    <ListBrowserSearchForm
      v-if="enableSearch" />

    <ListBrowserResultList
      :header-label="getHeaderLabel"
      :show-create-button="enableEditing"
      :show-edit-buttons="enableEditing"
      :display-option="displayOption"
      :object-descriptor="objectDescriptor"
      :object-records="getObjectRecords"
      @displayOptionEvent="onDisplayOptionEvent"
      @createRecordEvent="onCreateRecordEvent"
      @modifyRecordEvent="onModifyRecordEvent" />

  </section>
</template>

<script>
import ListBrowserSearchForm from './ListBrowserSearchForm'
import ListBrowserResultList from './ListBrowserResultList'
import CardEditor from './CardEditor'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ListBrowserSearchForm,
    ListBrowserResultList,
    CardEditor,
  },

  props: {
    enableSearch: {
      type: Boolean,
      default: true,
    },

    enableEditing: {
      type: Boolean,
      default: true,
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
    ...mapGetters('sessions', [
      'displayOption',
      'sessions',
      'focusSession',
    ]),

    showCardEditor: function () {
      return this.enableEditing ||
        this.sessions.length > 0
    },

    getObjectRecords: function () {
      return this.objectRecords
    },

    getHeaderLabel: function () {
      return this.$props.enableSearch ? 'Search Result' : this.objectDescriptor.labelPlural
    },
  },

  methods: {
    ...mapActions('sessions', [
      'changeDisplayOption',
      'createSession',
      'deleteSession',
      'setFocusSession',
    ]),

    onDisplayOptionEvent: function (displayOption) {
      this.changeDisplayOption(displayOption)
    },
    onCloseSession: function (session) {
      this.deleteSession(session.id)
    },
    onMaximizeSession: function (session) {
      this.setFocusSession(session)
      this.$router.push('editor')
    },
    onSaveRecord: function (value) {
      this.$emit('saveRecord', value)
    },
    onCreateRecordEvent: function (originalRecord) {
      this.createSession(
        {
          originalRecord: originalRecord,
          objectType: this.objectDescriptor.name,
          editorMode: 'create',
        }
      )
    },
    onModifyRecordEvent: function (originalRecord) {
      this.createSession(
        {
          originalRecord: originalRecord,
          objectType: this.objectDescriptor.name,
          editorMode: 'modify',
        }
      )
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.list-browser
  .content-navigation
    padding 5px
    flex: 0 0 20em;
    order -1

  .list-browser-editors
    position relative
    overflow hidden

</style>
