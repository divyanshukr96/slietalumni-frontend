import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Avatar, Button, Icon, Tooltip, Upload} from "antd";
import TmpProfile from "assets/profile-image.png"


const styles = theme => ({
    profilePhoto: {
        position: 'relative',
        // // top: '50%',
        // bottom: 0,
        // left: 8,
        maxWidth: 160,
        maxHeight: 160,
        [theme.breakpoints.down(800)]: {
            // top: 'calc(30% - 24px)',
            // left: '50%',
            // transform: 'translateX(-50%)'
        },
        [theme.breakpoints.down(500)]: {
            maxWidth: 120,
            maxHeight: 120,
        },
        backgroundColor: '#bfbfbf',
        borderRadius: '50%',
        border: '1px solid #bfbfbf',
        cursor: "pointer",
        overflow: 'hidden',
        '&:hover': {
            '& $image': {
                opacity: 1,
            }
        },
    },
    avatar: {
        width: 'fit-content',
        height: 160,
        [theme.breakpoints.down(500)]: {
            height: 120,
        },
    },
    image: {
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 5,
        '& > div': {
            height: 'unset !important',
            width: 'unset !important',
            borderRadius: '50% !important',
            margin: '0 auto !important',
            float: 'right',
            '& > span': {
                display: 'flex !important',
            }
        }
    },
    imageAction: {
        position: 'absolute',
        bottom: 0,

        backgroundColor: "rgba(255, 255, 255, .8)",
        width: '100%',
        textAlign: 'center',
        '& + $image': {
            display: 'none',
        }
    },
});

class ProfilePhoto extends Component {
    state = {
        file: null,
        uploading: false,
    };

    handleSubmit = e => {
        const {file} = this.state;
        if (!file) return false;
        const formData = new FormData();
        formData.append('image', file);
    };

    render() {
        const {classes, profile} = this.props;
        const {file} = this.state;
        return (
            <div className={classes.profilePhoto}>
                <Avatar
                    className={classes.avatar}
                    src={file ? URL.createObjectURL(file) : profile || TmpProfile}
                />
                {file && <div className={classes.imageAction}>
                    <Tooltip placement="top" title={"Accept"}>
                        <Button type="primary" key="ok" ghost shape="circle" icon="check" size={"small"}
                                style={{margin: `10px 4px`}}
                                onClick={this.handleSubmit}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="Cancel">
                        <Button type="danger" key="cancel"
                                ghost shape="circle" icon="close" size={"small"}
                                style={{margin: `10px 4px`}}
                                onClick={() => this.setState({file: null})}
                        />
                    </Tooltip>
                </div>}
                <Upload
                    accept="image/*"
                    name="cover"
                    listType="picture-card"
                    className={classes.image}
                    showUploadList={false}
                    beforeUpload={file => {
                        this.setState({file});
                        return false
                    }}
                >
                    <Tooltip placement="top" title="Change Profile">
                        <Icon type={'camera'} style={{fontSize: 20}}/>
                    </Tooltip>
                </Upload>
            </div>
        );
    }
}


export default withStyles(styles)(ProfilePhoto);
