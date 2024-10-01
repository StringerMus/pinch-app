import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container'
import {Route,Switch} from 'react-router-dom'
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

function App() {

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => (
                <PostsPage message="No results found, try a different search."/>
                )}
              />
              <Route
                exact
                path="/liked"
                render={() => (
                  <PostsPage
                    message="No results found, like a post for results to appear."
                    filter={`liked=true`}
                    likedPage={true}
                  />
                )}
              />
              <Route exact path="/signin" render={() =><SignInForm />} />
              <Route exact path="/signup" render={() =><SignUpForm />} />
              <Route exact path="/listings/create" render={() =><PostCreateForm />} />
              <Route exact path="/listings/:id" render={() =><PostPage />} />
              <Route exact path="/listings/:id/edit" render={() =><PostEditForm />} />
              <Route exact path="/profiles/:id" render={() => <ProfilePage />}/>
              <Route
                exact
                path="/profiles/:id/edit/username"
                render={() => <UsernameForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit/password"
                render={() => <UserPasswordForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit"
                render={() => <ProfileEditForm />}
              />
              <Route render={() => <NotFound /> } />
            </Switch>
          </Container>
        </div>
  );
}

export default App;