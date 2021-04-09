import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { AddPostMutation, MutationAddPostArgs } from "gentypes/graphql";

export const CreatePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });

  const history = useHistory();

  const [addPost] = useMutation<AddPostMutation, MutationAddPostArgs>(
    ADD_POST,
    {
      variables: {
        title: formState.title,
        description: formState.description,
      },
      update(cache, { data }) {
        const existingData: any = cache.readQuery({
          query: GET_POSTS,
          variables: {
            limit: 5,
            offset: 0,
          },
        });

        cache.writeQuery({
          query: GET_POSTS,
          variables: {
            limit: 5,
            offset: 0,
          },
          data: {
            posts: [data?.addPost, ...existingData?.posts],
          },
        });
      },
      // refetchQueries: [{ query: GET_POSTS }],
      onCompleted: () => {
        history.push("/");
      },
    }
  );

  const onInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-layout">
      <h2>Create post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost();
        }}
      >
        <label>
          Title
          <input
            name="title"
            type="text"
            placeholder="Enter title"
            value={formState.title}
            onChange={onInputChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            placeholder="Enter description"
            value={formState.description}
            onChange={onInputChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
