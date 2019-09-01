import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Button, Card, Divider, Icon, Typography} from "antd";

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
        [theme.breakpoints.down('480')]: {
            flexDirection: 'column',
            alignItems: 'center',
            position: 'unset',
            marginTop: -80,
        },
    },

    cardMeta: {
        textAlign: "center",
        '& div': {
            marginBottom: '0 !important'
        }
    },
    postsCount: {
        border: "solid #e8e8e8 1px",
        borderLeft: 'unset',
        borderRight: 'unset',
        padding: '8px',
        margin: '16px 0',
        fontWeight: '500'
    },

});

class ProfileDetails extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Card
                hoverable
                style={{width: '100%', cursor: 'unset'}}
                cover={<div
                    style={{
                        width: 150,
                        height: 150,
                        margin: 'auto',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginTop: 16,
                    }}
                >
                    <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        style={{width: '100%'}}
                    />
                </div>}
                bodyStyle={{
                    padding: '16px 24px'
                }}
            >
                <Card.Meta title="Divyanshu" description="Student (SLIET, Longowal)"
                           className={classes.cardMeta}
                />

                <div className={classes.postsCount}>
                    97 Posts
                    <span style={{float: 'right'}}>100 Follows</span>
                </div>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus eius facilis iste non, nostrum
                quam velit veniam. Architecto at excepturi iste magnam, modi necessitatibus

            </Card>
        );
    }
}

export default withStyles(styles)(ProfileDetails);
