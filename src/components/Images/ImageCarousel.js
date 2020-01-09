import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import {Button, Col, Form, Icon, Input, Modal, Row, Typography} from "antd";
import HomeCarousel from "../HomeCarousel";
import FileUploadButton from "../Registration/FileUploadButton";
import {activateCarousel, addCarousel, deleteCarousel, fetchCarousel} from "actions/imageAction";
import FormError from "../Errors";

const {Paragraph} = Typography;

const useStyles = makeStyles(theme => ({
    upload: {
        marginBottom: 0,
        '& .ant-upload': {
            width: '100%',
            minHeight: 250,
        }
    },
    delete: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
    active: {
        position: 'absolute',
        top: 8,
        right: 8,
    }
}));

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const ImageCarouselUpload = Form.create({name: 'carousel_upload'})(
    ({form, onAddCarousel}) => {
        const [imageUrl, setImageUrl] = useState(null);
        const [visible, setVisible] = useState(false);
        const [loading, setLoading] = useState(false);

        const classes = useStyles();

        const handleChange = info => {
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, imageUrl =>
                    setImageUrl(imageUrl),
                );
            }
        };

        const handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onAddCarousel(values).then(res => {
                        if (res) {
                            form.resetFields();
                            setImageUrl(null);
                            setVisible(false);
                        }
                        setLoading(false);
                    })
                }
            });
        };

        return (
            <>
                <Button icon={'picture'} type={"primary"} onClick={() => setVisible(true)}>
                    Add Carousel
                </Button>
                <Modal
                    visible={visible}
                    width={1300}
                    style={{maxWidth: 'calc(100vw - 16px)'}}
                    okText={<><Icon type="upload"/> Upload and Add</>}
                    onOk={handleSubmit}
                    onCancel={() => {
                        setVisible(false);
                        setImageUrl(null);
                    }}
                    confirmLoading={loading}
                    closable={false}
                    destroyOnClose
                >
                    <Form>
                        <FormError form={form} formName="carousel_upload"/>
                        <Form.Item style={{marginBottom: 0}}>
                            {form.getFieldDecorator('active', {initialValue: 0})(<Input hidden/>)}
                        </Form.Item>
                        <FileUploadButton
                            formProps={form}
                            label={''}
                            name={'image'}
                            dragger="true"
                            uploadProps={{
                                listType: "picture-card",
                                showUploadList: false,
                                onChange: handleChange,
                                style: {padding: 4}
                            }}
                            decoratorProps={{
                                rules: [{required: true, message: 'Please select the carousel image!'}]
                            }}
                            itemProps={{
                                className: classes.upload
                            }}
                        >
                            {imageUrl ? <HomeCarousel images={[imageUrl]}/> :
                                <div style={{padding: `24px 0`}}>
                                    <p style={{margin: 12}}>
                                        <Icon type="picture"
                                              style={{fontSize: 48}} theme={"twoTone"}
                                              twoToneColor="#ef1616"
                                        />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading
                                        company
                                        data or other
                                        band files
                                    </p>
                                </div>
                            }
                        </FileUploadButton>
                    </Form>
                </Modal>
            </>
        )
    }
);


const ImageCarouselPreview = (props) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button icon={'picture'} type={"dashed"} onClick={() => setVisible(true)} style={{marginLeft: 8}}>
                Preview
            </Button>
            <Modal
                visible={visible}
                bodyStyle={{
                    paddingBottom: 8,
                }}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <div style={{marginTop: 18}}>
                    <HomeCarousel images={props.images}/>
                </div>
            </Modal>
        </>
    );
};


const ImageCarousel = ({imagesList, onAddCarousel, fetchCarousel, activateCarousel, deleteCarousel}) => {

    const classes = useStyles();

    useEffect(() => {
        fetchCarousel();
    }, []);

    return (
        <div>
            <div style={{textAlign: 'right', marginBottom: 8}}>
                <ImageCarouselUpload onAddCarousel={onAddCarousel}/>
                <ImageCarouselPreview images={imagesList.filter(im => im.active).map(im => im.image_url)}/>
            </div>

            <Row gutter={4} align={'middle'} type={'flex'} justify={'center'}>
                {imagesList.map((e, i) =>
                    <Col md={6} sm={4} key={i} style={{marginBottom: 6}}>
                        <div style={{position: "relative"}}>
                            <img src={e.image_url} alt="" style={{width: '100%'}}/>
                            <Button
                                type="danger"
                                shape="circle"
                                icon="delete"
                                size={"small"}
                                className={classes.delete}
                                onClick={() => deleteCarousel(e.id)}
                            />
                            <Button
                                type={e.active ? "primary" : "ghost"}
                                shape="circle"
                                icon="check"
                                size={"small"}
                                className={classes.active}
                                onClick={() => activateCarousel(e.id)}
                            />
                        </div>
                        <Paragraph code>Created At : {e.created_at}</Paragraph>
                    </Col>
                )}
            </Row>

        </div>
    );
};

const mapStateToProps = ({images}) => ({
    imagesList: images.images,
});

const mapDispatchToProps = dispatch => ({
    onAddCarousel: (data) => dispatch(addCarousel(data)),
    fetchCarousel: () => dispatch(fetchCarousel()),
    activateCarousel: (id) => dispatch(activateCarousel(id)),
    deleteCarousel: (id) => dispatch(deleteCarousel(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);
