import React from 'react';
import {Typography} from "antd/lib/index";
import MessageLayout from "./MessageLayout";
import image from "../../assets/chairman.jpg"

const {Paragraph} = Typography;

const ChairmanMessage = () => {
    return (
        <MessageLayout
            title={'Message from Chairman, SAA'}
            image={image}
        >
            <Paragraph>
                I am writing to as the Chairman of SLIET Alumni Association discussing various improvements and
                challenges of your great Alma Mater.
            </Paragraph>
            <Paragraph>
                I congratulate the alumni and students who have come forward to help the Institute and the faculty who
                are relentlessly serving this great institution and helping sustain its high standards in education
                excellence.
            </Paragraph>
            <Paragraph>
                This transformation would not be possible without the support of Alumni, Students, and Student Alumni
                Cell.
            </Paragraph>
            <Paragraph>
                It has been an honor and a privilege to serve you all these years. I am very proud to be affiliated with
                the alumni and the young students turning into alumni with every passing year. I certainly have enjoyed
                meeting some of you along the way this year, and if we still have not met, I hope we will soon. You
                should always feel free to call or stop by if you would like to catch up.
            </Paragraph>
            <Paragraph>
                When I recall my memories of those golden days at SLIET. I see you all cycling together on streets of
                the campus and roam with your hands on each other’s shoulders. Today embrace your Alma Mater in the same
                way and give back to the Institute to make its path towards excellence. This is one place where you grew
                up to face the world. We must do for our very own SLIET.
            </Paragraph>


            <strong>
                Dr. Sukhcharn Singh,<br/>
                Chairman SAA
            </strong>

        </MessageLayout>
    );
};

export default ChairmanMessage;