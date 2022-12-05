<template>
  <div style="padding: 5px; background: transparent;">
    <div class="deals-item ui-row-5">
      <div class="ui-row-5">
        <h3 class="font-weight-medium">
          {{ text}}
        </h3>
        <div class="">
          <span class="deal-price">155 руб.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deals-item",
  props: {
    text: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>
.deals-item {
  background: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 1px 1px 3px rgba( 0, 0, 0, 0.2 );
}

.deals-item .deal-price {
  background: rgba( 0, 0, 0, 0.1 );
  font-weight: 700;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 3px;
}

</style>
