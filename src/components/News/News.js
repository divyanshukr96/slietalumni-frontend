import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Button, Typography, Table, Divider, Select} from "antd";
import {fetchNews} from "actions/newsAction";
import 'braft-editor/dist/output.css'

const {Paragraph, Text, Title} = Typography;

const DataRender = (content) => {
    return <Paragraph ellipsis={{rows: 4}} style={{marginBottom: 0, maxHeight: `5.6rem`}}>{content}</Paragraph>;
};


class News extends Component {
    state = {viewType: "all"};

    constructor(props) {
        super(props);
        props.onLoading();
        props.fetchNews();
    }

    columns = [
        {title: 'News Title', dataIndex: 'title', render: DataRender,},
        {title: 'Description', dataIndex: 'description_sort', render: DataRender},
        // {
        //     title: 'Content', dataIndex: 'content', render: (content) => DataRender(
        //         <div className="braft-output-content" dangerouslySetInnerHTML={{__html: content}}/>
        //     )
        // },
        {title: 'Created at', dataIndex: 'created_at', className: 'px-0'},
        {
            title: 'Publish By',
            dataIndex: 'published',
            render: (publish, {published_by}) => publish ? <span><Badge status="success"/>{published_by.name}</span> :
                <Text type={"danger"}><Badge status="error"/>Draft</Text>,
        },
        {
            title: 'Publish On',
            dataIndex: 'published_at',
            render: (e) => e ? <span>{e}</span> : <Text>- - - - - -</Text>,
        },
        {
            title: 'Action ',
            dataIndex: 'id',
            render: (id) => (
                <span>
                    <Button onClick={() => this.props.history.push('/sac/news/' + id)} size={"small"}>View</Button>
                </span>
            ),
        },
    ];

    static getDerivedStateFromProps(props, current_state) {
        const search = new URLSearchParams(props.search).get('type');
        return search ? current_state.viewType !== search ? {
            viewType: search,
        } : null : {
            viewType: "all",
        };
    }

    onSelectChange = (type) => {
        this.props.history.replace(`${this.props.location.pathname}?type=${type}`)
    };

    render() {
        const {loading, news, history} = this.props;
        let newsList = news;
        switch (this.state.viewType) {
            case "published":
                newsList = news.filter(e => e.published);
                break;
            case "unpublished":
                newsList = news.filter(e => !e.published);
                break;
            default:
                break;
        }
        return (
            <>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Title level={4}>News</Title>
                    <Select
                        style={{width: 130}}
                        value={this.state.viewType}
                        onChange={this.onSelectChange}
                    >
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="published">Published</Select.Option>
                        <Select.Option value="unpublished">Un-Published</Select.Option>
                    </Select>
                </div>
                <Divider style={{margin: `8px 0`}}/>
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={newsList}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                history.push('/sac/news/' + record.id);
                            },
                            onContextMenu: event => {
                                event.preventDefault();
                            },
                        };
                    }}
                />
            </>
        );
    }
}

const mapStateToProps = ({news, router}) => ({
    news: news.news,
    loading: news.loading,
    search: router.location.search,
});

const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    onLoading: () => dispatch({type: 'NEWS_LOADING'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
