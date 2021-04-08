import { Link, useHistory } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../common/const";

export const Header = (props: any) => {
  const isUserAuth = localStorage.getItem(AUTH_TOKEN_KEY);
  const history = useHistory();

  return (
    <div className="page-layout header">
      <Link to="/">Main</Link>
      <Link to="/create">Create Post</Link>
      {isUserAuth && <Link to="/search">Search Posts</Link>}

      {isUserAuth ? (
        <div
          className="pointer"
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            history.push(`/`);
          }}
        >
          Logout
        </div>
      ) : (
        <Link to="/auth">Signup</Link>
      )}
    </div>
  );
};
