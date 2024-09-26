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

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

import PopularItems from "./PopularItems";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={9}>
        
        <div className="text-center my-4 mb-3 px-3">
          <h4 className={styles.Welcome}>You don't need to buy when you can borrow</h4> 
          <p className={styles.Sub}>Start by searching for an item or scroll though the listings</p>
        </div>
        <i className={`fa-solid fa-magnifying-glass pl-4 ${styles.SearchIcon}`} />
        <Form className={`px-3 ${styles.SearchBar}`}
        onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text`"
            className="mr-sm-2"
            placeholder="Search for an item" />
        </Form>
        <PopularItems mobile/>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll 
                children={
                  posts.results.map((post) => (
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
      <Col sm={2} className="d-none d-lg-block p-0 p-lg-2">
        <PopularItems />
      </Col>
    </Row>
  );
}

export default PostsPage;