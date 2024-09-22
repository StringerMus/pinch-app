import React from 'react';
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
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
        <Card.Body>
            <Media className="align-items-center justify-content-between" >
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className='d-flex align-items-center'>
                    <span>{updated_at}</span>
                    {is_owner && postPage && "..."}
                </div>
            </Media>

        </Card.Body>
        
        <Link to={`/listings/${id}`}>
            <Card.Img src={image} alt={item_name} />
        </Link>
        <Card.Body>
            {item_name && <Card.Title className='text-center'>{item_name}</Card.Title>}
            {description && <Card.Title className='text-center'>{description}</Card.Title>}
            {description && <Card.Title className='text-center'>{category}</Card.Title>}
            {description && <Card.Title className='text-center'>{price}</Card.Title>}
            {description && <Card.Title className='text-center'>{location}</Card.Title>}
            {description && <Card.Title className='text-center'>{contact_email}</Card.Title>}
            <div className={styles.PostBar}>
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
        </Card.Body>
    </Card>
  );
};

export default Post;