import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Divider, Table, Typography} from "antd";
import {
    addFeaturedAlumni,
    deleteFeaturedAlumni,
    getFeaturedAlumni,
    searchAlumni,
    updateFeaturedAlumni
} from "actions/featuredAlumniAction";
import NewFeaturedAlumni from "components/FeaturedAlumni/NewFeaturedAlumni";
import FeaturedAlumniDetails from "./FeaturedAlumniDetails";

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
        const {loading, featured, onAlumniAdd, onSearch, alumni, data, onSelect, featuredAlumni} = this.props;
        return (
            <div>
                <Title level={4}>Featured Alumni</Title>
                <Divider style={{margin: `8px 0`}}/>
                {/*<NewFeaturedAlumni onAlumniAdd={() => true} {...rest}/>*/}
                <NewFeaturedAlumni
                    alumni={alumni}
                    onSearch={onSearch}
                    onSelect={onSelect}
                    onAlumniAdd={onAlumniAdd}
                    data={data}
                />
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={featured}
                    size={"small"}
                />
                <FeaturedAlumniDetails
                    data={featuredAlumni || {}}
                    onClose={() => this.props.onView(null)}
                    onUpdate={this.props.onUpdate}
                    onDelete={this.props.onDelete}
                />
            </div>
        );
    }
}

const mapStateToProps = ({featuredAlumni}) => ({
    featuredAlumni: featuredAlumni.featuredAlumni,
    featured: featuredAlumni.featured,
    alumni: featuredAlumni.alumni,
    data: featuredAlumni.data,
});
const mapDispatchToProps = dispatch => ({
    onSearch: value => dispatch(searchAlumni(value)),
    fetchFeatured: () => dispatch(getFeaturedAlumni()),
    onAlumniAdd: data => dispatch(addFeaturedAlumni(data)),
    onDelete: data => dispatch(deleteFeaturedAlumni(data)),
    onUpdate: (id, data) => dispatch(updateFeaturedAlumni(id, data)),
    onView: id => dispatch({type: 'FEATURED_ALUMNI_VIEW', payload: id}),
    onSelect: value => dispatch({type: "FEATURED_ALUMNI_SELECT", payload: value}),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedAlumni);
