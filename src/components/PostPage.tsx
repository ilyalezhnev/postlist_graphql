import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { GET_POST } from "../graphql/queries";
import { UPDATE_POST } from "../graphql/mutations";
import { NEW_COMMENT_SUBSCRIPTION } from "../graphql/subscriptions";

export const PostPage = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { data, subscribeToMore } = useQuery(GET_POST, {
    variables: {
      id,
    },
    onError: () => {
      history.push("/");
    },
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const addComment = () => {
    console.log("add coment");
    if (comment) {
      updatePost({ variables: { ...data.post, comment } });
    }
    setComment("");
  };

  subscribeToMore({
    document: NEW_COMMENT_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newComment = subscriptionData.data.newComment;

      return Object.assign({}, prev, {
        post: {
          comments: [newComment, ...prev.post.comments],
          __typename: prev.post.__typename,
        },
      });
    },
  });

  return data ? (
    <div className="page-layout">
      <h3>Title: {data.post.title}</h3>
      <hr />
      <div>Description: {data.post.description}</div>
      <hr />
      <br />
      <textarea
        name="comment"
        value={comment}
        placeholder="Your comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={addComment}>Add comment</button>
      <br />
      <div>
        <h4>Comments:</h4>
        {data.post.comments &&
          !!data.post.comments.length &&
          data.post.comments.map((it: any, i: number) => (
            <div key={i}>{it}</div>
          ))}
      </div>
    </div>
  ) : null;
};
