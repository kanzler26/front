<template>
  <div class="deals-section-wrapper ui-row-5">
    <div class="deals-section">

      <div v-if="name" class="deals-section-head">

        <div class="ui-row-5 cursor-draggable d-flex align-center handle">
          <div class="ui-row-5">
            <div class="deals-section-color" :style="{ background: color }"></div>
          </div>
          <div class="ui-row-5">
            <div class="deals-section-name">
              {{ name }}
            </div>
          </div>
        </div>

        <div class="ui-row-5">
          <v-btn icon small>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>

      </div>

      <div class="ui-row-5" style="height: 100%">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "deals-section",
  props: {
    name: {
      type: String,
      default: () => ''
    },
    color: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>
.deals-section-wrapper {
  height: 100%;
  overflow: hidden;
  min-width: 300px;
  margin: 0;
}

.deals-section {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  border-radius: 5px;
}

.deals-section-head {
  position: sticky;
  top: 0;
  background: white;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba( 0, 0, 0, 0.1 );
}

.deals-section-name {
  font-weight: 600;
}

.deals-section-color {
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background: red;
}

</style>
