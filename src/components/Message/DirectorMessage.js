import React from 'react';
import {Typography} from "antd/lib/index";
import MessageLayout from "./MessageLayout";
import image from "../../assets/director.jpg"

const {Paragraph} = Typography;
const DirectorMessage = () => (
    <MessageLayout
        title={"Director's Message"}
        image={image}
    >
        <Paragraph>
            Dear Alumni,
        </Paragraph>
        <Paragraph>
            SLIET is an institution of academic excellence in India and has made significant contribution to
            society, in terms of producing numerous scholars, and intellectuals who are serving in India and
            Abroad. At the outset, I would like to extend hearty greetings to you all on my own behalf and on
            behalf of faculty, staff and students of SLIET. The direct aim of an educational Institution is to
            transform the human material into an enlightened and liberated entity and make student a torchbearer
            of the values of rationality, truth, equality and equanimity. There are many ways that alumni can
            support and lead. For instance helping in getting internships, final placement, promoting executive
            educational programmes, giving opportunity for consultancy and impact networking to create brand
            value for the institute.
        </Paragraph>
        <Paragraph>
            With the built environment facing serious challenges, there has never been a more important time to
            stay connected with other industry professional and keep abreast of industry development. Our
            interactive alumni association has been built with this in mind, and offers a wealth of benefits
            including an online networking community, career support service and networking social media events.
        </Paragraph>
        <Paragraph>
            I hope you will find SLIET alumni association a valuable resource tool throughout a professional
            life and beyond, and enjoy the benefits that come with being part of SLIET community. I wish the
            association and its forth coming event all success and urge all concerned to scale greeter heights
            in future and take their rightful place in society, as we believe "Together We Can Make A
            Difference".
        </Paragraph>
        <strong>
            Dr. S. K. Jain,<br/>
            Director SLIET
        </strong>
    </MessageLayout>
);

export default DirectorMessage;
