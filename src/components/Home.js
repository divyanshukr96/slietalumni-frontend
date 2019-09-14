import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import WelcomeMessage from "../components/WelcomeMessage";
import {Card, Col, Divider, PageHeader, Row} from "antd";
import {Link} from "react-router-dom";
import UpcomingEvents from "../components/UpcomingEvents";
import Chapters from "../components/Chapters";
import NewsAndStories from "../components/NewsAndStories";
import FeaturedAlumni from "../components/FeaturedAlumni";
import HomeCarousel from "components/HomeCarousel";
import SLIET from 'assets/sliet-college.jpg';

const styles = theme => ({});

const Home = () => {
    const [carousel, setCarousel] = useState([SLIET]);

    async function fetchUrl() {
        const {data} = await axios.get("api/public/carousel");
        if (data.data) setCarousel([...data.data, carousel]);
        else setCarousel([...data, carousel])
    }

    useEffect(() => {
        fetchUrl().then(r => null);
    }, []);

    return (
        <>
            <div style={{width: 1300, maxWidth: '100%', margin: 'auto'}}>
                <HomeCarousel images={carousel}/>
                <WelcomeMessage/>
                <Row gutter={8} type={'flex'} style={{flexDirection: 'row-reverse'}}>
                    <Col lg={6} md={10} style={{marginBottom: 8}}>
                        <UpcomingEvents/>
                    </Col>
                    <Col lg={9} md={14} style={{marginBottom: 8}}>
                        <NewsAndStories/>
                    </Col>
                    <Col lg={9} sm={24} style={{marginBottom: 8, maxWidth: '100%'}}>
                        <Chapters/>
                        <FeaturedAlumni/>
                    </Col>
                </Row>
            </div>
        </>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
