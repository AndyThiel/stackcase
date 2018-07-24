<template>
  <article class="card-editor" :class="getModeClasses">

    <header>
      <div class="card-editor-label">
        <h1>{{ session.editorMode }} {{ objectDescriptor.label }} &bull; {{ session.originalRecord.label }}</h1>
      </div>
      <div class="card-editor-actions">

        <button
          class="button-maximize-card"
          @click="onMaximizeSession">
          <i class="material-icons icon">maximize</i>
        </button>

        <button
          class="button-close-card"
          @click="onCloseSession">
          <i class="material-icons icon">close</i>
        </button>
      </div>
      <div class="actions-end"></div>
    </header>

    <main>
      <div class="input-container"
        v-for="column of getColumns"
        v-if="columnIsRelevant(column)"
        :key="column.key">

        <label>{{ column.label }}</label>

        <template v-if="typeWidgetMap[column.type] === 'IntegerField'">
          <div class="value">{{ modified[column.name] }}</div>

          <template v-if="session.editorMode === 'modify'">
            <span class="card-value-previous"
                  v-if="isValueModified(column.name)">
              {{ session.originalRecord[column.name] }}
            </span>
          </template>
        </template>

        <template v-if="typeWidgetMap[column.type] === 'LabelField'">
          <input :id="'input-' + column.name"
                 :class="getValueClasses(column.name)"
                 v-model="modified[column.name]" />

          <template v-if="session.editorMode === 'modify'">
            <span class="card-value-previous"
                  v-if="isValueModified(column.name)">
              {{ session.originalRecord[column.name] }}
            </span>
          </template>
        </template>

        <template v-if="typeWidgetMap[column.type] === 'MultilineField'">
          <textarea :id="'input-' + column.name"
                 :class="getValueClasses(column.name)"
                 v-model="modified[column.name]" />

          <template v-if="session.editorMode === 'modify'">
            <span class="card-value-previous"
                  v-if="isValueModified(column.name)">
              {{ session.originalRecord[column.name] }}
            </span>
          </template>
        </template>
      </div>

      <template v-if="session.editorMode === 'create'">
        <button @click="onSaveRecord">Create Record</button>
      </template>

      <template v-else-if="session.editorMode === 'modify'">
        <button @click="onSaveRecord">Save Changes</button>
      </template>
    </main>

  </article>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      objectDescriptor: {},
      modified: {},
      modifiedWas: '',
    }
  },

  props: {
    session: {
      type: Object,
      default: {},
    },
  },

  methods: {
    ...mapActions('metadata', [
      'initObjectDescriptors',
    ]),

    ...mapActions('sessions', [
      'updateModifiedRecord',
    ]),

    onCloseSession: function () {
      this.$emit('closeSession', this.session)
    },

    onMaximizeSession: function () {
      this.$emit('maximizeSession', this.session)
    },

    onSaveRecord: function () {
      this.$emit('saveRecord', {
        session: this.session,
        modified: this.modified,
      })
    },

    getValue: function (columnName) {
      return this.modified[columnName]
    },

    columnIsRelevant: function (column) {
      return column.required && !column.readOnly
    },

    isValueModified: function (columnName) {
      return this.modified[columnName] !== this.session.originalRecord[columnName]
    },

    isValueInvalid: function (columnName) {
      return false
    },

    getValueClasses: function (columnName) {
      return this.isValueInvalid(columnName) ? 'input-invalid' : 'input-valid'
    },
  },

  computed: {
    ...mapGetters('metadata', [
      'nameDescriptorMap',
      'typeWidgetMap',
    ]),

    getModeClasses: function () {
      const mainClass = 'mode-' + this.session.editorMode
      return mainClass + ' ' + 'object-type-' + this.session.objectType
    },

    getColumns: function () {
      return this.objectDescriptor.columns
    },
  },

  created () {
    this.initObjectDescriptors()
    this.objectDescriptor = this.nameDescriptorMap[this.session.objectType]
  },

  mounted () {
    if (this.session.modifiedValues === null) {
      for (var descriptorColumnOriginal of this.objectDescriptor.columns) {
        this.$set(this.modified,
          descriptorColumnOriginal.name,
          this.session.originalRecord[descriptorColumnOriginal.name])
      }
    } else {
      for (var descriptorColumnModified of this.objectDescriptor.columns) {
        this.$set(this.modified,
          descriptorColumnModified.name,
          this.session.modifiedValues[descriptorColumnModified.name])
      }
    }
  },

  beforeDestroy () {
    this.updateModifiedRecord({
      sessionId: this.session.id,
      modified: this.modified,
    })
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/vars"
@import "../styles/md-colors"
@import "../styles/entities"

.card-editor
  display block
  float left
  swidth 400px
  width 575px
  min-height 128px
  overflow hidden
  background-color $md-grey-400
  border 1px $md-grey-300
  padding 0
  margin 5px
  box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)

  header
    display inline-block
    width 100%
    padding 4px

    .card-editor-label
      margin-left 5px
      margin-top 5px
      float left

      h1
        font-size 1em
        font-weight bold
        margin-bottom 5px

    .card-editor-actions
      margin-right 10px
      float right

      button
        border 1px $md-grey-400 solid
        background-color white
        box-shadow 2px 2px 2px 0px rgba(0,0,0,0.75)
        padding 2px 4px

  main
    display inline-block
    width 100%

    button
      float right
      border 1px $md-amber-400 solid
      background-color $md-amber-100
      box-shadow 2px 2px 2px 0px rgba(0,0,0,0.25)
      padding 4px
      margin-right 10px
      margin-top 5px
      margin-bottom 5px

    .input-container
      display block
      margin-right 10px

      label
        vertical-align top
        display inline-block
        min-width 150px
        max-width 150px

      input, textarea, div.value
        display inline-block
        min-width 200px
        max-width 300px
        padding 2px
        margin 2px 0

      textarea
        min-height 150px
        max-height 150px

      .input-invalid
        border 1px $md-amber-300 solid

      .card-value-previous
        display inline-block
        min-width 100px
        max-width 300px
        color $md-amber-600

    .actions-end
      clear both

</style>
