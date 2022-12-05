<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <slot name="annotation"></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: "ui-loader"
}
</script>

<style scoped>
  .loader-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .loader {
    display: flex;
    position: relative;
    flex-direction: row;
    width: 64px;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .loader div {
    position: absolute;
    display: inline-block;
    width: 20%;
    max-width: 16px;
    height: 50%;
    background: #1976d2;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: 0.5s;
    transition: all ease 0.5s;
  }

  .loader div:nth-child(1) {
    left: 0;
    animation-delay: -0.24s;
  }

  .loader div:nth-child(2) {
    left: calc(50% - 8px);
    animation-delay: -0.12s;
  }

  .loader div:nth-child(3) {
    left: calc(100% - 16px);
    animation-delay: 0;
  }

  @keyframes lds-facebook {

    0% {
      height: 50%;
    }

    50%, 100% {
      height: 75%;
    }
  }
</style>
