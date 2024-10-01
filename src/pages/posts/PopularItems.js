import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "../../styles/PopularItems.module.css";

const PopularItems = ({ mobile }) => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      let allPosts = [];
      // Starts with the first page
      let nextUrl = `/posts/`;
      
      try {
        // Loop through pages while there's a next URL
        while (nextUrl) {
          const { data } = await axiosReq.get(nextUrl);
          // Append results from the current page
          allPosts = [...allPosts, ...data.results];
          // Update nextUrl with the 'next' value from the response
          nextUrl = data.next;
        }
        // Sort posts by likes_count
        const sortedPosts = allPosts.sort((a, b) => b.likes_count - a.likes_count);
        // Set the top 5 popular posts
        setPopularPosts(sortedPosts.slice(0, 5));
        setHasLoaded(true);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <Container className={mobile ? 'd-lg-none text-center mb-3' : 'd-none d-lg-block'}>
      <p className="text-center">Popular Items</p>
      {hasLoaded ? (
        popularPosts.length ? (
          <div className={mobile ? 'd-flex justify-content-around' : ''}>
            {popularPosts
              .slice(0, mobile ? 3 : popularPosts.length)
              .map((post) => (
                <Card key={post.id} className={`mb-3 mx-1 p-0 ${styles.Card}`}>
                  <Link to={`/listings/${post.id}`}>
                    <Card.Img variant="top" src={post.image} alt={post.item_name} />
                    <Card.Body >
                      <Card.Title className={styles.Font}>{post.item_name}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              ))}
          </div>
        ) : (
          <p>No popular items found.</p>
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularItems;
