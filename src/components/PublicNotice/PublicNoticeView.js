import React, {useState} from 'react';
import * as _ from "lodash";
import {Form, Modal, Skeleton} from "antd";
import PublicNoticeForm from "./PublicNoticeForm";

const PublicNoticeView = ({data = {}, onClose, onSave, form}) => {
    const [editNotice, setEditNotice] = useState(false);
    const [loading, setLoading] = useState(false);

    const onEdit = () => setEditNotice(!editNotice);

    const onUpdate = () => {
        form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                onSave(data.id, {...values, notice: values.notice.toHTML()}).then(res => {
                    if (res) {
                        setEditNotice(false);
                    }
                    setLoading(false)
                })
            }
        });
    };

    return (
        <Modal
            width={800}
            visible={!_.isEmpty(data)}
            closable={false}

            okText={editNotice ? "Update" : "Edit"}
            cancelText={editNotice ? "Cancel" : "Close"}
            onOk={editNotice ? onUpdate : onEdit}
            onCancel={editNotice ? onEdit : onClose}

            confirmLoading={loading}
        >
            {_.isEmpty(data) && <Skeleton/>}

            {editNotice ? <PublicNoticeForm form={form} data={data}/> : <div
                className="braft-output-content"
                dangerouslySetInnerHTML={{__html: data && data.notice}}
            />}
        </Modal>
    );
};

export default Form.create({name: 'public_notice_save'})(PublicNoticeView);
