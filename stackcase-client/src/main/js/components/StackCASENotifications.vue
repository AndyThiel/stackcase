<template>
  <aside class="content-notifications">
    <article v-for="note in notes" :key="note.key" :class="`type-${note.type}`">
      <header>{{ note.title }}</header>
      <main v-html="note.message" class="note-message" />
    </article>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      notes: [],
    }
  },

  mounted () {
    this.notes = [
      {key: 1, title: 'Note 1', message: 'Message 1 - Harmless', type: 'info'},
      {key: 2, title: 'Note 2', message: 'Message 2 - Harmless', type: 'info'},
      {key: 3, title: 'Note 3', message: 'Message 3 - Warning', type: 'warning'},
      {key: 4, title: 'Note 4', message: 'Message 4 - Error', type: 'error'},
    ]
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"

.content-notifications
  padding 5px
  flex: 0 0 20em;

</style>
