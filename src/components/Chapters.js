import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Card, Icon, List, Popover, Typography} from "antd";
import Scrollable from "../components/Scrollable";
import image from "../assets/president.jpg";
import ImagePopOver from "../components/ImagePopOver";

const {Paragraph} = Typography;

const styles = theme => ({
    card: {
        '& > :first-child > div div': {
            padding: `8px 0`,
        }
    },
    list: {
        '& > :last-child': {
            marginTop: 0,
        },
    },
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

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
];

class Chapters extends Component {
    render() {
        const {classes} = this.props;
        const {card, meta, list} = classes;
        return (
            <>
                <Card
                    style={{marginBottom: 8}}
                    headStyle={{minHeight: 'auto'}}
                    bodyStyle={{padding: 0}}
                    className={card}
                    title={'Chapters'}
                    extra={<Link to={'/chapters'}>View All</Link>}
                >
                    <Scrollable>
                        {data.map(e => (
                            <Popover
                                align={{
                                    points:['cc','cc']
                                }}
                                content={
                                    <Card
                                        style={{width: 220, margin: `-12px -16px`}}
                                        bodyStyle={{padding: 8}}
                                        cover={<img alt="example" src={image}/>}
                                    >
                                        <Card.Meta
                                            className={meta}
                                            title={"Europe Street beat beat"}
                                        />
                                    </Card>
                                }
                            >
                                <img height="140" style={{cursor: 'pointer'}} src={image} alt=""/>
                            </Popover>
                        ))}
                    </Scrollable>
                </Card>
            </>
        );
    }
}


export default withStyles(styles)(Chapters);