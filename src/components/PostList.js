import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { GET_POSTS } from "../graphql/queries";
import { PostItem } from "./PostItem";
import { POSTS_PER_PAGE_COUNT } from "../common/const";

export const PostList = () => {
  const history = useHistory();
  const { num } = useParams();
  const { data } = useQuery(GET_POSTS, {
    variables: {
      limit: POSTS_PER_PAGE_COUNT,
      offset: (num - 1) * POSTS_PER_PAGE_COUNT,
      // orderBy: {
      //   title: "asc",
      //   createdAt: "desc",
      // },
    },
  });

  return (
    <div className="page-layout">
      <h2>Posts</h2>
      {data && data.posts.map((it, index) => <PostItem key={index} {...it} />)}
      <span
        className="page-count_control"
        onClick={() => {
          if (num > 1) {
            history.push(`/page/${num - 1}`);
          }
        }}
      >
        Prev
      </span>
      <span
        className="page-count_control"
        onClick={() => {
          if (num * POSTS_PER_PAGE_COUNT < data.postsCount) {
            history.push(`/page/${+num + 1}`);
          }
        }}
      >
        Next
      </span>
    </div>
  );
};
