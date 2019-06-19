import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import WelcomeMessage from "../components/WelcomeMessage";
import {Card, Col, Divider, PageHeader, Row} from "antd";
import {Link} from "react-router-dom";
import UpcomingEvents from "../components/UpcomingEvents";
import Chapters from "../components/Chapters";
import Stories from "../components/Stories";
import FeaturedAlumni from "../components/FeaturedAlumni";

const styles = theme => ({});

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <div style={{width: 1300, maxWidth: '100%', margin: 'auto'}}>
                    <WelcomeMessage/>
                    <Row gutter={8} type={'flex'} style={{flexDirection: 'row-reverse'}}>
                        <Col lg={6} md={10} style={{marginBottom: 8}}>
                            <UpcomingEvents/>
                        </Col>
                        <Col lg={9} md={14} style={{marginBottom: 8}}>
                            <Stories/>
                        </Col>
                        <Col lg={9} sm={24} style={{marginBottom: 8, maxWidth: '100%'}}>
                            <Chapters/>
                            <FeaturedAlumni/>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);