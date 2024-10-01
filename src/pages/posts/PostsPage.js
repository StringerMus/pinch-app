import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

import PopularItems from "./PopularItems";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const likedPage = pathname === "/liked";

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]); 

  return (
    <Row className="h-100">
      {/* Col to space left side of the page*/}
      <Col lg={1}></Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Conditionally render the welcome text and steps */}
        {!likedPage && (
          <>
            <div className="text-center my-4 mb-4 px-3">
              <h3 className={styles.Welcome}>
                You don't need to buy when you can borrow
              </h3>
            </div>
            <Row className={`text-center py-3 px-5 ${styles.Steps}`}>
              <Col>
                <i className={`fa-solid fa-magnifying-glass ${styles.Steps}`} />
                <p className={styles.Steps}>1. Search for the item you need</p>
              </Col>
              <Col>
                <i className={`fa-solid fa-envelope-open-text ${styles.Steps}`} />
                <p className={styles.Steps}>2. Contact the owner</p>
              </Col>
              <Col>
                <i className={`fa-regular fa-handshake ${styles.Steps}`} />
                <p className={styles.Steps}>3. Arrange payment, pick-up & drop-off</p>
              </Col>
            </Row>
            <i className={`fa-solid fa-magnifying-glass pl-4 ${styles.SearchIcon}`} />
            <Form
              className={`px-3 ${styles.SearchBar}`}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search for an item"
              />
            </Form>
            <PopularItems mobile />
            <p className={`text-center my-4 mb-3 px-3 ${styles.Sub}`}>
              Start by searching for an item or scroll though the listings
            </p>
          </>
        )}

        {/* Render the post listings */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      {/* Conditionally hide PopularItems sidebar */}
      {!likedPage && (
        <Col sm={2} className="d-none d-lg-block p-0 p-lg-2">
          <PopularItems />
        </Col>
      )}
    </Row>
  );
}

export default PostsPage;