import React from 'react';
import {withStyles} from "@material-ui/core";
import {Avatar, Card, Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import president from "../assets/president.jpg"
import director from "../assets/director.jpg"
import chairman from "../assets/chairman.jpg"

const {Paragraph, Title} = Typography;
const {Meta} = Card;

const styles = () => ({
    card: {
        '& > div': {
            padding: 8,
        },
        marginBottom: 8,
    },
    meta: {
        '& > :last-child > div': {
            marginBottom: 0,
        },
        marginBottom: 4,
    },
});

const WelcomeMessage = ({classes}) => {
    const {card, meta} = classes;
    const row = window.outerWidth < 600 ? 2 : 4;
    return (
        <Row gutter={{md: 34}}>
            <Col sm={24} lg={10}>
                <Title level={4}> Welcome to SLIET Alumni Association (SAA)</Title>
                <Paragraph style={{textAlign: 'justify'}}>
                    Founded in 2017, SAA is registered under Societies Registration Act (XXI of 1860) and as
                    amended by Punjab Amendment Act, 1957. The primary mission of SAA is to make fruitful
                    gap between Alumni and its Alma Mater along with Students of SLIET. We hope you have a
                    great experience visiting our website and to learn to about various facilities, benefits
                    and services you get to enjoy as a registered member.
                </Paragraph>
            </Col>
            <Col lg={14} sm={24}>
                <Row type={'flex'} justify={'center'} gutter={{sm: 8}}>
                    <Col md={8} sm={24}>
                        <Link to={'/message/director'}>
                            <Card className={card}>
                                <Meta
                                    className={meta}
                                    avatar={<Avatar
                                        size={"large"}
                                        src={director}/>}
                                    title="Director, SLIET"
                                    description="Dr. SK Jain"
                                />
                                <Paragraph ellipsis={{rows: row}} style={{marginBottom: 0}}>
                                    Dear Alumni,
                                    SLIET is an institution of academic excellence in India and has made
                                    significant
                                    contribution to society, in terms of producing numerous scholars, and
                                    intellectuals who are serving in India and Abroad. At the outset, I would
                                    like
                                    to extend hearty greetings to you all on my own behalf and on behalf of
                                    faculty,
                                    staff and students of SLIET.
                                </Paragraph>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={8} sm={24}>
                        <Link to={'/message/president'}>
                            <Card className={card}>
                                <Meta
                                    className={meta}
                                    avatar={<Avatar
                                        size={"large"}
                                        src={president}/>}
                                    title={"President, SAA"}
                                    description={"Mr. Winnerjit Singh"}
                                />
                                <Paragraph ellipsis={{rows: row}} style={{marginBottom: 0}}>
                                    Dear Alumni, At SLIET, fall is all about new beginnings. A new academic year
                                    brings new students, new classes and a fresh slate of plans for the year
                                    ahead.
                                    I consider it an honor to be the president of the alumni association, as the
                                    alumni association is very special to me, having had a very long association
                                    with it and holding diverse positions in it over the last 2 years.
                                </Paragraph>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={8} sm={24}>
                        <Link to={'/message/chairman'}>
                            <Card className={card}>
                                <Meta
                                    className={meta}
                                    avatar={<Avatar
                                        size={"large"}
                                        src={chairman}/>}
                                    title="Chairman, SAA"
                                    description="Dr. Sukhcharn Singh"
                                />
                                <Paragraph ellipsis={{rows: row}} style={{marginBottom: 0}}>
                                    I am writing to as the Chairman of SLIET Alumni Association discussing
                                    various
                                    improvements and challenges of your great Alma Mater.
                                    I congratulate the alumni and students who have come forward to help the
                                    Institute and the faculty who are relentlessly serving this great
                                    institution
                                    and helping sustain its high standards in education excellence.
                                </Paragraph>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default withStyles(styles)(WelcomeMessage);