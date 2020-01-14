import React from 'react';
import * as PropTypes from "prop-types";
import {Table, Typography} from "antd";

const {Text} = Typography;

const PublicDonation = ({donations}) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Name',
            dataIndex: 'created_at',
        }
    ];

    return (
        <>

            <Table
                style={{overflow: 'overlay', maxWidth: 600, margin: '12px auto', background: '#fff'}}
                rowKey="id"
                size={"small"}
                showHeader={false}
                title={
                    () => <Text
                        level={4}
                        style={{fontSize: 18, fontWeight: 600, color: 'rgba(0, 0, 0, 0.85)',}}
                    >Recent Donation's</Text>
                }
                pagination={false}
                dataSource={donations}
                columns={columns}
            />

        </>
    );
};

PublicDonation.propTypes = {
    donations: PropTypes.array.isRequired
};

export default PublicDonation;


// <Table
//     style={{overflow: 'overlay'}}
//     loading={loading}
//     rowKey="id"
//     columns={this.columns}
//     dataSource={featured}
//     size={"small"}
// />
