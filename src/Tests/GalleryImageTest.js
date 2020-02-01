import React, {useEffect, useState} from 'react';
import Gallery from "react-photo-gallery";
import {Button, Form, Icon, Input, Modal, Radio, Select, Switch, Upload} from "antd";
import FormError from "../Errors";
import {makeStyles} from "@material-ui/core";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {fetchGalleryAlbum} from "../../actions/imageAction";


const photos = [
    {
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 1,
        height: 1
    },
    {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/PpOHJezOalU/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width: 4,
        height: 3
    }
];


const useStyles = makeStyles(theme => ({
    pictureCard: {
        '& + div': {
            display: 'flex',
            marginTop: theme.spacing(),
        }
    },
}));


function columns(containerWidth) {
    return Math.ceil(containerWidth / 200);
}

const GalleryImageTemp = () => {

    const albums = useSelector(state => state.images.albums);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGalleryAlbum());
    }, [dispatch]);

    return (
        <div>
            <UploadForm albums={albums}/>
            <Gallery photos={photos} direction="column" columns={columns}/>
        </div>
    );
};

export default GalleryImageTemp;


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const UploadForm = Form.create({name: 'carousel_upload'})(
    ({form, onAddCarousel, albums}) => {
        const [imageUrl, setImageUrl] = useState(null);
        const [visible, setVisible] = useState(false);
        const [previewVisible, setPreviewVisible] = useState(false);
        const [loading, setLoading] = useState(false);

        const classes = useStyles();


        const handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }

            setImageUrl(file.url || file.preview);
            setPreviewVisible(true);
        };

        const handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    const formData = new FormData();

                    if (typeof values.image == "object") {
                        for (let data in values.image) {
                            formData.append("image[]", values.image[data]);
                        }
                    }
                    formData.append("album_add", values.album_add ? 1 : 0);

                    // for (let field in values) {
                    //     if (typeof values[field] == "object") {
                    //         for (let data in values[field]) {
                    //             formData.append(field + "[]", values[field][data]);
                    //         }
                    //     } else formData.append(field, values[field]);
                    // }
                    // formData.append("album_add", values.album_add ? 1 : 0);


                    axios.post('/api/gallery/image', formData).then((res) => {
                        console.log(res);
                        setLoading(false);
                    }).catch(err => {
                        setLoading(false);
                    })
                    // onAddCarousel(values).then(res => {
                    //     if (res) {
                    //         form.resetFields();
                    //         setImageUrl(null);
                    //         setVisible(false);
                    //     }
                    //     setLoading(false);
                    // })
                }
            });
        };

        const normFile = (e) => {
            if (Array.isArray(e)) return e;

            return e && e.fileList && e.fileList.map(image => image.originFileObj);
        };

        const dummyRequest = ({onSuccess}) => setTimeout(() => onSuccess("success"), 0);


        console.log(albums);

        return (
            <>
                <Button icon={'picture'} type={"primary"} onClick={() => setVisible(true)}>
                    Add Gallery Image
                </Button>
                <Modal
                    visible={visible}
                    width={600}
                    style={{maxWidth: 'calc(100vw - 16px)'}}
                    okText={<><Icon type="upload"/> Upload Image</>}
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

                        <Form.Item
                            label="Add Images to an Album ?"
                            style={{marginBottom: 8, display: 'flex'}}
                        >
                            {form.getFieldDecorator('album_add', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Switch checkedChildren="Yes" unCheckedChildren="No"/>)}
                        </Form.Item>

                        {form.getFieldValue('album_add') && <Form.Item
                            style={{marginBottom: 8}}
                        >
                            {form.getFieldDecorator('album', {})(
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Please select an album"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {albums.map(album => <Select.Option
                                        key={album.id}
                                        value={album.id}
                                    >{album.title}</Select.Option>)}
                                </Select>
                            )}
                        </Form.Item>}

                        <Form.Item>
                            {form.getFieldDecorator('image', {
                                valuePropName: 'file',
                                getValueFromEvent: normFile,
                            })(<Upload.Dragger
                                    multiple={true}
                                    customRequest={dummyRequest}
                                    listType="picture-card"
                                    className={classes.pictureCard}
                                    onPreview={handlePreview}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox"/>
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data
                                        or
                                        other
                                        band files
                                    </p>
                                </Upload.Dragger>
                            )}
                        </Form.Item>
                        <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                            <img alt="example" style={{width: '100%'}} src={imageUrl}/>
                        </Modal>
                    </Form>
                </Modal>
            </>
        )
    }
);
