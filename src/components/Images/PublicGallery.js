import React from 'react';
import axios from "axios";
import * as _ from "lodash";
import Gallery from "react-photo-gallery";
import {Divider, PageHeader, Skeleton} from "antd";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    loading: {
        '& h3, & li': {
            background: 'white !important'
        }
    }
}));

const PublicGallery = () => {
    const classes = useStyles();
    const [gallery, setGallery] = React.useState(localStorage.gallery ? JSON.parse(localStorage.gallery) : []);

    React.useEffect(() => {
        function fetchGallery() {
            axios.get('/api/public/gallery').then(({data}) => {
                if (data.data) {
                    localStorage.setItem('gallery', JSON.stringify(data.data));
                    setGallery(data.data);
                }
            })
        }

        fetchGallery();
    }, []);

    return (
        <PageHeader style={{maxWidth: 1100, margin: 'auto'}} title={"Gallery"}>
            <Divider style={{margin: '0 0 8px'}}/>
            <Skeleton loading={_.isEmpty(gallery)} className={classes.loading}>
                {!_.isEmpty(gallery) && <Gallery
                    photos={gallery}
                    targetRowHeight={180}
                    onClick={(e, {photo}) => {
                        window.open(photo.image,'_blank');
                    }}
                />}
            </Skeleton>
        </PageHeader>
    );
};

export default PublicGallery;
