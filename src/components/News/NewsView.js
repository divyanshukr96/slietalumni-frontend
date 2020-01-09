import React, {Component} from 'react';
import {connect} from "react-redux";
import * as _ from 'lodash'
import {Button, Divider, Modal, Skeleton, Typography} from "antd";
import {deleteNews, fetchNews, publishNews, updateNews} from "actions/newsAction";
import NewsCreateForm from "components/News/NewsCreateForm";
import 'braft-editor/dist/output.css'

const {Title} = Typography;

class NewsView extends Component {
    state = {edit: false, loading: false};

    constructor(props) {
        super(props);
        props.data || this.retrieveNews();
    }

    retrieveNews = async () => {
        await this.props.onLoading();
        if (this.props.news.length <= 0) await this.props.fetchNews();
        await this.props.onView(this.props.match.params.news);
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onUpdate = (e) => {
        const {formRef, props: {data, onNewsUpdate}} = this;
        e.preventDefault();
        formRef.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                onNewsUpdate(data.id, _.pickBy({...values, content: values.content.toHTML()})).then(res => {
                    if (res) {
                        formRef.onSuccess();
                        this.onEdit();
                    }
                    this.setState({loading: false});
                });
            }
        });
    };

    onDelete = () => this.props.onDelete().then(res => {
        if (res) this.props.history.push('/sac/news')
    });

    render() {
        const {data, onNewsPublish} = this.props;
        const {edit} = this.state;
        if (!data) return <Skeleton active/>;

        const ButtonComp = () => <div style={{textAlign: 'right'}}>
            {edit ? <>
                    <Button type={"ghost"} style={{margin: 8}} onClick={this.onEdit}>Cancel</Button>
                    <Button
                        icon="save" type={"primary"}
                        loading={this.state.loading}
                        onClick={this.onUpdate}
                    >Update</Button>
                </> :
                <>
                    <Button icon="edit" type={"ghost"} style={{margin: 2}} onClick={this.onEdit}>Edit</Button>

                    <Button
                        style={{margin: 2}}
                        icon={data.published ? "undo" : "global"}
                        type={data.published ? "dashed" : "primary"}
                        onClick={() => Modal.confirm({
                            title: `Are you sure want to ${data.published && 'un-'}publish news?`,
                            content: data.title,
                            okText: 'Yes',
                            okType: 'primary',
                            cancelText: 'No',
                            onOk: onNewsPublish,
                        })}
                    >{data.published && 'Un-'}Publish</Button>

                    <Button icon="delete" type={"danger"} style={{margin: 2}} onClick={() => Modal.confirm({
                        title: 'Are you sure want to delete news?',
                        content: data.title,
                        okText: 'Yes',
                        okType: 'danger',
                        cancelText: 'No',
                        onOk: this.onDelete,
                    })}>Delete</Button>
                </>
            }
        </div>;

        return (
            <div style={{maxWidth: 800, margin: 'auto'}}>
                <ButtonComp/>

                {edit ? (
                    <>
                        <NewsCreateForm
                            wrappedComponentRef={formRef => this.formRef = formRef}
                            data={data} edit={edit}
                        />
                        <ButtonComp/>
                    </>
                ) : (
                    <>
                        <Title level={4}>{data.title}</Title>
                        <Divider/>
                        <div style={{textAlign: 'center',}}>
                            <img src={data.cover_thumb} alt="" style={{maxHeight: 150}}/>
                        </div>
                        <div className="ant-card-bordered" style={{padding: `4px 8px`, margin: `8px 0`}}>
                            <code>{data.description}</code>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: data.content}}/>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({news}) => ({
    loading: news.loading,
    news: news.news,
    data: news.data
});
const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    onNewsUpdate: (id, data) => dispatch(updateNews(id, data)),
    onNewsPublish: () => dispatch(publishNews()),
    onLoading: () => dispatch({type: 'NEWS_LOADING'}),
    onView: id => dispatch({type: 'NEWS_EDIT', payload: id}),
    onDelete: () => dispatch(deleteNews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);
