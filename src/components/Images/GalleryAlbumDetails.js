import React, {useEffect, useState} from 'react';
import * as _ from "lodash";
import axios from "axios";
import {Button, PageHeader, Skeleton} from "antd";
import Gallery from "react-photo-gallery";
import {UploadForm} from "./GalleryImage";
import RenderImage from "./RenderImage";
import {deleteGalleryImage} from "../../actions/imageAction";
import {useDispatch} from "react-redux";


function columns(containerWidth) {
    return Math.ceil(containerWidth / 180);
}

const GalleryAlbumDetails = (props) => {
    const [album, setAlbum] = useState(props.location.state);
    const [albumId] = useState(props.match.params.album);

    const dispatch = useDispatch();

    const [selectedList, setSelectedList] = React.useState([]);
    const [deleting, setDeleting] = React.useState(false);


    useEffect(() => {
        function fetchAlbum() {
            axios.get(`/api/gallery/album/${albumId}`).then(({data}) => {
                data.data && setAlbum(data.data);
            })
        }

        if (_.isEmpty(album) ||  props.history.action === "POP") fetchAlbum();
    }, [albumId, props.history.action]);

    const imageRenderer = React.useCallback(
        ({index, left, top, key, photo, direction}) => (
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
                direction={direction}
            />
        ),
        [selectedList, deleting]
    );

    const onDelete = async () => {
        const deletingList = selectedList;
        await setDeleting(true);
        await Promise.all(deletingList.map(async image => {
            await dispatch(deleteGalleryImage(image));
            await setAlbum(data => ({...data, images: album.images.filter(data01 => data01.id !== image)}));
            await setSelectedList(list => (list.filter(d => d !== image)));
        }));
        await setDeleting(false);
    };

    return (
        <Skeleton loading={_.isEmpty(album)}>
            {album && <PageHeader
                title={album.title}
                onBack={() => window.history.back()}
                style={{
                    padding: 0,
                }}
                extra={[
                    <UploadForm key="upload-button" dispatch={() => null} album={album}/>
                ]}
                avatar={{src: album.cover, size: 'large'}}
            >
                <h3 style={{paddingLeft: 8}}>{album.description}</h3>
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
                        {selectedList.length} / {album.images.length} image selected
                    </strong>
                </div>}
                {!_.isEmpty(album.images) && <Gallery
                    photos={album.images}
                    direction="column"
                    columns={columns}
                    targetRowHeight={180}
                    margin={4}
                    renderImage={imageRenderer}
                />}
            </PageHeader>}
        </Skeleton>
    );
};

export default GalleryAlbumDetails;
