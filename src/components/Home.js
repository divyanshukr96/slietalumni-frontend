import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WelcomeMessage from "../components/WelcomeMessage";
import {Col, Row} from "antd";
import UpcomingEvents from "../components/UpcomingEvents";
import Chapters from "../components/Chapters";
import NewsAndStories from "../components/NewsAndStories";
import FeaturedAlumni from "../components/FeaturedAlumni";
import HomeCarousel from "components/HomeCarousel";
import SLIET from 'assets/sliet-college.jpg';

const Home = () => {
    const isCancelled = React.useRef(false);
    const [carousel, setCarousel] = useState([SLIET]);

    function fetchUrl() {
        axios.get("api/public/carousel").then(({data}) => {
            const carouselData = data.data ? data.data : data;
            if (!isCancelled.current) {
                setCarousel(c => [...carouselData.filter(d => d), ...c])
            }
        }).catch(err => err);
    }

    useEffect(() => {
        fetchUrl();
        return () => {
            isCancelled.current = true;
        };
    }, []);


    return (
        <>
            <div style={{width: 1300, maxWidth: '100%', margin: 'auto'}}>
                <HomeCarousel images={carousel}/>
                <WelcomeMessage/>
                <Row gutter={8} type={'flex'} style={{flexDirection: 'row-reverse'}}>
                    <Col lg={6} md={10} xs={24} style={{marginBottom: 8}}>
                        <UpcomingEvents/>
                    </Col>
                    <Col lg={9} md={14} xs={24} style={{marginBottom: 8}}>
                        <NewsAndStories/>
                    </Col>
                    <Col lg={9} sm={24} xs={24} style={{marginBottom: 8, maxWidth: '100%'}}>
                        <Chapters/>
                        <FeaturedAlumni/>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Home;
