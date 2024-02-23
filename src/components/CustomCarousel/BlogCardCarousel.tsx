import React from "react";
import Carousel from "react-elastic-carousel";
import BlogCard from "../CustomBlogCard/BlogCard";
const blogImage = require("assets/img/whatisblog.png");

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 200, itemsToShow: 1 },
  { width: 400, itemsToShow: 2 },
  { width: 850, itemsToShow: 4 },
];

export interface BlogCardCarouselProps {}

const BlogCardCarousel: React.FC<BlogCardCarouselProps> = () => {
  return (
    <Carousel
      isRTL={false}
      breakPoints={breakPoints}
      showArrows={false}
      pagination={true}
      itemPadding={[10, 20, 10, 0]}
    >
      <BlogCard
        url={blogImage}
        href={""}
        title="Blog title"
        subtitle="Blog subtitle"
      />
      <BlogCard
        url={blogImage}
        href={""}
        title="Blog title"
        subtitle="Blog subtitle"
      />
      <BlogCard
        url={blogImage}
        href={""}
        title="Blog title"
        subtitle="Blog subtitle"
      />
      <BlogCard
        url={blogImage}
        href={""}
        title="Blog title"
        subtitle="Blog subtitle"
      />
      <BlogCard
        url={blogImage}
        href={""}
        title="Blog title"
        subtitle="Blog subtitle"
      />
      <BlogCard
        url={blogImage}
        href={""}
        title="Blog title"
        subtitle="Blog subtitle"
      />
    </Carousel>
  );
};

export default BlogCardCarousel;
