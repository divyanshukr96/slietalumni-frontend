import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Card, Col, Divider, Row, Typography} from "antd";
import director from "../assets/director.jpg"
import dean from "../assets/dean.jpg"
import chairman from "../assets/chairman.jpg"

const {Title} = Typography;
const {Meta} = Card;

const styles = ({
    root: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',
        textAlign: 'justify',
    },
});

class Advisory extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Row gutter={16}>
                    <Col sm={24}>
                        <Title level={3}>
                            Advisory Committee
                        </Title>
                        <Divider/>
                    </Col>
                    <Col md={8} sm={24}>
                        <Card
                            style={{width: '100%', marginBottom: 16}}
                            cover={<img alt="director" src={director}/>}
                        >
                            <Meta
                                title="Director, SLIET"
                                description={<>
                                    Dear Alumni, <br/>
                                    SLIET is an institution of academic excellence in India and has made significant
                                    contribution to society, in terms of producing numerous scholars, and
                                    intellectuals who are serving in India and Abroad. At the outset, I would like
                                    to extend hearty greetings to you all on my own behalf and on behalf of faculty,
                                    staff and students of SLIET.
                                    <br/>
                                    <Link to={"/message/director"} style={{float: 'right'}}>Read More . . .</Link>
                                </>}
                            />
                        </Card>
                    </Col>
                    <Col md={8} sm={24}>
                        <Card
                            style={{width: '100%', marginBottom: 16}}
                            cover={<img alt="dean-sw" src={dean}/>}
                        >
                            <Meta
                                title="Dean (SW), SLIET"
                                description={<>
                                    The publication solely meant for providing accountability of alumni funds,
                                    recognizing the donors and the alumni to be aware of the happening at the
                                    institute and get involved for the new ventures. <br/>
                                    The last few years was exciting with several new initiatives taken and ideas
                                    conceived being implemented. This time of reflection of what achieved in the
                                    last few year.
                                    <br/>
                                    <Link to={"/message/dean-sw"} style={{float: 'right'}}>Read More . . .</Link>
                                </>}
                            />
                        </Card>
                    </Col>
                    <Col md={8} sm={24}>
                        <Card
                            style={{width: '100%', marginBottom: 16}}
                            cover={<img alt="chairman" src={chairman}/>}
                        >
                            <Meta
                                title="Chairman, SAA"
                                description={<>
                                    I am writing to as the Chairman of SLIET Alumni Association discussing various
                                    improvements and challenges of your great Alma Mater.<br/>
                                    I congratulate the alumni and students who have come forward to help the
                                    Institute and the faculty who are relentlessly serving this great institution
                                    and helping sustain its high standards in education excellence.
                                    <br/>
                                    <Link to={"/message/chairman"} style={{float: 'right'}}>Read More . . .</Link>
                                </>}
                            />
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}


export default withStyles(styles)(Advisory);