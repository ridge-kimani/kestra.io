<script>

export default {
    name: 'TabNav',

    props: {
        categories: {
            type: Array
        },
        filter: {
            type: String
        }
    }
}
</script>

<template>
    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
        <li
            v-for="category in categories"
            :key="category.name"
            class="nav-item"
            role="presentation"
            @click="() => true"
        >
            <button
                class="nav-link"
                :class="{ active: filter === category.name }"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
            >
                {{ category.name }}
            </button>
        </li>
    </ul>
</template>

<style scoped lang='scss'>

</style>