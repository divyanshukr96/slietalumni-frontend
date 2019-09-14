import React, {useEffect, useState} from 'react';
import HomeCarousel from "../HomeCarousel";
import {Button, Col, Form, Icon, Input, Modal, Row} from "antd";
import FileUploadButton from "../Registration/FileUploadButton";
import {makeStyles, colors} from "@material-ui/core";
import {connect} from "react-redux";
import {addCarousel, fetchCarousel} from "actions/imageAction";


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
                if (!err) onAddCarousel(values).then(res => {
                    if (res) {
                        form.resetFields();
                        setImageUrl(null);
                        setVisible(false);
                    }
                })
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
                    closable={false}
                    destroyOnClose
                >
                    <Form>
                        <Form.Item style={{marginBottom: 0}}>
                            {form.getFieldDecorator('active', {initialValue: 0})(<Input hidden/>)}
                        </Form.Item>
                        <FileUploadButton
                            formProps={form}
                            label={''}
                            name={'image'}
                            dragger={true}
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


const ImageCarouselPreview = () => {
    return (
        <>
            <Button icon={'picture'} type={"dashed"} style={{marginLeft: 8}}>
                Preview
            </Button>
            <Modal>
                <HomeCarousel images={
                    [
                        'https://slietalumni.com/images/sliet-college.jpg',
                        'https://slietalumni.com/images/alumnimeet-2018/meet2018-010.jpg',
                        'https://slietalumni.com/images/student-cell-member-meet-2018-001.JPG',
                        'https://slietalumni.com/images/abhivyakti-08-10-2018-2152.jpg']
                }/>
            </Modal>
        </>
    );
};


const ImageCarousel = ({imagesList, onAddCarousel, fetchCarousel}) => {

    const classes = useStyles();
    useEffect(() => {
        fetchCarousel()
    }, []);

    return (
        <div>
            <div style={{textAlign: 'right', marginBottom: 8}}>
                <ImageCarouselUpload onAddCarousel={onAddCarousel}/>
                <ImageCarouselPreview/>
            </div>

            <Row gutter={4} align={'middle'} type={'flex'} justify={'center'} >
                {imagesList.map((e, i) =>
                    <Col sm={4} key={i} style={{marginBottom: 6}}>
                        <img src={e.image_url} alt="" style={{width: '100%'}}/>
                        {/*<Button type="danger" shape="circle" icon="delete" size={"small"} className={classes.delete}/>*/}
                        {/*<Button type="primary" shape="circle" icon="check" size={"small"} className={classes.active}/>*/}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);