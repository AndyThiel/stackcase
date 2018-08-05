<template>
  <section class="content-page">
    <article v-if="projects" class="content-article">
      <h1>Browse Projects</h1>
      <ul>
        <li v-for="record in projects" :key="record.id"><router-link :to="'/projects/' +record.id">{{ record.label }}</router-link></li>
      </ul>
    </article>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters('projects', [
      'projects',
      'loading',
    ]),
  },

  methods: {
    ...mapActions('projects', [
      'fetchProjects',
    ]),
  },

  mounted () {
    this.fetchProjects()
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
