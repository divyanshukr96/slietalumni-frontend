import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button} from "antd";
import {fetchEventTypes} from "actions/eventTypeAction";
import {addEvent} from "actions/eventAction";
import EventForm from "components/Events/EventForm";

class EventAdd extends Component {
    constructor(props) {
        super(props);
        props.onLoad();
        this.state = {success: null, loading: false};
    }

    handleCancel = () => {
        this.formRef.handleCancel()
    };

    handleSubmit = (e) => {
        const {formRef, props: {onEventAdd}} = this;
        e.preventDefault();
        formRef.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                onEventAdd({...values, content: values.content.toHTML()}).then(res => {
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
        if (this.state.success) return <Redirect to={'/sac/events/' + this.state.success}/>;
        return (
            <div style={{maxWidth: 800, margin: 'auto'}}>
                <EventForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    onAlumniAdd={() => true}
                    eventTypes={this.props.eventTypes}
                />
                <div style={{textAlign: 'right'}}>
                    <Button style={{marginRight: 8}} onClick={this.handleCancel}>Reset</Button>
                    <Button
                        icon="save" type="primary"
                        loading={this.state.loading}
                        onClick={this.handleSubmit}
                    >Save</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({eventTypes}) => ({
    eventTypes: eventTypes.eventTypes,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchEventTypes()),
    onEventAdd: data => dispatch(addEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventAdd);
