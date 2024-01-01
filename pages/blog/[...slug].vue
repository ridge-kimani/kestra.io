<template>
    <div class="container">
        <template v-if="isCommunity() || isBlog()">
            <BlogsList
                :community-news="communityNews"
                :blogs="page"
                :is-community="isCommunity()"
            />
        </template>
        <template v-else> </template>
    </div>
</template>

<script setup>
import NavToc from "~/components/docs/NavToc.vue";
import BlogDetails from "~/components/blogs/BlogDetails.vue";
import BlogsList from "~/components/blogs/BlogsList.vue";

import { sort } from "~/utils/date.js";
import blog from "~/data/blog.js";

const communityNews = ref([]);
const page = ref([]);

const route = useRoute();
const slug =
    "/blog/" +
    (route.params.slug instanceof Array
        ? route.params.slug.join("/")
        : route.params.slug);

const isBlog = () => slug === "/blog/";
const isCommunity = () => slug === "/blog/community";

const fetchBlogs = async () => {
    const { data } = await useAsyncData("blogs", () =>
        queryContent("/blogs/").find()
    );
    sort(data.value);
    return (page.value = data.value);
};

const fetchCommunityNews = async () => {
    const apiURL = "https://api.kestra.io/v1/external-blogs";
    const { data } = await useAsyncData("external-news", () =>
        $fetch(`${apiURL}${slug === "/blog/" ? "?size=4" : ""}`)
    );

    communityNews.value = data.value.results.map((results) => ({
        id: results.id,
        _path: results.link,
        image: results.image,
        category: results.media,
        author: { name: results.author },
        title: results.title,
        date: results.publicationDate,
    }));
    return setCommunityNewsMetaData();
};

const setCommunityNewsMetaData = () =>
    useHead({
        title: blog.title,
        description: blog.description,
    });

const fetchBlog = async () => {
    const { data, error } = await useAsyncData(`blog-post-${slug}`, () => {
        try {
            return queryContent(slug).findOne();
        } catch (e) {
            throw createError({
                statusCode: 404,
                message: error.toString(),
                data: error,
                fatal: true,
            });
        }
    });

    if (error && error.value) {
        throw error.value;
    }

    page.value = data.value;
    return setBlogMetadata(page.value);
};

const setBlogMetadata = (metadata) => {
    const { author, date, description, image, title } = metadata;
    return useHead({
        meta: [
            ...blog.meta({
                description,
                image,
                origin: useRequestURL().origin,
                title,
            }),
        ],
        script: [
            ...blog.script({
                author,
                date,
                description,
                image,
                slug,
                title,
            }),
        ],
    });
};

const fetchData = () => {
    if (isBlog() || isCommunity()) {
        if (isBlog()) fetchBlogs();
        return fetchCommunityNews();
    } else return fetchBlog();
};

fetchData();
</script>

<style scoped lang="scss">
@import "../../assets/styles/variable";
@import "../../assets/styles/docs.scss";

:deep(.slug) {
    margin-left: 0;
}
.img {
    min-width: 100%;
}

.bd-layout {
    display: block;
}
.bd-main {
    row-gap: 0;
    column-gap: 4rem;
}
.bd-content {
    min-width: 100%;
}
h2 {
    line-height: 3.25rem;
    font-weight: 600;
    font-size: 2.375rem !important;
}
.para {
    line-height: 1.375rem;
    font-size: $font-size-sm;
    margin-bottom: $font-size-xs;
    font-weight: 600;
}
:deep(p) {
    line-height: 1.75rem;
}
:deep(h2) {
    font-size: 1.75rem;
    line-height: 2.735rem;
    font-weight: 600;
}
</style>
