import React from 'react';
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Container, Media, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

  return (
        <Card className={styles.Post}>
            <Row>
                <Col md={6} xs={12} className={styles.Post_i}>
                    <Link to={`/listings/${id}`}>
                        <Card.Img src={image} alt={item_name} />
                    </Link>
                    <div className="d-flex justify-content-center align-items-center">
                        {is_owner ? (
                            <OverlayTrigger placement='top' overlay={<Tooltip>Unable to like own listing</Tooltip>}>
                                <i className='fa-solid fa-heart' />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={()=>{}}>
                                <i className={`fa-solid fa-heart ${styles.Heart}`} />
                            </span>
                        ) : currentUser ? (
                            <span onClick={()=>{}}>
                                <i className={`fa-solid fa-heart ${styles.HeartOutline}`} />
                            </span>
                        ) : (
                            <OverlayTrigger placement='top' overlay={<Tooltip>You need to log in</Tooltip>}>
                                <i className='fa-solid fa-heart' />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                        <Link to={`/lisitngs/${id}`}>
                            <i className='fa-regular fa-message' />
                        </Link>
                        {comments_count}
                    </div>
                </Col>
                <Col md={6} xs={12}>
                    <Card.Body>
                        {item_name && <Card.Title className={styles.Post_head}>{item_name}</Card.Title>}
                        {category && <Card.Title className={styles.Post_cat}>{category}</Card.Title>}
                        {price && <Card.Title className={styles.Post_sub}>{price} per day</Card.Title>}
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
                                {is_owner && postPage && " ..."}
                            </div>
                        </Media>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;