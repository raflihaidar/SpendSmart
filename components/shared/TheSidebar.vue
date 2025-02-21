<script setup lang="ts">
import Logo from "@/assets/images/logo.png";

const route = useRoute();
const router = useRouter();

const menuList = reactive([
    {
        type: "General",
        childs: [
            {
                title: "Home",
                icon: "ci:house-01",
                path: "/",
            },
            {
                title: "Transactions",
                icon: "meteor-icons:dollar",
                path: "/transactions",
            },
        ],
    },
    {
        type: "Master",
        childs: [
            {
                title: "Categories",
                icon: "proicons:hash",
                path: "/categories",
            },
            {
                title: "Budgeting",
                icon: "ci:chart-pie",
                path: "/budgetings",
            },
            {
                title: "Financials Goals",
                icon: "ci:star",
                path: "/financial-goals",
            },
        ],
    },
    {
        type: "Support",
        childs: [
            {
                title: "Settings",
                icon: "ci:settings",
                path: "/settings",
            },
            {
                title: "Help & Center",
                icon: "ci:circle-help",
                path: "/help-center",
            },
        ],
    },
]);

// Reactive state for the active route
const activeRoute = ref(route.path);

// Update `activeRoute` after each navigation
router.afterEach((to) => {
    activeRoute.value = to.path;
});

// Function to check if a route is active
const isRouteActive = (menuPath: string) => {
    if (menuPath === "/") {
        return activeRoute.value === menuPath;
    }
    return activeRoute.value.startsWith(menuPath);
};
</script>

<template>
    <aside
        id="logo-sidebar"
        class="w-full top-0 md:col-span-sidebar row-span-sidebar left-0 h-screen overflow-y-auto transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
    >
        <div class="h-full px-3 py-4 overflow-y-auto bg-main no-scrollbar">
            <a href="https://flowbite.com/" class="flex items-center mb-5">
                <img
                    :src="Logo"
                    class="h-6 me-3 sm:h-[50px]"
                    alt="Flowbite Logo"
                />
                <span
                    class="self-center text-xl font-semibold whitespace-nowrap text-charcoal"
                    >lazyFin</span
                >
            </a>

            <!-- Wallet Option -->
            <section
                class="my-5 px-2.5 bg-secondary rounded-lg py-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[90%] flex justify-between items-center"
            >
                <section class="flex items-center gap-x-3">
                    <div
                        class="w-10 h-10 bg-fourth rounded-lg flex items-center justify-center text-txt-secondary"
                    >
                        <Icon name="hugeicons:purse" size="2rem" />
                    </div>
                    <section class="">
                        <p class="font-medium text-xs 2xl:text-sm">
                            Dompet utama
                        </p>
                        <p
                            class="text-txt-secondary text-[10px] 2xl:text-xs mt-1"
                        >
                            free plan
                        </p>
                    </section>
                </section>
                <div class="w-6 h-6 bg-fourth cursor-pointer">
                    <Icon name="ci:caret-down-md" size="1.5rem" />
                </div>
            </section>
            <!-- Wallet Option -->

            <!-- Menu list  -->
            <ul class="space-y-2 font-medium w-[90%]">
                <div v-for="(item, index) in menuList" :key="index">
                    <p
                        class="p-2 text-txt-secondary uppercase text-xs 2xl:text-sm"
                    >
                        {{ item.type }}
                    </p>
                    <NuxtLink
                        v-for="(child, number) in item.childs"
                        :key="number"
                        :to="child.path"
                        class="text-xs 2xl:text-sm w-full z-50 flex items-center px-2 py-3 text-gray-900 rounded-lg group"
                        :class="
                            isRouteActive(child.path)
                                ? 'text-charcoal bg-fourth'
                                : 'hover:bg-fourth hover:text-charcoal text-txt-secondary'
                        "
                    >
                        <Icon :name="child.icon" size="1.2rem" />
                        <span class="ms-3">
                            {{ child.title }}
                        </span>
                    </NuxtLink>
                </div>
            </ul>
            <!-- Menu list  -->

            <!-- User Profile -->
            <section
                class="my-5 bg-secondary rounded-lg py-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[90%]"
            >
                <section
                    class="flex px-2.5 pb-2 justify-between items-center border-b"
                >
                    <div>
                        <p class="font-medium text-xs 2xl:text-sm">
                            Rafli Haidar Nashif
                        </p>
                        <p class="text-txt-secondary text-[10px] 2xl:text-xs">
                            raflihaidar@gmail.com
                        </p>
                    </div>
                    <div class="w-6 h-6 bg-fourth cursor-pointer">
                        <Icon name="ci:caret-down-md" size="1.5rem" />
                    </div>
                </section>
                <section
                    class="px-2.5 pt-2 cursor-pointer text-sm text-txt-secondary flex items-center gap-x-2"
                >
                    <Icon name="ic:outline-logout" size="1.5rem" />
                    <p class="text-xs 2xl:text-sm">Logout</p>
                </section>
            </section>
            <!-- User Profile -->
        </div>
    </aside>
</template>

<style scoped>
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
