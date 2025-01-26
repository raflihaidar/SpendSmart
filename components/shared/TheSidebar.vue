<script setup lang="ts">
const route = useRoute();

const menuList = reactive([
    {
        title: "Dashboard",
        icon: "ic:round-house",
        path: "/",
        isActive: true,
    },
    {
        title: "Transactions",
        icon: "ic:baseline-credit-card",
        path: "/transactions",
        isActive: false,
    },
]);

const isRouteActive = (menuPath: string) => {
    if (menuPath === "/") {
        return route.path === menuPath;
    }
    return route.path.startsWith(menuPath);
};

const handleMenuClick = (index: number) => {
    menuList.forEach((menu: any, i: number) => {
        menu.isActive = i === index;
    });
};
</script>

<template>
    <aside class="w-full mx-auto py-5 px-5">
        <!-- Sidebar Header -->
        <header
            class="flex items-center justify-start gap-x-3 border-b-[#E0E1E2] border-b cursor-pointer pb-5"
        >
            <Icon :name="'ic:baseline-savings'" size="2rem" />
            <h2 class="text-md font-bold">spendSmart</h2>
        </header>
        <!-- Sidebar Header -->

        <!-- Navigation Links -->
        <nav class="mt-5 grid gap-y-5">
            <template v-for="(item, index) in menuList" :key="index">
                <NuxtLink
                    :to="item.path"
                    class="group flex items-center gap-x-2 pl-4 py-3 hover:rounded-2xl hover:shadow-sm hover:font-semibold cursor-pointer hover:bg-white transition-all"
                    :class="
                        isRouteActive(item.path)
                            ? 'bg-white rounded-2xl shadow-sm'
                            : 'bg-inherit'
                    "
                    @click="handleMenuClick(index)"
                >
                    <div
                        :class="
                            isRouteActive(item.path) ? 'bg-color1' : 'bg-white'
                        "
                        class="rounded-2xl px-2 pt-1 group-hover:bg-color1 shadow-sm"
                    >
                        <Icon
                            :name="item.icon"
                            size="1.2rem"
                            :class="
                                isRouteActive(item.path)
                                    ? 'text-white'
                                    : 'text-color1'
                            "
                            class="group-hover:text-white"
                        />
                    </div>
                    <div
                        class="group-hover:text-black block w-full text-sm"
                        :class="
                            !isRouteActive(item.path)
                                ? 'text-color3 font-bold'
                                : 'text-black font-bold'
                        "
                    >
                        {{ item.title }}
                    </div>
                </NuxtLink>
            </template>
        </nav>
        <!-- Navigation Links -->
    </aside>
</template>
