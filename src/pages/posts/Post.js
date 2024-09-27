import React from 'react';
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//import { Card, Media, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        like_id,
        likes_count,
        comments_count,
        item_name,
        description,
        category,
        price,
        location,
        contact_email,
        image,
        updated_at,
        postPage,
        setPosts
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/listings/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.push(`/`);
        } catch (err) {
        console.log(err);
      }
    };

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post('/likes/', {post:id});
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                    :post;
                }),
            }));
        } catch(err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
          await axiosRes.delete(`/likes/${like_id}/`);
          setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
              return post.id === id
                ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                : post;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };

  return (
        <Card className={styles.Post}>
            <Row>
                <Col md={6} xs={12}>
                    <Link to={`/listings/${id}`}>
                        <Card.Img src={image} alt={item_name} />
                    </Link>
                    <div className="d-flex justify-content align-items-center">
                        {is_owner ? (
                            <OverlayTrigger placement='top' overlay={<Tooltip>Unable to like own listing</Tooltip>}>
                                <i className='fa-solid fa-heart' />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={handleUnlike}>
                                <i className={`fa-solid fa-heart ${styles.Heart}`} />
                            </span>
                        ) : currentUser ? (
                            <span onClick={handleLike}>
                                <i className={`fa-regular fa-heart ${styles.HeartOutline}`} />
                            </span>
                        ) : (
                            <OverlayTrigger placement='top' overlay={<Tooltip>You need to log in to like a listing</Tooltip>}>
                                <i className='fa-solid fa-heart' />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                        <Link to={`/listings/${id}`}>
                            <i className='fa-solid fa-message' />
                        </Link>
                        {comments_count}
                        {is_owner && postPage &&
                                <MoreDropdown
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                            />}
                    </div>
                </Col>
                <Col md={6} xs={12}>
                    <Card.Body>
                        {item_name && <Card.Title className={styles.Post_head}>{item_name}</Card.Title>}
                        {category && <Card.Title className={styles.Post_cat}>{category}</Card.Title>}
                        {price && <Card.Title className={styles.Post_sub}>£{price} per day</Card.Title>}
                        {location && <Card.Title className={styles.Post_text}>Location: {location}</Card.Title>}
                        {description && <Card.Title className={styles.Post_text}>{description}</Card.Title>}
                        {contact_email && <Card.Title className={styles.Post_text}>Contact email: {contact_email}</Card.Title>}
                        <Media className="align-items-center" >
                            <Link className={styles.Profile} to={`/profiles/${profile_id}`}>
                                <Avatar src={profile_image} height={55} />
                                {owner}
                            </Link>
                            <div className="ml-auto" style={{ marginRight: '20px' }}>
                                <span>{updated_at}</span>
                            </div>
                        </Media>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;