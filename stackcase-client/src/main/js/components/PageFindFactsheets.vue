<template>
  <section class="content-page">
    <article class="content-article">
      <h1>Find Factsheets</h1>

      <ListBrowser
        :object-descriptor="objectDescriptor"
        :object-records="factsheets"
        @saveRecord="onSaveRecord" />

    </article>
  </section>
</template>

<script>
import ListBrowser from './ListBrowser'
import { mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {
      objectDescriptor: null,
    }
  },

  components: {
    ListBrowser,
  },

  computed: {
    ...mapGetters('factsheets', [
      'factsheets',
      'loading',
    ]),

    ...mapGetters('metadata', [
      'nameDescriptorMap',
    ]),
  },

  methods: {
    ...mapActions('factsheets', [
      'fetchFactsheets',
      'upsertFactsheet',
    ]),

    ...mapActions('metadata', [
      'initObjectDescriptors',
    ]),

    ...mapActions('sessions', [
      'deleteSession',
    ]),

    onSaveRecord: function (value) {
      this.upsertFactsheet(value)
      this.deleteSession(value.session.id)
    },
  },

  created () {
    this.initObjectDescriptors()
    this.objectDescriptor = this.nameDescriptorMap['factsheet']
  },

  mounted () {
    this.fetchFactsheets()
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
