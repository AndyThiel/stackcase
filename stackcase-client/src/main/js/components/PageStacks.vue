<template>
  <section class="content-page">
    <article v-if="stacks" class="content-article">
      <h1>Browse Stacks</h1>
      <ul>
        <li v-for="record in stacks" :key="record.id"><router-link :to="'/stacks/' +record.id">{{ record.label }}</router-link></li>
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
    ...mapGetters('stacks', [
      'stacks',
      'loading',
    ]),
  },

  methods: {
    ...mapActions('stacks', [
      'fetchStacks',
    ]),
  },

  mounted () {
    this.fetchStacks()
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
