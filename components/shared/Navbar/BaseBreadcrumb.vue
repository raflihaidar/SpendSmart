<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const getUrl = computed(() => {
  const fullPath = route.fullPath;
  let temp = "";
  const routes = fullPath.substring(1).split("/");

  return routes
    .map((path: string) => {
      if (path) {
        temp = `${temp}/${path}`;
        return router.resolve(temp);
      } else {
        temp = "/";
        return router.resolve(temp);
      }
    })
    .filter(Boolean);
});
</script>

<template>
  <div class="w-1/2">
    <ul class="flex items-center text-xs 2xl:text-sm">
      <li class="text-txt-secondary mr-2">Dompet Utama</li>
      <Icon
        name="iconoir:slash"
        size="1.5rem"
        class="text-charcoal font-medium"
      />
      <li
        v-for="(item, index) in getUrl"
        :key="index"
        class="flex gap-x-2 items-center ml-2 max-sm:text-sm"
      >
        <Icon name="iconoir:slash" size="1.5rem" v-if="index > 0" />
        <NuxtLink
          v-if="item.name"
          :to="{ name: item.name }"
          :class="[
            getUrl.length - 1 === index
              ? 'text-charcoal font-medium'
              : 'text-txt-secondary ',
            'capitalize',
          ]"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
