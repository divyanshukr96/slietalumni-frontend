import React, {Component} from 'react';
import {Avatar, Card, Icon, List} from "antd";

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class FeedsCard extends Component {
    render() {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    dataSource={listData}
                    footer={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={item => (
                        <Card
                            hoverable
                            style={{marginBottom: 8}}
                            bodyStyle={{paddingTop: 8, paddingBottom: 8}}
                        >
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="star-o" text="156"/>,
                                    <IconText type="like-o" text="156"/>,
                                    <IconText type="message" text="2"/>,
                                ]}
                            >
                                <List.Item.Meta
                                    className={'hello'}
                                    avatar={<Avatar src={item.avatar} size={"large"}/>}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                                <div>
                                    {item.content}
                                </div>
                            </List.Item>
                        </Card>

                    )}
                />,
            </div>
        );
    }
}

export default FeedsCard;