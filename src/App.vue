<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Dark Launching a Room With a Vue',
  meta: [
    { name: 'description', content: 'Taking the LaunckDarkly Vue SDK for a spin' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon.png' : '/favicon.png'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
