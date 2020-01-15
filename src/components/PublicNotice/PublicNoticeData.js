import React, {useEffect, useState} from 'react';
import axios from "axios";
import PublicNoticeCreate from "./PublicNoticeCreate";
import {useDispatch} from "react-redux";
import {Button, Table} from "antd"
import PublicNoticeView from "./PublicNoticeView";


const PublicNoticeData = () => {
    const [noticeList, setNoticeList] = useState([]);
    const [noticeData, setNoticeData] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        function fetchNotice() {
            axios.get('/api/publicnotice').then(({data}) => {
                data.data && setNoticeList(data.data);
            });

        }

        fetchNotice();
    }, []);

    const setData = (data) => {
        setNoticeList([data, ...noticeList]);
        return data;
    };

    const updateData = (id, data) => {
        const newData = [...noticeList];
        const key = id;
        const index = newData.findIndex(item => key === item.id);
        newData.splice(index, 1, {...data});
        setNoticeList(newData);
        return data;
    };

    const onSave = async (id, formData) => {
        try {
            if (id) {
                const {data} = await axios.patch('/api/publicnotice/' + id, formData);
                if (data.data) return updateData(id, data.data);
                return null;
            }
            const {data} = await axios.post('/api/publicnotice', formData);
            if (data.data) return setData(data.data);
        } catch ({response}) {
            response && dispatch({
                type: 'ERROR_VALIDATION',
                payload: response.data,
                name: 'public_notice_save'
            });
        }
    };

    const viewNotice = id => {
        setNoticeData(noticeList.filter(notice => notice.id === id)[0]);
    };

    const Columns = [
        {
            title: 'Notice Till',
            dataIndex: 'notice_till'
        },
        {
            title: 'Uploader',
            dataIndex: 'user_id'
        },
        {
            title: 'Created',
            dataIndex: 'created_at'
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (id) => <span><Button type="link" onClick={() => viewNotice(id)}>View</Button></span>
        }
    ];

    return (
        <>
            <PublicNoticeCreate
                onSave={onSave}
                data={noticeData}
            />

            <div style={{
                maxWidth: 900,
                margin: '12px auto',
                border: '1px solid #e8e8e8',
            }}>
                <Table
                    style={{overflow: 'overlay'}}
                    size={"middle"}
                    rowKey="id"
                    dataSource={noticeList}
                    columns={Columns}
                />
            </div>

            <PublicNoticeView
                data={noticeData}
                onClose={() => viewNotice(null)}
                onSave={onSave}
            />
        </>
    );
};

export default PublicNoticeData;
