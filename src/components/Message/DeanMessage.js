import React from 'react';
import {Typography} from "antd/lib/index";
import MessageLayout from "./MessageLayout";
import image from "../../assets/dean.jpg"

const {Paragraph} = Typography;

const DeanMessage = () => (
    <MessageLayout
        title={'Message from Dean (SW)'}
        image={image}
    >
        <Paragraph>
            The publication solely meant for providing accountability of alumni funds, recognizing the donors and
            the alumni to be aware of the happening at the institute and get involved for the new ventures. The last
            few years was exciting with several new initiatives taken and ideas conceived being implemented. This
            time of reflection of what achieved in the last few year.
        </Paragraph>
        <Paragraph>
            We are committed to develop a strong relationship between the alumni and the university and to develop
            different platforms for achieving excellence at SLIET.
        </Paragraph>
        <Paragraph>
            Over the years, the university has made phenomenal academic growth. The university alumni distinguished
            themselves through their commitment to their respective professions in a wide variety of discipline. The
            knowledge and the skills of the alumni can make a big difference in helping build a more vibrant SLIET.
            The association aims at better interaction between the alumni and students by providing forums and
            creating opportunities for such interaction.
        </Paragraph>
        <Paragraph>
            The publication solely meant for providing accountability of alumni funds, recognizing the donors and
            the alumni to be aware of the happening at the institute and get involved for the new ventures. The last
            few years was exciting with several new initiatives taken and ideas conceived being implemented. This
            time of reflection of what achieved in the last few year.
        </Paragraph>
        <Paragraph>
            We are grateful for your various support to many of our activities. Your support towards the creation of
            the alumni fund is beginning to help in many ways. We also look forward to your continued support in
            building a robust endowment, which is a hallmark of all great institution. We also seek your support to
            enhance SLIET.
        </Paragraph>
        <Paragraph>
            The association also wishes to apprise, from time to time, the alumni with the academic and other
            activities of the university. The university welcomes suggestion from the alumni, for its academic
            growth.
        </Paragraph>

        <strong>
            Dr. D.C. Saxena,<br/>
            Dean (SW) SLIET
        </strong>
    </MessageLayout>
);

export default DeanMessage;