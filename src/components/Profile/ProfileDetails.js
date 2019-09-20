import React, {useEffect, useState} from 'react';
import {withStyles} from "@material-ui/core";
import {Card, Skeleton, Typography} from "antd";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import About from "./About";
import axios from "axios";

const {Title, Paragraph} = Typography;
const styles = theme => ({
    coverPhoto: {
        maxHeight: 280,
        objectFit: 'cover',
    },
    image: {
        position: 'absolute',
        top: 8,
        right: 0,
        '& > div': {
            height: 'unset !important',
            width: 'unset !important',
            borderRadius: '50% !important',
        }
    },

    container: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        left: 8,
        [theme.breakpoints.down('480')]:{
            flexDirection: 'column',
            alignItems: 'center',
            position: 'unset',
            marginTop:  -80,
        },
    },
});

function ProfileDetails(props) {
    const {classes} = props;

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});

    async function fetchUrl() {
        const {data} = await axios.get("api/auth/profile");
        if (data.data) setProfile(data.data);
    }

    useEffect(() => {
        fetchUrl().then(r => setLoading(false));
    }, []);

    if (loading) return <Skeleton/>;
    return (
        <div style={{maxWidth: 1200, margin: 'auto'}}>
            <Card
                bodyStyle={{padding: 0}}
                cover={<CoverPhoto/>}
            >
                <div className={classes.container}>
                    <ProfilePhoto profile={profile.image}/>
                    <div style={{padding: '0 12px'}}>
                        <Title level={3} ellipsis style={{margin: 0}}>{profile.name}</Title>
                        <Paragraph>@{profile.username}</Paragraph>
                    </div>
                </div>
            </Card>
            <About profile={profile}/>
        </div>
    );
}

export default withStyles(styles)(ProfileDetails);