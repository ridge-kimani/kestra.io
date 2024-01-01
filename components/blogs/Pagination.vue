<script>
export default {
    name: "Pagination",

    data: () => ({
        itemsPerPage: 25,
    }),

    props: {
        blogs: {
            type: Array,
        },
    },

    methods: {
        changePage(value) {
            this.pageNo = value;
        },
    },

    computed: {
        totalPages() {
            return Math.ceil(this.blogs.length / this.itemsPerPage);
        },
    },
};
</script>

<template>
    <div class="d-flex justify-content-between my-5">
        <div class="items-per-page">
            <select
                class="form-select"
                aria-label="Default select example"
                v-model="itemsPerPage"
                @change="fetchPageData"
            >
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
            </select>
        </div>
        <CommonPagination
            :totalPages="totalPages"
            @on-page-change="changePage"
            v-if="totalPages > 1"
        />
    </div>
</template>

<style scoped lang="scss"></style>
