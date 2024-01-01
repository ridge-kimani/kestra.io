<template>
    <div class="container bd-gutter bd-layout margin">
        <article
            class="bd-main order-1"
            v-if="page"
            :class="{ full: page.rightBar === false }"
        >
            <ContentRenderer :value="page">
                <div class="bd-title">
                    <p data-aos="fade-right" class="para">
                        <NuxtLink to="/">Home</NuxtLink> /
                        <NuxtLink to="/blogs">Blog</NuxtLink>
                    </p>
                    <h2 data-aos="fade-left" class="pt-0">
                        {{ page.title }}
                    </h2>
                </div>
                <NavToc data-aos="fade-zoom" :page="page">
                    <template #header>
                        <BlogDetails :blog="page" />
                    </template>
                </NavToc>
                <div class="bd-content">
                    <NuxtImg
                        loading="lazy"
                        format="webp"
                        quality="80"
                        densities="x1 x2"
                        data-aos="fade-right"
                        class="mb-2 rounded-3 img"
                        :alt="page.title"
                        :src="page.image"
                        fit="cover"
                    />
                    <ClientOnly>
                        <ContentRendererMarkdown
                            data-aos="fade-zoom"
                            class="bd-markdown mt-4"
                            :value="page"
                            data-bs-spy="scroll"
                            data-bs-target="#nav-toc"
                        />
                    </ClientOnly>
                </div>
            </ContentRenderer>
        </article>
        <div class="bottom">
            <DocsBlogs title="More contents" />
            <LayoutNewsletter />
        </div>
    </div>
</template>

<script>
import BlogDetails from "~/components/blogs/BlogDetails.vue";
import NavToc from "~/components/docs/NavToc.vue";

export default {
    name: "Blog",
    components: { NavToc, BlogDetails },
    props: {
        page: {

        }
    }
};
</script>

<style scoped lang="scss"></style>
