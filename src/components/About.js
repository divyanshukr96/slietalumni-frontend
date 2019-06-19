import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Col, Divider, Row, Typography} from "antd";
import Button from "@material-ui/core/Button";

const {Title, Paragraph} = Typography;

const styles = () => ({
    main: {
        width: '100%',
        maxWidth: 1100,
        margin: 'auto',
    },
    details: {
        textAlign: 'justify',
    }
});

class About extends Component {
    state = {more: false};

    render() {
        const {classes} = this.props;
        const {more} = this.state;
        return (
            <div className={classes.main}>
                <Row>
                    <Col span={24} style={{textAlign: 'center', paddingBottom: 16}}>
                        <img src="https://www.slietalumni.com/images/saa-about.jpg" alt="" style={{width: '100%'}}/>
                    </Col>
                    <Col sm={24} className={classes.details}>
                        <Title level={3}>About Alumni Association</Title>
                        <Divider/>
                        <Paragraph>
                            Established in 2015, SLIET Alumni Association creates and maintains a lifelong connection
                            between the institute and its alumni. In collaboration with an extremely dedicated volunteer
                            board of directors, the Alumni association works to connect alumni, support students and
                            build an unforgettable experience through a diversity of events, programming and services.
                            The association aims to encourage the alumni to take an abiding interest in the progress and
                            development of the institute. Since its establishment, the association has grown from
                            strength to strength, regularly undertaking several initiatives to promote and foster
                            mutually beneficial interaction between the alumni and Alma Mater.
                        </Paragraph>
                        <Title level={4} style={{margin: 0}}>Vision and Priorities</Title>
                        <Paragraph>
                            The mission of the association is to foster strong bong between alumni, students and the
                            institute, to keep alumni informed, and create a network enabling them to remain engaged
                            with their Alma Mater and help shape its future through the Association’s programmes and
                            services.
                        </Paragraph>
                        <Title level={4} style={{margin: 0}}>Become a life member</Title>
                        <Paragraph>
                            Anyone who has completed one academic year as a student of SLIET is eligible for life
                            membership.
                        </Paragraph>
                        <Title level={4} style={{margin: 0}}>Involvement and Services</Title>
                        <Paragraph>
                            Developing an active and engaged alumni network empowers both the institute and its
                            graduates. The Alumni association continues to seek innovative ways to serve alumni by
                            providing social, educational, and professional opportunities that appeal to our broad
                            constituency. Our alumni association offers:-
                        </Paragraph>
                        <Paragraph>
                            <ul>
                                <li>Alumni career and networking services.</li>
                                <li>Lifelong learning.</li>
                                <li>Student alumni contact.</li>
                                <li>Ongoing benefits.</li>
                                <li>Events and reunions.</li>
                                <li>Geo graphically alumni chapters.</li>
                                <li>Travel</li>
                                <li>Replenish</li>
                                <li>Support your hostel.</li>
                                <li>Support your country.</li>
                            </ul>
                        </Paragraph>
                        <div style={{display: more || 'none'}}>
                            <Title level={4} style={{margin: 0}}>Related Sections</Title>
                            <Paragraph>
                                <ol>
                                    <li>Home</li>
                                    <li>Connect</li>
                                    <li>Events</li>
                                    <li>Giving back</li>
                                    <li>Award</li>
                                    <li>Alumni Bodies – Alumni Association, Heritage foundation</li>
                                    <li>Newsletter</li>
                                    <li>Student Bodies</li>
                                    <li>Contact Us</li>
                                </ol>
                            </Paragraph>
                            <Title level={4} style={{margin: 0}}>Here is the SAA mission statement</Title>
                            <Paragraph>
                                <ol>
                                    <li>Serve as outward facing window from the institute to the Alumni
                                        <ol>
                                            <li>Act as primary interface from the institute to alumni – at – large.</li>
                                            <li>Authorize alumni access to campus facilities.</li>
                                            <li>Administer distinguished alumnus award program</li>
                                        </ol>
                                    </li>
                                    <li>Serve the student community.
                                        <ol>
                                            <li>Administer scholarship and awards.</li>
                                            <li>Facilitate Student mentoring by alumni</li>
                                            <li>Alumni funds towards student travel, facilities, projects.</li>
                                            <li>Enroll students into the database.</li>
                                            <li>Maintain and grow database</li>
                                            <li>Provide database access as needed basis.</li>
                                        </ol>
                                    </li>
                                    <li>Institute related fund raising activities.
                                        <ol>
                                            <li>Strategy about fund raising and co-ordinate its activities.</li>
                                            <li>Report to institute and back to donor regarding status of funded
                                                projects.
                                            </li>
                                        </ol>
                                    </li>
                                    <li>Serve the alumni community.
                                        <ol>
                                            <li>Support networking activities and events, such as reunions.</li>
                                            <li>Support alumni communication and alumni registration in database.</li>
                                            <li>Work closely with SLIET Alumni Association.</li>
                                            <li>Support club activities and annual meets.</li>
                                        </ol>
                                    </li>
                                    <li>Towards the faculty community.
                                        <ol>
                                            <li>Promote interaction between visiting faculty and local alumni.</li>
                                            <li>Promote research and consultancy relationship between faculty and
                                                alumni.
                                            </li>
                                            <li>Promote campus and department visits by alumni.</li>
                                        </ol>
                                    </li>
                                </ol>
                            </Paragraph>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <Button size={"small"} color={"primary"}
                                    onClick={() => this.setState(s => ({more: !s.more}))}
                            >
                                {more ? 'Hide ' : 'Read '}More . . .
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withStyles(styles)(About);