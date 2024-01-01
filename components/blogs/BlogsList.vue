<template>
    <div class="mt-5 mb-2">
        <div v-if="slug === '/blogs/community'">
            <BlogsCommunityNews :community-news="externalNews" />
        </div>
        <div class="row" v-else>
            <div class="pe-5 col-12 col-md-8">
                <BlogsHeader />
                <BlogsTabNav :categories="categories" />
                <BlogsTabContent
                    :categories="categories"
                    :blogs="blogs"
                    :filter="filter"
                />
                <BlogsPosts :blogs='paginatedBlogs' />
            </div>
            <BlogsCommunitySideBar :community-news='externalNews' />
            <BlogsPagination :blogs='blogs' />
        </div>
    </div>
</template>

<script>
export default {
    name: "BlogsList",
    props: {
        blogs: {
            type: Array,
            required: true,
        },
        externalNews: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            filter: "All news",
            categories: [
                {
                    name: "All news",
                },
                {
                    name: "Company News",
                },
                {
                    name: "News & Products Updates",
                },
                {
                    name: "Solutions",
                },
            ],
            slug: "",
            pageList: [],
            itemsPerPage: 25,
            pageNo: 1,
        };
    },
    computed: {
        blogsList() {
            const blogs = this.blogs.filter(
                (e) => e.category === this.filter || this.filter === "All news"
            );
            return blogs
                .filter(
                    (e) =>
                        e.category === this.filter || this.filter === "All news"
                )
                .slice(0, blogs.length - 1)
                .reverse();
        },
        totalPages() {
            return Math.ceil(this.blogs.length / this.itemsPerPage);
        },
        paginatedBlogs() {
            return this.blogsList.slice(
                (this.pageNo - 1) * this.itemsPerPage,
                this.pageNo * this.itemsPerPage
            );
        },
    },
    created() {
        this.slug =
            "/blogs/" +
            (this.$route.params.slug instanceof Array
                ? this.$route.params.slug.join("/")
                : this.$route.params.slug);
        const breadcrumbs = [
            ...new Set(this.slug.split("/").filter((r) => r !== "")),
        ];
        this.pageList = breadcrumbs.map(
            (___, index) => "/" + breadcrumbs.slice(0, index + 1).join("/")
        );
    },
    methods: {
        setFilterBlogs(id) {
            this.filter = id;
        },
        getHighlightBlog(filter) {
            const blogs = this.blogs.filter(
                (e) => e.category === filter || filter === "All news"
            );
            return blogs[blogs.length - 1];
        },

        changePage(value) {
            this.pageNo = value;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variable";

.right-side-bar {
    background-color: $purple-17;
    height: fit-content;
    padding: 2.25rem 2rem;

    .heading {
        line-height: 1.875rem;
        font-weight: 100;
    }
    .btn {
        border: 1px solid $purple-13;
        --bs-btn-bg: #fff;
    }
}

.nav-item {
    .nav-link {
        color: $black;
    }
    .active {
        color: $indigo;
        border: none;
        border-bottom: 2px solid $primary;
    }
}
h1 {
    font-size: $font-size-4xl;
    font-weight: 100;
    line-height: 2.75rem;
    margin-bottom: 2rem;
}
h4 {
    margin-bottom: 2rem;
}
</style>
