import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { DELETE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { POSTS_PER_PAGE_COUNT } from "../common/const";

export const PostItem = (props) => {
  const { id, title, description } = props;
  const history = useHistory();
  const { num } = useParams();

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      id: id,
    },
    refetchQueries: [
      {
        query: GET_POSTS,
        variables: {
          limit: POSTS_PER_PAGE_COUNT,
          offset: (num - 1) * POSTS_PER_PAGE_COUNT,
        },
      },
    ],
  });

  return (
    <div className="post_layout">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <div className="post_close-btn" onClick={deletePost}>
          X
        </div>
        <button onClick={() => history.push(`/edit/${id}`)}>Edit</button>
        <button onClick={() => history.push(`/post/${id}`)}>Open</button>
      </div>
    </div>
  );
};
