import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as _ from "lodash";
import {Button, Modal} from "antd";
import 'braft-editor/dist/output.css'

const Index = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        function fetchNotice() {
            axios.get('/api/public/notice').then(({data}) => {
                data.data && setData(data.data)
            })
        }

        setTimeout(() => {
            setVisible(true);
        }, 2500);
        fetchNotice();
    }, []);

    return (
        <div>
            <Modal
                width={800}
                visible={visible && !_.isEmpty(data[index])}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div style={{
                    height: '100%',
                    position: 'relative'
                }}>
                    {index > 0 && <Button
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: -4,
                            transform: 'translateY(-50%) translateX(-50%)'
                        }}
                        shape="circle"
                        icon="left"
                        onClick={() => setIndex(index - 1)}
                    />}
                    <div
                        className="braft-output-content"
                        dangerouslySetInnerHTML={{__html: !_.isEmpty(data[index]) && data[index].notice}}
                    />
                    {!_.isEmpty(data[index + 1]) && <Button
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: -4,
                            transform: 'translateY(-50%) translateX(50%)'
                        }}
                        shape="circle"
                        icon="right"
                        onClick={() => setIndex(index + 1)}
                    />}
                </div>

            </Modal>
        </div>
    );
};

export default Index;
