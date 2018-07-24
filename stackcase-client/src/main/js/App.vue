<template>
  <div id="app" class="stackcase-wrapper">
    <StackCASEHeader />
    <StackCASEBanner v-if="false" />
    <div class="content-wrapper">
      <div class="content-flex-area">
        <main class="content-main"><router-view /></main>
        <StackCASENavigation />
        <StackCASENotifications />
      </div>
    </div>
    <StackCASEFooter />
  </div>
</template>

<script>
import StackCASEHeader from './components/StackCASEHeader.vue'
import StackCASEBanner from './components/StackCASEBanner.vue'
import StackCASENavigation from './components/StackCASENavigation.vue'
import StackCASENotifications from './components/StackCASENotifications.vue'
import StackCASEFooter from './components/StackCASEFooter.vue'

export default {
  components: {
    StackCASEHeader,
    StackCASEBanner,
    StackCASENavigation,
    StackCASENotifications,
    StackCASEFooter,
  },
}
</script>

<style lang="stylus">
@import './styles/main.styl';

.stackcase-wrapper
  margin 0
  padding 0

.content-wrapper
  min-width $page-size
  min-height 100px
  display flex
  flex-direction column

  .content-flex-area
    display flex
    flex 0

    .content-main
      flex 1

</style>
