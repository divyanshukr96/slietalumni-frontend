import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Button, Typography, Table} from "antd";
import {fetchNews} from "actions/newsAction";
import 'braft-editor/dist/output.css'

const {Paragraph, Text} = Typography;

const DataRender = (content) => {
    return <Paragraph ellipsis={{rows: 4}} style={{marginBottom: 0, maxHeight: `5.6rem`}}>{content}</Paragraph>;
};


class News extends Component {
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

    render() {
        const {loading, news} = this.props;
        return (
            <Table
                style={{overflow: 'overlay'}}
                loading={loading}
                rowKey="id"
                columns={this.columns}
                dataSource={news}
            />
        );
    }
}

const mapStateToProps = ({news}) => ({
    news: news.news,
    loading: news.loading,
});
const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    onLoading: () => dispatch({type: 'NEWS_LOADING'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);