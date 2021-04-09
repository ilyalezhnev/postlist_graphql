import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import { PostItem } from "./PostItem";
import { GetPostsQuery, QueryPostsArgs } from "gentypes/graphql";

export const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useLazyQuery<GetPostsQuery, QueryPostsArgs>(
    GET_POSTS
  );

  return (
    <div className="page-layout">
      <h2>Search posts</h2>
      <input
        type="text"
        name="title"
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      <button
        onClick={() => {
          searchFilter &&
            executeSearch({
              variables: { filter: searchFilter },
            });
        }}
      >
        Search
      </button>

      <br />

      {data &&
        data.posts.map((it: any, index: number) => (
          <PostItem key={index} {...it} />
        ))}
    </div>
  );
};
