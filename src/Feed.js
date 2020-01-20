import React, { useEffect, useState } from 'react';
import API from './API';
import 'antd/dist/antd.css';
import './App.css';
import { Row, Col, Icon, Avatar, Comment, Tooltip, Card, Modal, Spin } from 'antd';


const Feed = () => {

    const [userData, setUserData] = useState([]);
    const [post, setPost] = useState([]);
    const [likes, setLikes] = useState(1)
    const [dislikes, setDisLikes] = useState(1)
    const [action, setAction] = useState('')
    const [modal, setModal] = useState(false)
    const [cmntData, setCmntdta] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        handleUser();
        handlePost();
        handleComment();
    }, [])

    const handleUser = async () => {
        try {
            const apiRes = await API.get(`users.json`)
            setUserData(apiRes.data.users)
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    const handlePost = async () => {
        try {
            const postRes = await API.get(`posts.json`)
            setPost(postRes.data.posts)
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const like = () => {
        setLikes(1);
        setDisLikes(0);
        setAction('liked');

    };

    const dislike = () => {
        setLikes(0);
        setDisLikes(1);
        setAction('disliked');
    };

    const showModal = () => {
        setModal(true);
    };

    const handleCancel = e => {
        setModal(false)
    };

    const handleOk = e => {
        setModal(false)
    };

    const handleComment = async () => {
        try {
            const cmtRes = await API.get(`comments.json`)
            setCmntdta(cmtRes.data.comments);
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon
                    style={{ fontSize: '26px' }}
                    type="like"
                    theme={action === 'liked' ? 'filled' : 'outlined'}
                    onClick={like}
                />
            </Tooltip>
            <span style={{ paddingLeft: 0, cursor: 'auto' }}>{likes}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
                <Icon
                    style={{ fontSize: '26px' }}
                    type="dislike"
                    theme={action === 'disliked' ? 'filled' : 'outlined'}
                    onClick={dislike}
                />
            </Tooltip>
            <span style={{ paddingLeft: 0, cursor: 'auto' }}>{dislikes}</span>

        </span>,
        <span onClick={showModal} key="comment-basic-reply-to" style={{ fontSize: '15px' }} >Add a Comment</span>
    ];

    return (
        <div>
            <Row>
                <Row >
                    <Col span={4}>
                        <label>
                            <Icon type="menu-unfold" />
                        </label>
                    </Col>
                    <Col span={4}><h1>RIDDLE</h1></Col>
                    {
                        <Modal
                            title="Comments"
                            visible={modal}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                            style={{ overflow: "scroll", height: 600 }}
                        >
                            {cmntData && cmntData.length > 0 ?
                                cmntData.map((cmntList) => {
                                    return (
                                        <Row>
                                            <Col span={2}>
                                                {
                                                    loading === true ? <Spin tip="Loading..."> </Spin> :
                                                        <Avatar
                                                            key={cmntList.id}
                                                            src={cmntList.profilePicture}
                                                            alt="Han Solo"
                                                        />
                                                }

                                            </Col>
                                            <Col span={22}>
                                                {loading === true ? <Spin tip="Loading..."> </Spin> : <p >{cmntList.body}</p>}
                                            </Col>
                                        </Row>
                                    );
                                })
                                : null
                            }
                        </Modal>
                    }
                    <Col span={4} >{loading === true ? <Spin tip="Loading..."> </Spin> : <Avatar src={userData && userData.length > 0 ? userData[0].profilepicture : null} />} </Col>
                </Row>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={8}>
                        {post && post.length > 0 ?
                            post.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <Comment key={item.id}
                                            actions={actions}
                                            author={<a>{item.time}</a>}
                                            avatar={
                                                <Avatar
                                                    key={item.id}
                                                    src={item.image}
                                                    alt="Han Solo"
                                                />
                                            }
                                            content={loading === true ? <Spin tip="Loading..."> </Spin> :
                                                <div>
                                                    <p>{item.body}</p>
                                                    <Card
                                                        hoverable
                                                        style={{ width: 450 }}
                                                        cover={<img alt="example" src={item.image} />
                                                        }
                                                    >
                                                    </Card>
                                                </div>
                                            }
                                        />
                                    </div>
                                )
                            })
                            : null}
                    </Col>
                </Row>
            </Row>
        </div>
    )
}
export default Feed;