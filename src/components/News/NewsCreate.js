import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button} from "antd";
import {addNews} from "actions/newsAction";
import NewsCreateForm from "components/News/NewsCreateForm";

class NewsCreate extends Component {
    state = {success: null, loading: false};

    handleCancel = () => {
        this.formRef.handleCancel()
    };

    handleSubmit = (e) => {
        const {formRef, props: {onNewsAdd}} = this;
        e.preventDefault();
        formRef.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                onNewsAdd({...values, content: values.content.toHTML()}).then(res => {
                    if (res) {
                        formRef.onSuccess();
                        this.setState({success: res});
                    }
                    this.setState({loading: false});
                });
            }
        });
    };

    render() {
        if (this.state.success) return <Redirect to={'/sac/news/' + this.state.success}/>;
        return (
            <div style={{maxWidth: 800, margin: 'auto'}}>
                <NewsCreateForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    onAlumniAdd={() => true}
                />
                <div style={{textAlign: 'right'}}>
                    <Button style={{marginRight: 8}} onClick={this.handleCancel}>Reset</Button>
                    <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit}>Add News</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({news}) => ({
    news: news.news,
    loading: news.loading,
    data: news.data
});
const mapDispatchToProps = dispatch => ({
    onNewsAdd: data => dispatch(addNews(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsCreate);
