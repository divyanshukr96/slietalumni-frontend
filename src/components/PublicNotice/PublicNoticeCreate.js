import React, {useState} from 'react';
import {Button, Form, Modal, Typography} from "antd";
import PublicNoticeForm from "./PublicNoticeForm";

const {Title} = Typography;

const PublicNoticeCreate = ({onSave, form}) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                onSave(null, {...values, notice: values.notice.toHTML()}).then(res => {
                    if (res) {
                        setVisible(false);
                    }
                    setLoading(false)
                })
            }
        });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Title level={4}>Public Notice</Title>
            <Button
                type={"primary"}
                icon="plus"
                onClick={() => setVisible(!visible)}
            >
                New Notice
            </Button>
            <Modal
                width={800}
                visible={visible}
                okText={'Save'}
                cancelText="Close"
                onCancel={() => setVisible(false)}
                onOk={onSubmit}
                confirmLoading={loading}
                destroyOnClose
            >
                <PublicNoticeForm form={form}/>
            </Modal>
        </div>
    );
};

export default Form.create({name: 'public_notice_save'})(PublicNoticeCreate);
