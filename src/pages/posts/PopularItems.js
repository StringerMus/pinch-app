import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"; // Import Card to use for displaying item name and image
import { Link } from "react-router-dom"; // Import Link for navigation
import styles from "../../styles/PopularItems.module.css";

const PopularItems = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/`);
        // Sort posts by likes_count to determine popularity
        const sortedPosts = data.results.sort((a, b) => b.likes_count - a.likes_count);
        setPopularPosts(sortedPosts.slice(0, 5)); // Get top 5 popular items
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <Container>
      <p>Popular Items</p>
      {hasLoaded ? (
        popularPosts.length ? (
          popularPosts.map((post) => (
            <Card key={post.id} className={`mb-3 ${styles.Card}`}>
              <Link to={`/listings/${post.id}`}> {/* Link to the post detail page */}
                <Card.Img variant="top" src={post.image} alt={post.item_name} />
                <Card.Body>
                  <Card.Title className={styles.Font}>{post.item_name}</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          ))
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
