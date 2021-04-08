import { Switch, Route, Redirect } from "react-router-dom";
import { PostList } from "./PostList";
import { Header } from "./Header";
import { CreatePost } from "./CreatePost";
import { EditPost } from "./EditPost";
import { PostPage } from "./PostPage";
import { Search } from "./Search";
import { AuthPage } from "./AuthPage";

export const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/auth" component={AuthPage} />
        <Route exact path="/create" component={CreatePost} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/edit/:id">
          <EditPost />
        </Route>
        <Route exact path="/post/:id">
          <PostPage />
        </Route>
        <Route exact path="/page/:num" component={PostList} />
        <Route exact path="/" render={() => <Redirect to="/page/1" />} />
      </Switch>
    </>
  );
};
