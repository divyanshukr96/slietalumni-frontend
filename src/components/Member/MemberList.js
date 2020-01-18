import React, {useState} from 'react';
import {connect} from "react-redux";
import * as _ from "lodash";
import axios from "axios";
import {Badge, Button, Divider, Modal, Table, Typography} from "antd";
import NewMember from "./NewMember";
import MemberDetails from "./MemberDetails";

const {Text, Title} = Typography;


const MemberList = (props) => {

    const [data, setData] = useState({});
    const [image, setImage] = useState(null);

    const addMember = async (formData) => {
        try {
            let form = new FormData();
            for (let field in formData) {
                if (formData[field]) form.append(field, formData[field]);
            }

            form.set('sac', formData.sac ? '1' : '0');

            const {data} = await axios.post('/api/members', form);
            data.data && props.update();
            return data;
        } catch ({response}) {
            response && props.sendErrors(response.data, "new_sac_member");
        }
    };

    const onUserUpdate = async (id, formData) => {
        try {
            let form = new FormData();
            for (let field in formData) {
                if (formData[field]) form.append(field, formData[field]);
            }

            form.set('sac', formData.sac ? '1' : '0');
            form.append('_method', 'PUT');

            const {data} = await axios.post(`/api/members/${id}`, form);
            data.data && props.update();
            return data;
        } catch ({response}) {
            response && props.sendErrors(response.data, "sac_member_update");
        }
    };


    const onDelete = async (id) => {
        try {
            const {data} = await axios.delete(`/api/members/${id}`);
            props.update();
            onView(null);
            return data;
        } catch ({response}) {
            response && props.sendErrors(response.data);
        }
    };

    const onView = (id) => {
        const member = props.members.filter(m => m.id === id)[0];
        setData(member || {});
    };


    const Columns = [
        {title: 'Name', dataIndex: 'name'},
        {title: 'Designation', dataIndex: 'designation'},
        {title: 'From', dataIndex: 'from'},
        {
            title: 'To',
            dataIndex: 'to',
            render: (e) => e ? <span>{e}</span> : <Text style={{color: '#1DA57A'}}>Present</Text>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (e) => e ? <span><Button size={"small"} onClick={() => setImage(e)}>View</Button></span> :
                <Text type={"danger"}><Badge status="error"/>Draft</Text>,
        },
        {
            title: 'Profile',
            dataIndex: 'profile',
            render: (e) => e ? <span><a href={`/profile/${e}`}>View</a></span> : <Text>- - - - - -</Text>,
        },
        {
            title: 'Action ',
            dataIndex: 'id',
            render: (id) => (<span><Button type="ghost" size={"small"} icon="edit" onClick={() => onView(id)}/></span>),
        },
    ];

    return (
        <div>
            <MemberDetails
                data={data}
                onClose={onView}
                onUserUpdate={onUserUpdate}
                onDelete={onDelete}
            />
            <NewMember onMemberAdd={addMember}/>
            <Title level={4}>{props.title}</Title>

            <Divider style={{margin: '12px 0'}}/>
            <Table
                style={{overflow: 'overlay'}}
                loading={props.loading}
                rowKey="id"
                columns={Columns}
                dataSource={props.members}
                size={"small"}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            onView(record.id)
                        },
                        onContextMenu: event => {
                            event.preventDefault();
                        },
                    };
                }}
            />
            <Modal visible={!_.isEmpty(image)} footer={null} onCancel={() => setImage(null)}>
                <img alt="member_photo" style={{ width: '100%' }} src={image} />
            </Modal>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    sendErrors: (errors, name) => dispatch({type: 'ERROR_VALIDATION', payload: errors, name: name}),
});

export default connect(null, mapDispatchToProps)(MemberList);
