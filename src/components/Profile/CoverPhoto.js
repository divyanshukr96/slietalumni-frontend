import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Button, Icon, Tooltip, Upload} from "antd";
import tempcover from "assets/3chad3rzxalsf65nuo7hxciac.svg"

const styles = theme => ({
    coverPhoto: {
        maxHeight: 280,
        objectFit: 'cover',
    },
    button: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 'auto',
    },
    image: {
        '& > div': {
            height: 'unset !important',
            width: 'unset !important',
            borderRadius: '50% !important',
            margin: '0 0 0 8px !important',
            float: 'right',
        }
    }
});

class CoverPhoto extends Component {
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
        const {classes} = this.props;
        const {file} = this.state;
        const image = tempcover;
        return (
            <>
                <img
                    className={classes.coverPhoto}
                    alt="example"
                    src={file ? URL.createObjectURL(file) : image}/>
                <div className={classes.button}
                     style={file && {
                         backgroundColor: 'rgba(255, 255, 255, 1)',
                         padding: '2px 8px',
                     }}>
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
                        <Tooltip placement="top" title="Upload Cover">
                            <Icon type={'camera'} style={{fontSize: 20}}/>
                        </Tooltip>
                    </Upload>
                    {file && ([
                        <Tooltip placement="top" title={"Accept"}>
                            <Button type="primary" key="ok" ghost shape="circle" icon="check" size={"small"}
                                    style={{margin: `10px 4px`}} onClick={this.handleSubmit}/>
                        </Tooltip>,
                        <Tooltip placement="top" title="Cancel">
                            <Button type="danger" key="cancel" ghost shape="circle" icon="close" size={"small"}
                                    style={{margin: `10px 4px`}}
                                    onClick={() => this.setState({file: null})}
                            />
                        </Tooltip>
                    ])}
                </div>
            </>
        );
    }
}

export default withStyles(styles)(CoverPhoto);