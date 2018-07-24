<template>
  <section class="content-page">
    <article class="content-article">

      <h1>Editor</h1>

      <CardEditor
        class="list-browser-session-editor"
        v-for="editorSession of sessions"
        :key="editorSession.id"
        :object-descriptor="objectDescriptor"
        :editor-mode="editorSession.mode"
        :session="editorSession"
        @closeSession="onCloseSession" />

    </article>
  </section>
</template>

<script>
import CardEditor from './CardEditor'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CardEditor,
  },

  computed: {
    ...mapGetters('sessions', [
      'sessions',
      'focusSession',
    ]),

    objectDescriptor: function () {
      return {
        name: 'factsheet',
        label: 'Factsheet',
        labelPlural: 'Factsheets',
        columns: [
          {
            key: 1,
            type: String,
            name: 'category',
            label: 'Category',
            required: true,
            sortable: false,
          },
          {
            key: 2,
            type: String,
            name: 'label',
            label: 'Label',
            required: true,
            sortable: true,
            isTitle: true,
          },
          {
            key: 3,
            type: String,
            name: 'description',
            label: 'Description',
            required: false,
            sortable: false,
          },
        ],
        parentDescriptors: [],
        childDescriptors: [],
        searchProfiles: [],
        visibilityProfiles: [],
        tableProfiles: [],
      }
    },
  },

  methods: {
    ...mapActions('sessions', [
      'deleteSession',
      'setFocusSession',
    ]),

    onCloseSession: function (session) {
      this.deleteSession(session.id)
    },
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
