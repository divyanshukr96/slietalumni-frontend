import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Popover, Button, Card} from 'antd';

const styles = theme => ({
    meta: {
        marginBottom: `4px !important`,
        '& h4': {
            marginBottom: `4px !important`,
        },
        '& ~ ul': {
            marginTop: `0 !important`,
        }
    }
});

class ImagePopOver extends Component {
    render() {
        const {meta} = this.props.classes;
        const {data} = this.props;
        const hoverContent = (
            <Card
                hoverable
                style={{width: 220, margin: `-12px -16px`}}
                bodyStyle={{padding: 8}}
                cover={<img alt="example" src={data}/>}
            >
                <Card.Meta
                    className={meta}
                    title={"Europe Street beat beat"}
                />
            </Card>
        );
        return (
            <Popover
                content={hoverContent}
                overlayStyle={{padding: 0}}
            >
                <img height="140" style={{cursor: 'pointer'}} src={this.props.data} alt=""/>
            </Popover>
        );
    }
}

export default withStyles(styles)(ImagePopOver);
