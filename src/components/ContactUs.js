import React from 'react';
import {withStyles} from "@material-ui/core";
import {Col, Divider, Row, Typography} from "antd";
import ContactForm from "../components/ContactForm";

const {Title, Paragraph} = Typography;
const styles = theme => ({
    main: {
        width: '100%',
        maxWidth: 1200,
        margin: 'auto',
    },
    details: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 16px',
        }
    }
});

const ContactUs = ({classes}) => (
    <div className={classes.main}>
        <Row type="flex" align="middle">
            <Col span={24}>
                <Title level={2}>
                    Contact Us
                </Title>
                <Divider style={{margin: '-6px 0 8px'}}/>
            </Col>
            <Col md={12} xs={24} className={classes.details}>
                <Title level={3}>
                    Alumni Relations
                </Title>
                <Paragraph style={{textAlign: 'justify'}}>
                    If you have any questions about alumni benefits, alumni events, event registration, or
                    anything related to the SLIET Alumni Association, please review our FAQs. If you
                    don’t find the answer you’re looking for, contact:
                </Paragraph>

                <Paragraph>
                            <span style={{fontWeight: 'bolder'}}>
                                Sant Longowal Institute of Engineering and Technology
                            </span><br/>
                    Longowal, Sangrur <br/>
                    Punjab - 148106
                </Paragraph>

                <Paragraph>
                            <span style={{fontWeight: 'bolder'}}>
                                Email :
                            </span>
                    <a href="mailto:alumnicell@sliet.ac.in"> alumnicell@sliet.ac.in</a>
                </Paragraph>

                <Title level={4}>Social Media</Title>
                <Paragraph>
                    We’re available online to answer any questions you might have about our events, benefits and
                    resources, or anything else SLIET related. Connect with us via:
                </Paragraph>
                <ul>
                    <li><a href="//www.facebook.com/slietalumniassociation" target="_blank"
                           rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="//twitter.com/SlietAlumniAssn" target="_blank"
                           rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="//www.instagram.com/sliet_alumni_association" target="_blank"
                           rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="//www.linkedin.com/groups/36684" target="_blank" rel="noopener noreferrer">Linkedin
                        Group</a></li>
                    <li><a href="//www.linkedin.com/groups/36684" target="_blank" rel="noopener noreferrer">Linkedin
                        Page</a></li>
                    <li><a href="//www.youtube.com/channel/UCGb-HrDKQUTDTyzWIMUfJCg" target="_blank"
                           rel="noopener noreferrer">YouTube</a></li>
                </ul>

                <Title level={4}>Alumni Online Help</Title>
                <Paragraph style={{marginBottom: '40px'}}>
                    If you have questions about your alumni account, email, or login-only features, please
                    contact us by emailing <a href="mailto:enquiry@slietalumni.org">enquiry@slietalumni.org</a>.
                </Paragraph>
            </Col>
            <Col md={12} xs={24}>
                <Title level={4} style={{textAlign: 'center'}}>
                    Message / Enquiry here!
                </Title>
                <ContactForm/>
            </Col>
        </Row>
    </div>
);

export default withStyles(styles)(ContactUs);
