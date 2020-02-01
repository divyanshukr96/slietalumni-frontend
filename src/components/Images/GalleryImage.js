import React from 'react';
import axios from "axios";
import * as _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import Gallery from "react-photo-gallery";
import {Button, Form, Icon, Input, message, Modal, Select, Switch, Upload} from "antd";
import FormError from "../Errors";
import * as type from "../../actions/actionTypes.js";
import {deleteGalleryImage, fetchGalleryAlbum, fetchGalleryImage} from "../../actions/imageAction";
import RenderImage from "./RenderImage";


function columns(containerWidth) {
    return Math.ceil(containerWidth / 200);
}

const GalleryImage = () => {

    const albums = useSelector(state => state.images.albums);
    const photos = useSelector(state => state.images.gallery);
    const dispatch = useDispatch();

    const [selectedList, setSelectedList] = React.useState([]);
    const [deleting, setDeleting] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchGalleryImage());
        dispatch(fetchGalleryAlbum());
    }, [dispatch]);

    const imageRenderer = React.useCallback(
        ({index, left, top, key, photo}) => (
            <RenderImage
                selected={selectedList.indexOf(photo.id) > -1}
                onSelect={id => {
                    if (deleting) return null;
                    if (selectedList.indexOf(id) > -1) {
                        setSelectedList(list => (list.filter(d => d !== id)))
                    } else {
                        setSelectedList([...selectedList, id])
                    }
                }}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
            />
        ),
        [selectedList, deleting]
    );

    const onDelete = async () => {
        const deletingList = selectedList;
        await setDeleting(true);
        await Promise.all(deletingList.map(async image => {
            await dispatch(deleteGalleryImage(image));
            await setSelectedList(list => (list.filter(d => d !== image)))
        }));
        await setDeleting(false);
    };

    return (
        <div>
            <UploadForm albumList={albums} dispatch={dispatch}/>
            {!_.isEmpty(selectedList) && <div style={{paddingBottom: 8}}>
                <Button icon="close"
                        style={{margin: 4}}
                        onClick={() => setSelectedList([])}
                >Clear Selection</Button>
                <Button
                    icon="delete"
                    type="danger"
                    style={{margin: 4}}
                    loading={deleting}
                    onClick={onDelete}
                >Delete</Button>
                <strong style={{whiteSpace: 'nowrap', margin: 4}}>
                    {selectedList.length} / {photos.length} image selected
                </strong>
            </div>}
            {!_.isEmpty(photos) && <Gallery
                photos={photos}
                columns={columns}
                targetRowHeight={(width) => {
                    if (width < 1350) return 110;
                    return 160;
                }}
                renderImage={imageRenderer}
                margin={4}
            />}
        </div>
    );
};

export default GalleryImage;


export const UploadForm = Form.create({name: 'gallery_image'})(
    ({form, albumList = [], dispatch, album}) => {
        const [visible, setVisible] = React.useState(false);

        const token = localStorage.getItem('token');

        const uploadProps = {
            name: 'image',
            listType: 'picture',
            multiple: true,
            accept: 'image/*',
            action: '/api/gallery/image',
            data: {
                ...(form.getFieldValue('album_add') ? {'album': form.getFieldValue('album')} : {}),
                ...(_.isObject(album) ? {'album': album.id} : {})
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            },
            // onPreview: (e) => null,
            onRemove: (file) => {
                const {data} = file.response;
                if (_.isEmpty(data)) return true;
                axios.delete(`/api/gallery/image/${data.id}`).then(res => {
                    return true;
                }).catch(err => {
                    return false;
                });
            },
            showUploadList: {showDownloadIcon: false, showRemoveIcon: true},

            onChange(info) {
                const {status} = info.file;
                if (status !== 'uploading') {

                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    try {
                        dispatch({
                            type: type.ERROR_VALIDATION,
                            payload: info.file.response,
                            name: 'gallery_image'
                        });
                    } catch (e) {
                    }
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <>
                <div style={{textAlign: 'right', marginBottom: 8}}>
                    <Button
                        icon={_.isEmpty(album) ? 'upload' : 'picture'}
                        type={"primary"}
                        onClick={() => setVisible(true)}
                    >
                        {_.isEmpty(album) ? 'Upload Gallery' : 'Upload'}
                    </Button>
                </div>
                <Modal
                    visible={visible}
                    footer={<Button onClick={() => setVisible(false)}>Close</Button>}
                    onCancel={() => setVisible(false)}
                    destroyOnClose
                >
                    <Form>
                        <FormError form={form} formName="gallery_image"/>

                        {_.isEmpty(album) && <Form.Item
                            label="Add these images to an Album ?"
                            style={{marginBottom: 8, display: 'flex'}}
                        >
                            {form.getFieldDecorator('album_add', {
                                valuePropName: 'checked',
                                initialValue: false
                            })(<Switch checkedChildren="Yes" unCheckedChildren="No"/>)}
                        </Form.Item>}

                        <Form.Item style={{marginBottom: 8}}>
                            {form.getFieldDecorator('album', {
                                ...(_.isObject(album) ? {initialValue: album.title} : {})
                            })(
                                form.getFieldValue('album_add') ? <Select
                                    showSearch
                                    allowClear
                                    placeholder="Please select an album"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {albumList.map(album => <Select.Option
                                        key={album.id}
                                        value={album.id}
                                    >{album.title}</Select.Option>)}
                                </Select> : <Input hidden={_.isEmpty(album)} disabled/>
                            )}
                        </Form.Item>


                        <Upload.Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload.
                            </p>
                        </Upload.Dragger>

                    </Form>
                </Modal>
            </>
        );
    }
);
