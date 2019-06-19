import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Card, Icon, List, Popover, Typography} from "antd";
import image from '../assets/president.jpg'

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
        '& div:not(:last-child)': {
            marginBottom: 0,
        },
        '& ~ ul': {
            marginTop: `0 !important`,
        }
    },

    scroll: {
        display: 'flex',
        overflow: 'scroll hidden',
        '& *': {
            marginRight: 4,
            // maxHeight: 180,
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
        },
        '&::-webkit-scrollbar': {
            height: 8,
            backgroundColor: '#F5F5F5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#AAA',
            borderRadius: 8,
            backgroundImage: '-webkit-linear-gradient(90deg, rgba(0, 0, 0, .2) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .2) 75%, transparent 75%, transparent)'
        },
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

class FeaturedAlumni extends Component {
    render() {
        const {classes} = this.props;
        const {card, meta, list, scroll, scrollbar} = classes;
        return (
            <>
                <Card
                    headStyle={{minHeight: 'auto'}}
                    bodyStyle={{padding: 0}}
                    className={card}
                    title={'Featured Alumni'}
                    extra={<Link to={'/featured-alumni'}>View All</Link>}
                >
                    <div className={scroll}>
                        {data.map(e => (
                            <Popover
                                align={{
                                    points: ['cc', 'cc']
                                }}
                                content={<Card
                                    style={{width: 220, margin: `-12px -16px`}}
                                    bodyStyle={{padding: 8}}
                                    cover={<img alt="example" src={image}/>}
                                >
                                    <Card.Meta
                                        className={meta}
                                        title={"Europe Street beat beat"}
                                        description="www.instagram.com divyanshu kumar singh sliet colleget"
                                    />
                                </Card>}
                            >
                                <img height="140" style={{cursor: 'pointer'}} src={image} alt=""/>
                            </Popover>
                        ))}
                    </div>
                </Card>
            </>
        );
    }
}


export default withStyles(styles)(FeaturedAlumni);