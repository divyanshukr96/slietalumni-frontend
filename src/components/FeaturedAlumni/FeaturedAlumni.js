import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Divider, Table, Typography} from "antd";
import {addFeaturedAlumni, getFeaturedAlumni, searchAlumni} from "actions/featuredAlumniAction";
import NewFeaturedAlumni from "components/FeaturedAlumni/NewFeaturedAlumni";
// import moment from "moment";

const {Text, Title} = Typography;

class FeaturedAlumni extends Component {
    constructor(props) {
        super(props);
        props.fetchFeatured();
    }


    columns = [
        {title: 'Name', dataIndex: 'name'},
        {title: 'Email', dataIndex: 'email'},
        {title: 'Organisation', dataIndex: 'organisation'},
        {title: 'Designation', dataIndex: 'designation'},
        {title: 'Featured Till', dataIndex: 'featured', render: (e) => <Text>{e}</Text>},
        {title: 'Created On', dataIndex: 'created_at'},
        {
            title: 'Action ',
            dataIndex: 'id',
            render: (id) => <Button type={"link"} onClick={() => this.props.onView(id)} size={"small"}>View</Button>,
        },
    ];

    render() {
        const {loading, featured, ...rest} = this.props;
        return (
            <div>
                <Title level={4}>Featured Alumni</Title>
                <Divider style={{margin: `8px 0`}}/>
                <NewFeaturedAlumni onAlumniAdd={() => true} {...rest}/>
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={featured}
                    size={"small"}
                />
            </div>
        );
    }
}

const mapStateToProps = ({featuredAlumni}) => ({
    featured: featuredAlumni.featured,
    alumni: featuredAlumni.alumni,
    data: featuredAlumni.data,
});
const mapDispatchToProps = dispatch => ({
    // onEventUpdate: (id, data) => dispatch(updateEvent(id, data)),
    // onLoading: () => dispatch({type: 'EVENT_LOADING'}),
    // onView: id => dispatch({type: 'EVENT_EDIT', payload: id}),
    // onDelete: () => dispatch(deleteEvent()),

    fetchFeatured: () => dispatch(getFeaturedAlumni()),
    onAlumniAdd: data => dispatch(addFeaturedAlumni(data)),
    onSearch: value => dispatch(searchAlumni(value)),
    onSelect: value => dispatch({type: "FEATURED_ALUMNI_SELECT", payload: value}),

});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedAlumni);
