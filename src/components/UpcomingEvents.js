import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Card, Icon, List, Typography} from "antd";

const {Paragraph} = Typography;

const styles = theme => ({
    card: {
        '& > :first-child > div div': {
            padding: `8px 0`,
        }
    },
    list: {
        '& > :last-child':{
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

class UpcomingEvents extends Component {
    render() {
        const {classes} = this.props;
        const {card, meta, list} = classes;
        return (
            <>
                <Card
                    headStyle={{minHeight: 'auto'}}
                    bodyStyle={{padding: `0 8px`}}
                    className={card}
                    title={'Upcoming Events'}
                    extra={<Link to={'/events'}>View All</Link>}
                >
                    <List
                        itemLayout="vertical"
                        className={list}
                        dataSource={data}
                        // size="large"
                        pagination={{
                            pageSize: 4,
                            size: 'small',
                            hideOnSinglePage: true,
                        }}
                        renderItem={item => (
                            <List.Item
                                style={{padding: `8px 0`}}
                                actions={[
                                    <span>
                                        <Icon type={"calendar"} style={{marginRight: 8}}/>
                                        {new Date().toDateString()}
                                    </span>,
                                    <a href={'/'}>View Details</a>
                                ]}
                            >
                                <List.Item.Meta
                                    className={meta}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={<Paragraph ellipsis={{rows: 3}} style={{marginBottom: 0}}>
                                        Ant Design, a design language for background applications, is refined by Ant UED
                                        Team Ant Design, a design language for background applications, is refined by
                                        Ant UED
                                        Team Ant Design, a design language for background applications, is refined by
                                        Ant UED
                                        Team
                                    </Paragraph>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </>
        );
    }
}


export default withStyles(styles)(UpcomingEvents);