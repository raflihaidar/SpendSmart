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
    <div class="max-w-48">
        <ul class="flex items-center text-md">
            <li
                v-for="(item, index) in getUrl"
                :key="index"
                class="flex gap-x-2 items-center ml-2 max-sm:text-sm"
            >
                <Icon name="ic:round-arrow-forward-ios" />
                <NuxtLink
                    v-if="item.name"
                    :to="{ name: item.name }"
                    :class="[
                        getUrl.length - 1 === index
                            ? 'font-bold'
                            : 'font-semibold text-color3 ',
                        'capitalize',
                    ]"
                >
                    {{ item.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
