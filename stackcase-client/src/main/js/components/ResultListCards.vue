<template>
  <section class="result-list-records">

    <button
      v-if="showCreateButton"
      @click="startCreateRecordSession">
      Create New
    </button>

    <div class="article-end"></div>

    <div v-if="displayOption.key < 3" class="column-header-row">
      <div
        v-if="showEditButtons"
        class="column-action-header"></div>
      <div v-for="column in objectDescriptor.columns"
           :key="1000 + column.key"
           v-if="showColumn(column)"
           class="column-header">
        <p>{{ column.label }}</p>
      </div>

      <div class="header-end"></div>
    </div>

    <template v-if="displayOption.key === 1">

      <article class="list-record-cardrow"
               v-for="card of objectRecords"
               :key="card.key">
        <header>
          <h1>{{ card.label }}</h1>
        </header>
        <div class="list-record-cardrow-values">
          <div
            v-if="showEditButtons"
            class="card-action-column">
            <button @click="startModifyRecordSession(card)">
              Edit
            </button>
          </div>
          <div v-for="column in objectDescriptor.columns"
               :key="2000 + column.key"
               v-if="showColumn(column)"
               class="column-value">
            <p>{{ getValue(card, column) }}</p>
          </div>
        </div>

        <div class="article-end"></div>
      </article>

    </template>

    <template v-else-if="displayOption.key === 2">

      <article class="list-record-row"
               v-for="card of objectRecords"
               :key="card.key">

        <div
          v-if="showEditButtons"
          class="card-action-column">
          <button @click="startModifyRecordSession(card)">
            Edit
          </button>
        </div>

        <div v-for="column in objectDescriptor.columns"
             :key="2000 + column.key"
             v-if="showColumn(column)"
             class="column-value">
          <p>{{ getValue(card, column) }}</p>
        </div>

        <div class="article-end"></div>
      </article>

    </template>

    <template v-else-if="displayOption.key === 3">

      <article class="list-record-card"
               v-for="card of objectRecords"
               :key="card.key">
        <header>
          <h1>{{ card.label }}</h1>
        </header>

        <main>
          <div class="card-action">
            <button
              v-if="showEditButtons"
              @click="startModifyRecordSession(card)">
              Edit
            </button>
          </div>

          <div v-for="column in objectDescriptor.columns"
               :key="2000 + column.key"
               v-if="showColumn(column)"
               class="value-line">
            <label class="line-label">{{ column.label }}</label>
            <span class="line-value">{{ getValue(card, column) }}</span>
          </div>
        </main>

        <div class="article-end"></div>
      </article>

    </template>

    <template v-else-if="displayOption.key === 4">

      <article class="list-record-label"
               v-for="card of objectRecords"
               :key="card.key">

        <main>

          <label>{{ card.label }}</label>
          <button
            v-if="showEditButtons"
            @click="startModifyRecordSession(card)">
            Edit
          </button>

        </main>

        <div class="article-end"></div>
      </article>

    </template>

  </section>
</template>

<script>
export default {
  props: {
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
          key: 1,
          message: 'Row Card',
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

  methods: {
    getValue: function (card, column) {
      return card[column.name]
    },
    showColumn: function (column) {
      if (column.name !== 'label') {
        return true
      }
      if ((this.displayOption.key === 2) ||
          (this.displayOption.key === 4)) {
        return true
      }
      return false
    },
    startCreateRecordSession: function () {
      let original = {}
      for (let column of this.objectDescriptor.columns) {
        original[column.name] = null
      }
      this.$emit('createRecordEvent', original)
    },
    startModifyRecordSession: function (card) {
      this.$emit('modifyRecordEvent', card)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"
@import "../styles/md-colors"

.result-list-records
  min-width 300px
  overflow auto

  .list-record-cardrow:hover,
  .list-record-card:hover,
  .list-record-label:hover
    background-color $md-amber-100

  button
    border 1px $md-grey-400 solid
    background-color $md-amber-100
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)
    padding 2px 4px
    margin-right 3px
    margin-bottom 3px

  .column-action-header,
  .card-action-column
    vertical-align top
    min-width 100px
    max-width 100px
    display inline-block

  .column-header,
  .column-value
    vertical-align top
    min-width 200px
    max-width 200px
    display inline-block

  .column-header-row
    display flex
    position relative
    white-space nowrap
    border 1px $md-grey-400 solid
    background-color $md-amber-100
    overflow hidden

    .column-header
      flex 2
      padding 4px

    .column-action-header
      flex 1
      padding 4px

  .list-record-cardrow
    overflow auto
    white-space nowrap
    border 1px $md-grey-400 solid
    margin 5px 10px
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)

    .list-record-cardrow-values
      border 1px $md-amber-400 solid
      display flex
      margin 2px

      .column-value
        white-space normal
        flex 2
        padding 6px 4px

      .card-action-column
        flex 1
        padding 1px 4px

    header
      padding 3px
      background-color $md-amber-100

      h1
        font-size 1em
        font-weight bold
        margin 0
        padding 0

  .list-record-row:hover
    .column-value
      background-color $md-amber-100

    .column-value:hover
      background-color $md-amber-200

  .list-record-row
    display flex
    margin 2px

    .column-value
      flex 2
      padding 6px 4px

    .card-action-column
      flex 1
      padding 1px 4px

  .list-record-card
    display inline-block
    border 1px $md-grey-400 solid
    margin 5px 10px
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)
    min-width 300px
    min-height 240px

    main
      width 100%

      label
        display inline-block
        width 150px

      span
        display inline-block
        min-width 150px
        max-width 400px

    header
      padding 3px
      background-color $md-amber-100

      h1
        font-size 1em
        font-weight bold
        margin 0
        padding 0

  .list-record-label
    display inline-block
    border 1px $md-grey-400 solid
    margin 5px 10px
    box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)
    min-width 300px
    max-width 450px

    main
      label
        display inline-block
        min-width 300px
        max-width 600px

      button
        display inline-block

  .header-end,
  .article-end
    clear both

</style>
