import React from 'react';
import {Tooltip, Typography} from "antd/lib/index";
import MessageLayout from "./MessageLayout";
import image from "../../assets/president.jpg"

const {Paragraph} = Typography;
const PresidentMessage = () => (
    <MessageLayout
        title={["Message from President ", <Tooltip placement="top" title={"SLIET Alumni Association"}>SAA</Tooltip>]}
        image={image}
    >
        <Paragraph>
            Dear Alumni,
        </Paragraph>
        <Paragraph>
            At SLIET, fall is all about new beginnings. A new academic year brings new students, new classes and a fresh
            slate of plans for the year ahead. I consider it an honor to be the president of the alumni association, as
            the alumni association is very special to me, having had a very long association with it and holding diverse
            positions in it over the last 2 years.
        </Paragraph>
        <Paragraph>
            The main objective of the Association are to promote close relation of the university and its Alumni,
            promote the interest of the Alumni in the affairs of the university, ensure that programmes are initiated
            and developed for the benefit of the Alumni and the university, and to assist the university in its
            development and pursuit of academic excellence. I congratulate the alumni and students who have come forward
            to help the Institute and the faculty who are relentlessly serving this great institution and helping
            sustain its high standards in education excellence.
        </Paragraph>
        <Paragraph>
            In year 2002, I joined SLIET as a student. Its environment, teacher – student relationship, camaraderie with
            peers and their willingness to live and share both sorrows together have impressed me the most during my
            stay in the institute. We receive one the best undergraduate education and the SLIET education system been
            instrumental in making us successful technocrats, academicians, entrepreneurs and leaders in our respective
            fields over the decades.
        </Paragraph>
        <Paragraph>
            When I recall my memory the first alumni meet was held in the year 2008, after 8 years with the great
            efforts of Dr. Sukhcharan Singh and his team managed to organize another wonderful alumni meet, and
            successfully registered SLIET Alumni Association on February 20, 2017. I thank faculty of SLIET and Alumnus
            who considered me as a president of this association.
        </Paragraph>
        <Paragraph>
            It is known fact that it is vital for any association to raise funds to carry out and support its various
            projects. Many of you from experience would know this is no easy task. The Alumni Association is also
            continuously faced with the challenging task we will have to make effort to accomplish this.
        </Paragraph>
        <Paragraph>
            My goal this year is to connect current students with alumni and involve them our activities. So as we
            embark on a new era at SLIET, comeback Morningside heights to network, to reunite faculty all to take part
            in one of our celebration and thought – provoking discussions. I look forward to hearing from and seeing
            you.
        </Paragraph>
        <Paragraph>
            We will be asking you – The Alumni Association – to play a large role in coming year’s events because, after
            all, you are such a large part of what makes SLIET great. We also hope to launch a yearlong service project
            for which we will track all of Alumni efforts on the Alumni website to showcase SLIET’s impact in
            communities across the globe.
        </Paragraph>
        <Paragraph>
            Thanks for all your contributions.
        </Paragraph>
        <strong>
            Winnerjit Singh,<br/>
            President <Tooltip placement="top" title={"SLIET Alumni Association"}>SAA</Tooltip>
        </strong>
    </MessageLayout>
);

export default PresidentMessage;
