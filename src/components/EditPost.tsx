import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { UPDATE_POST } from "../graphql/mutations";
import { GET_POSTS, GET_POST } from "../graphql/queries";

export const EditPost = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useQuery(GET_POST, {
    variables: {
      id,
    },
    onCompleted: (data) => {
      const { post } = data;
      const { title, description } = post;
      setFormState({ ...formState, title, description });
    },
    onError: () => {
      history.push("/");
    },
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    variables: {
      id,
      title: formState.title,
      description: formState.description,
    },
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => history.push("/"),
  });

  const onInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Create new post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePost();
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
