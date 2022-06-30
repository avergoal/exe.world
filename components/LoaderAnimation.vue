<template>
  <div
    class="loader-wrap"
    :class="{'loader-wrap_theme': theme}"
  >
    <svg id="loader" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
#loader{
  flex: 0 0 auto;
}
#loader-violet{
  animation: violet-anim 2s linear infinite forwards;
}
#loader-red{
  animation: red-anim 2s linear infinite;
}
#loader-aqua{
  animation: aqua-anim 2s linear infinite;
}
#loader-green{
  animation: green-anim 2s linear infinite;
}

@keyframes violet-anim{
  0%{
    x: 0;
    width: 16px;
  }
  11% {
    width: 16px;
  }
  22%{
    width: 48px;
  }
  33% {
    x: 0;
    width: 48px;
  }
  44% {
    x: 32;
    width: 16px;
  }
  100%{
    x: 32;
    width: 16px;
  }
}
@keyframes red-anim{
  0%{
    y: 0;
    height: 16px;
  }
  11% {
    height: 16px;
  }
  22%{
    height: 48px;
  }
  55% {
    y: 0;
    height: 48px;
  }
  66% {
    y: 32;
    height: 16px;
  }
  100%{
    y: 32;
    height: 16px;
  }
}
@keyframes aqua-anim{
  0%{
    x: 32;
    width: 16px;
  }
  33% {
    x: 32;
    width: 16px;
  }
  44% {
    x: 0;
    width: 48px;
  }
  77%{
    width: 48px;
  }
  88%{
    width: 16px;
  }
  100%{
    x: 0;
    width: 16px;
  }
}
@keyframes green-anim{
  0%{
    y: 32;
    height: 16px;
  }
  55% {
    y: 32;
    height: 16px;
  }
  66% {
    y: 0;
    height: 48px;
  }
  77%{
    height: 48px;
  }
  88%{
    height: 16px;
  }
  100%{
    y: 0;
    height: 16px;
  }
}
</style>
      <rect
        id="loader-violet"
        rx="8"
        fill="#755EC6"
        width="16"
        height="16"
        x="0"
        y="0"
      />
      <rect
        id="loader-red"
        rx="8"
        fill="#E74C3C"
        width="16"
        height="16"
        x="32"
        y="0"
      />
      <rect
        id="loader-aqua"
        rx="8"
        fill="#21B1AC"
        width="16"
        height="16"
        x="32"
        y="32"
      />
      <rect
        id="loader-green"
        rx="8"
        fill="#27AE60"
        width="16"
        height="16"
        x="0"
        y="32"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LoaderAnimation',
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>