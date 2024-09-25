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
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

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
                    message="No results found. Adjust the search keyword or like a post."
                    filter={`liked=true`}
                  />
                )}
              />
              <Route exact path="/signin" render={() =><SignInForm />} />
              <Route exact path="/signup" render={() =><SignUpForm />} />
              <Route exact path="/listings/create" render={() =><PostCreateForm />} />
              <Route exact path="/listings/:id" render={() =><PostPage />} />
              <Route exact path="/listings/:id/edit" render={() =><PostEditForm />} />
              <Route exact path="/profiles/:id" render={() => <ProfilePage />}/>
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;