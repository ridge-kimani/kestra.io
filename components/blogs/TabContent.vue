<script>
export default {
    name: "TabContent",

    props: {
        categories: {
            type: Array,
        },
        blogs: {
            type: Array,
        },
        filter: {
            type: String
        }
    },

    methods: {
        getHighlightBlog(filter) {
            const blogs = this.blogs.filter(
                (e) => e.category === filter || filter === "All news"
            );
            return blogs[blogs.length - 1];
        },
    },
};
</script>

<template>
    <div class="tab-content" id="myTabContent">
        <div
            v-for="category in categories"
            :key="category.name"
            class="tab-pane fade"
            :class="{ 'show active': filter === category.name }"
            :id="category.name"
            role="tabpanel"
            :aria-labelledby="`${category}-tab`"
        >
            <BlogsHighlightBlogCard
                :blog="getHighlightBlog(category.name)"
                class="mt-5"
            />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
