import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import * as _ from "lodash";
import {Button, Card, Col, Form, Input, Modal, Row} from "antd";
import FormError from "../Errors";
import FileUploadButton from "../Registration/FileUploadButton";
import {addGalleryAlbum, fetchGalleryAlbum} from "actions/imageAction";

const GalleryAlbum = () => {

    const albums = useSelector(state => state.images.albums);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(fetchGalleryAlbum());
    }, [dispatch]);


    return (
        <div>
            <NewAlbum/>
            <Row gutter={4} type="flex" style={{marginTop: 8}}>
                {albums.map(album => <Col xs={12} sm={8} md={6} lg={4} xl={3} key={album.id}>
                    <Card
                        onClick={(e) => history.push(`album/${album.id}`, album)}
                        hoverable
                        style={{maxWidth: 240, marginTop: 4}}
                        cover={<div style={{
                            width: '100%',
                            background: `url(${album.cover}) center no-repeat`,
                            backgroundSize: 'contain',
                            paddingBottom: '75%'
                        }}/>
                        }
                        bodyStyle={{
                            padding: 8,
                        }}
                    >
                        <Card.Meta title={album.title} description={album.description}/>
                    </Card>
                </Col>)}
            </Row>
        </div>
    );
};

export default GalleryAlbum;


const NewAlbum = Form.create({name: 'gallery_album'})(
    ({form}) => {
        const [visible, setVisible] = useState(false);
        const [loading, setLoading] = useState(false);

        const dispatch = useDispatch();


        const handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    dispatch(addGalleryAlbum(_.pickBy(values))).then(res => {
                        if (res) {
                            form.resetFields();
                            setVisible(false);
                        }
                        setLoading(false);
                    })
                }
            });
        };

        return (
            <div>
                <Button icon={'plus'} type={"primary"} onClick={() => setVisible(true)}>
                    New Album
                </Button>

                <Modal
                    visible={visible}
                    width={400}
                    okText="Submit"
                    onOk={handleSubmit}
                    onCancel={() => {
                        setVisible(false);
                    }}
                    confirmLoading={loading}
                    closable={false}
                    destroyOnClose
                >
                    <Form>
                        <FormError form={form} formName="gallery_album"/>
                        <Form.Item style={{marginBottom: 8}}>
                            {form.getFieldDecorator('title', {
                                rules: [
                                    {required: true, message: "Album title is required!"}
                                ]
                            })(<Input placeholder="Enter Album Title"/>)}
                        </Form.Item>
                        <Form.Item style={{marginBottom: 8}}>
                            {form.getFieldDecorator('description', {
                                rules: [
                                    {required: true, message: "Album description is required!"}
                                ]
                            })(<Input.TextArea autoSize={{
                                minRows: 3
                            }} placeholder="Enter Album Description"/>)}
                        </Form.Item>

                        <FileUploadButton
                            formProps={form}
                            label={''}
                            name={'cover'}
                            uploadProps={{
                                listType: "picture",
                                style: {padding: 4}
                            }}
                            style={{textAlign: 'right'}}
                        >
                            <Button icon="picture">Select Album Cover Image</Button>
                        </FileUploadButton>

                    </Form>
                </Modal>
            </div>
        )
    }
);
