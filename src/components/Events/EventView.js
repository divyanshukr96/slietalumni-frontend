import React, {Component} from 'react';
import {connect} from "react-redux";
import * as _ from 'lodash'
import {Button, Divider, Modal, Skeleton, Typography} from "antd";
import {fetchEventTypes} from "actions/eventTypeAction";
import {deleteEvent, fetchEvents, publishEvent, updateEvent} from "actions/eventAction";
import 'braft-editor/dist/output.css'
import EventForm from "components/Events/EventForm";

const {Paragraph, Text, Title} = Typography;

class EventView extends Component {
    state = {edit: false};

    constructor(props) {
        super(props);
        props.onLoad();
        props.data || this.retrieveEvent();
    }

    retrieveEvent = async () => {
        await this.props.onLoading();
        if (this.props.events.length <= 0) await this.props.onFetchEvents();
        await this.props.onView(this.props.match.params.event);
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onUpdate = (e) => {
        const {formRef, props: {data, onEventUpdate}} = this;
        e.preventDefault();
        formRef.props.form.validateFields((err, values) => {
            if (!err) onEventUpdate(data.id, _.pickBy({...values, content: values.content.toHTML()})).then(res => {
                if (res) {
                    formRef.onSuccess();
                    this.onEdit();
                }
            });
        });
    };

    onDelete = e => {
        e.preventDefault();
        this.props.onDelete().then(res => {
            if (res) this.props.history.push('/sac/events')
        })
    };


    render() {
        const {data, onEventPublish, eventTypes} = this.props;
        const {edit} = this.state;
        if (!data) return <Skeleton active/>;

        const ButtonComp = () => <div style={{textAlign: 'right'}}>
            {edit ? <>
                    <Button type={"ghost"} style={{margin: 8}} onClick={this.onEdit}>Cancel</Button>
                    <Button icon="save" type={"primary"} onClick={this.onUpdate}>Update</Button>
                </> :
                <>
                    <Button size={"small"} icon="edit" type={"ghost"} onClick={this.onEdit}>Edit</Button>
                    <Button size={"small"} icon="global" type={"primary"} style={{margin: 4}}
                            onClick={() => Modal.confirm({
                                title: 'Are you sure want to publish Event?',
                                content: data.title,
                                okText: 'Yes',
                                okType: 'primary',
                                cancelText: 'No',
                                onOk: onEventPublish,
                            })}>Publish</Button>
                    <Button size={"small"} icon="delete" type={"danger"} onClick={() => Modal.confirm({
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
                        <EventForm
                            wrappedComponentRef={formRef => this.formRef = formRef}
                            data={data} edit={edit} eventTypes={eventTypes}
                        />
                        <ButtonComp/>
                    </>
                ) : (
                    <>
                        <Title level={4} style={{marginBottom: 4}}>{data.title}</Title>
                        <Text>Category :- {data.event_type}</Text>
                        <Divider style={{marginBottom: 4}}/>
                        <div style={{textAlign: 'center',}}>
                            <img src={data.image_thumb} alt="" style={{maxHeight: 250}}/>
                            {data.published_by &&
                            <Paragraph strong type={"warning"} style={{margin: 4}}>
                                Published By :- {data.published_by} ({data.published_at})
                            </Paragraph>}
                        </div>
                        <Paragraph style={{marginBottom: 4}}>Venue : - {data.venue}</Paragraph>
                        <Paragraph>Date & Time : - {data.date}, {data.time}</Paragraph>
                        <div className="ant-card-bordered" style={{padding: `4px 8px`, margin: `8px 0`}}>
                            <code>{data.description}</code>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: data.content}}/>
                        <Divider/>
                        <Paragraph type={"secondary"}>Created at : - {data.created_at}</Paragraph>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({events, eventTypes}) => ({
    eventTypes: eventTypes.eventTypes,
    events: events.events,
    loading: events.loading,
    data: events.data
});
const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchEventTypes()),
    onFetchEvents: () => dispatch(fetchEvents()),
    onEventUpdate: (id, data) => dispatch(updateEvent(id, data)),
    onEventPublish: (id, data) => dispatch(publishEvent(id, data)),
    onLoading: () => dispatch({type: 'EVENT_LOADING'}),
    onView: id => dispatch({type: 'EVENT_EDIT', payload: id}),
    onDelete: () => dispatch(deleteEvent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventView);