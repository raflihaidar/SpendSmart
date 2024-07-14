<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { RouteRecordNameGeneric } from "vue-router";

const route = useRoute();

const page = ref<RouteRecordNameGeneric | null>(
  route.name === "index" ? "Dashboard" : route.name
);

watch(
  () => route.name,
  (newName: any) => {
    page.value = newName === "index" ? "Dashboard" : newName;
  }
);
</script>

<template>
  <div class="max-w-40">
    <section class="text-sm flex gap-x-2 text-color3">
      <span>Pages</span>
      <span>/</span>
      <span class="font-medium text-black capitalize">{{ page }}</span>
    </section>
    <section>
      <p class="text-md font-bold capitalize">{{ page }}</p>
    </section>
  </div>
</template>
