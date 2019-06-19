import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Card, Typography} from "antd";
import CoverPhoto from "../components/CoverPhoto";
import ProfilePhoto from "../components/ProfilePhoto";

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

class ProfileDetails extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div style={{maxWidth: 1200, margin: 'auto'}}>
                <Card
                    bodyStyle={{padding: 0}}
                    cover={<CoverPhoto/>}
                    // actions={[<Icon type="setting"/>, <Button block>Profile</Button>, <Icon type="ellipsis"/>, <Icon type="edit"/>]}
                >
                    <div className={classes.container}>
                        <ProfilePhoto/>
                        <div style={{padding: '0 12px'}}>
                            <Title level={3} ellipsis style={{margin: 0}}>Divyanshu Kumar</Title>
                            <Paragraph>Computer Science Engineer</Paragraph>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileDetails);