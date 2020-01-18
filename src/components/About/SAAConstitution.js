import React from 'react';
import {withStyles} from "@material-ui/core";
import {Col, Divider, Row, Tooltip, Typography} from "antd";

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

const SAAConstitution = ({classes}) => (
    <div className={classes.main}>
        <Row>
            <Col sm={24} className={classes.details}>
                {/*<Title level={3}>Alumni Association Constitutions</Title>*/}
                <Title level={3} style={{textAlign: 'center',}}>
                    CONSTITUTION AND BYE LAWS OF SLIET ALUMNI ASSOCIATION
                </Title>
                <Divider style={{margin: '8px 0 16px'}}/>
                {/*<Title level={4} style={{textAlign: 'center',}}>*/}
                {/*    CONSTITUTION AND BYE LAWS OF SLIET ALUMNI ASSOCIATION*/}
                {/*</Title>*/}
                <Paragraph>
                    <ol>
                        <li>The Names and Association shall be SLIET ALUMNI ASSOCIATION (SAA)</li>
                        <li>The Registered Office of the Association shall be situated at the office of the
                            SLIET Alumni Association, SLIET, Longowal – 148106, Dist. Sangrur, Punjab.
                        </li>
                        <li><strong>DEFINITIONS</strong>
                            <ol style={{listStyleType: 'inherit'}}>
                                <li><strong>Bylaws</strong> :
                                    The bylaws developed for governing SAA shall be governed by the Punjab
                                    Societies Registration Act, which may be modified by simple majority of the
                                    general body of SAA as deemed necessary
                                </li>
                                <li>
                                    <Tooltip placement="top" title={"SLIET Alumni Association"}>
                                        <strong>SAA</strong>
                                    </Tooltip> :

                                    The association of alumni of SLIET, Longowal (named as SLIET ALUMNI
                                    ASSOCIATION) registered under the Punjab Societies Registration Act as a
                                    society and has an office in the campus of SLIET, Longowal, also referred to
                                    as the ‘ASSOCIATION’
                                </li>
                                <li><strong>Patron</strong> : The Director of Sliet, Longowal will
                                    be the patron of SAA.
                                </li>
                                <li><strong>General Body</strong> : annual General Body consist of
                                    all alumni members, faculty and technical staff, members, honorary member
                                    and Patron of the Association
                                </li>
                                <li><strong>Quorum</strong> : The minimum number of members
                                    required for a meeting to be conducted or a resolution to be passed.
                                </li>
                                <li><strong>Voting</strong> : In case of failure to achieve
                                    unanimous decision, any issue can be put to voting
                                </li>
                                <li><strong>Executive Committee (EC)</strong> : EC is the governing
                                    body elected by the General Body for the day-to-day functioning of the
                                    ‘ASSOCIATION’. Details of EC’s formation, role and functioning are described
                                    in Clause 9 of the By Laws.
                                </li>
                                <li><strong>Communication</strong> : A process of sharing
                                    information or any information that is passed to any member or group of
                                    members of the general body using one or more written medium of
                                    communication (viz. letter, fax, Newspaper Advertisement and/or email) and
                                    is dispatched at least 20 days in advance to the most recent address/
                                    Telephone/Fax Number/email IDs, available with SAA office, of the desired
                                    receiver or in a local daily. Communication shall be deemed to be complete
                                    as against SAA at the end of 20 days of dispatch of information/ publishing
                                    in a local daily. Any communication to the office of SAA as against a member
                                    of SAA shall be deemed to complete only after the receipt of the
                                    communication by the office.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>MISSION OF THE SAA</strong>
                            <ol>
                                <li>To create a world -class organization for bringing together all the alumni
                                    of the SLIET, Longowal and providing a forum for its members;
                                </li>
                                <li>To facilitate professional networking for mutual benefit in academic,
                                    professional, and/ or business area;
                                </li>
                                <li>To facilitate and encourage alumni to contribute to the Institute’s efforts
                                    for achieving excellence in academics and research through allocating/
                                    raising funds and/ or sharing knowledge & expertise of its members in areas
                                    pertaining to academics, infrastructure, industry interactions and any other
                                    area that the alumni and the institute feel appropriate; and,
                                </li>
                                <li>To offer expertise effort and/ or financial resources to assist
                                    not-for-profit organizations dedicated to Indias’s development, and thereby
                                    contribute to the well being of the society.
                                </li>
                                <li>To help alumni help their professional goals</li>
                                <li>To contribute to the Institute’s vision of being recognized among the
                                    world’s leading institutions in academics, research excellence and
                                    innovation.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>OBJECTIVES OF SAA</strong><br/>
                            <span>Towards achieving the above MISSION,
                                        <Tooltip placement="top" title={"SLIET Alumni Association"}> SAA</Tooltip> :
                                        will focus on the following objectives:
                                    </span>
                            <ol>
                                <li>To enable professional networking among alumunus, among faculties, technical
                                    staffs with alumni as well as networking of existing students with alumni
                                    for mutual benefit in academic, professional and/or business areas;
                                    including employment Network for new graduates or alumni looking for career
                                    upgrade/change, and alumni displaced from workforce;
                                </li>
                                <li>To provide a platform for social interactions and special interest groups;
                                </li>
                                <li>To raise funds for the institute;</li>
                                <li>To extend academic support to the Institute through various networks such as
                                    ‘visiting faculty network’, ‘Curriculum development network’, ‘Distance
                                    learning network’, ‘academic endowment network’ etc;
                                </li>
                                <li>To render assistance to the students of the institute through grants,
                                    scholarships and prizes and to provide assistance in academics, placement or
                                    any other area as appropriate;
                                </li>
                                <li>To provide financial and technical collaboration support for cutting-edge
                                    applied and industrial research for the global marketplace;
                                </li>
                                <li>To provide financial and technical collaboration by alumni researchers and
                                    faculty in top research institutions around the world;
                                </li>
                                <li>To encourage and facilitate the alumni taking up activities that is geared
                                    to improve society at large and contribute to national development;
                                </li>
                                <li>To provide group benefits like health services, health insurance, medical
                                    services etc;
                                </li>
                                <li>To help the e alumni families and needy alumni;</li>
                                <li>To mobilize funds required to manage the affairs and activities of the
                                    association;
                                </li>
                                <li>To professionalize leveraging of the database with an exhaustive and
                                    transparent documentand,
                                </li>
                            </ol>
                        </li>
                    </ol>
                </Paragraph>


                <Title level={4} style={{margin: 0}}>
                    BY LAWS OF <Tooltip placement="top" title={"SLIET Alumni Association"}> SAA</Tooltip>:
                </Title>
                <Paragraph>
                    The following are the By Laws of the SLIET Alumni Association (SAA), which will be a
                    registered society, governed by the Punjab Societies Act.
                </Paragraph>
                <Paragraph>
                    <ol>
                        <li><strong>GENERAL</strong>
                            <ol style={{listStyleType: 'inherit'}}>
                                <li>The name of the society shall be SLIET Alumni Association henceforth
                                    referred to as SAA
                                </li>
                                <li>The address of the registered office is Science Block, SLIET, Longowal-148
                                    106 (to be allotted)
                                </li>
                                <li><strong>Registration and Existence: </strong>
                                    SAA will be formally registered under the Punjab Societies Act. However, the
                                    alumni association has been in existence informally since 1997.
                                </li>
                                <li><strong>Jurisdiction: </strong>
                                    SAA comes under the jurisdiction of the Registrar of Firms and Societies,
                                    Punjab
                                </li>
                                <li>The Business Hours of the society shall be between 9.00 am and 5.00 pm on
                                    all working days except Saturdays, Sundays and Government holidays.
                                </li>
                                <li>The objective of these bylaws is to carry out the mission and objectives of
                                    SAA, as outlined in the aforementioned Memorandum and Articles of
                                    Association, in general, and in particular, to provide an organization
                                    through which the Alumni of the SLIET, Longowal, faculty, technical staff
                                    and students of the institute can interact with each other for mutual
                                    benefit and for the benefit of the society at large. These bye laws specify
                                    the structure, rules of the process, and procedure for the proper governance
                                    of the organization, in accordance with the guidelines of the Punjab
                                    Societies Act.
                                </li>
                                <li><strong>Activities: </strong>
                                    SAA through its Existence Committee will carry on activities such as
                                    conducting seminars, holding meetings, organizing events, publishing
                                    magazines and newsletters, maintaining website and technology and
                                    infrastructure, and any other activity that facilitates achievements of the
                                    association.
                                </li>
                                <li><strong>Responsible Office Bearers: </strong>
                                    The President, the secretary, executive committee of SAA shall be the
                                    persons authorized to sue and be sued on behalf of the association.
                                </li>
                                <li><strong>Empowerment to Execute SAA Mission: </strong>
                                    The President and the Secretary of SAA along with the Executive Committee
                                    are the persons empowered to take decisions and direct the course of the
                                    association within the framework of the Memorandum and Bye-Laws.
                                </li>
                            </ol>
                        </li>
                        <li><strong>Membership</strong>
                            <ol style={{listStyleType: 'inherit'}}>
                                <li>Member type and eligibility for membership to the association is categorized
                                    as defined below:
                                    <ul>
                                        <li><strong>Patron: </strong>
                                            The Director of the SLIET, Longowal, shall be the ex-oficio Patron
                                            of SAA.
                                        </li>
                                        <li><strong>Alumni Member: </strong>
                                            Any person who has received Ph.D, Master degree, degree, diploma,
                                            certificate ICD conferred by the SLIET, Longowal, shall be eligible
                                            to enroll as Alumni Member.
                                        </li>
                                        <li><strong>Faculty and Technical Staff Member: </strong>
                                            The academic and technical staff, and registrar of the SLIET,
                                            Longowal, other than those falling under category i.e, 2.1 (b) above
                                            shall be eligible to become Staff Member
                                        </li>
                                        <li><strong>Honorary Member: </strong>
                                            SAA may decide to confer honoraray membership to eminent persons.
                                        </li>
                                    </ul>
                                </li>
                                <li><strong>Enrollment: </strong>
                                    The rules for enrollment of members to the association are as follows:
                                    <ul>
                                        <li><strong>Alumni Members: </strong>
                                            All individuals who have been conferred Ph.D, Master degree, degree,
                                            diploma or certificate by SLIET, Longowal and whose membership fees
                                            have been received by SLIET Alumni Association, will be
                                            automatically deemed to be a member of the alumni association.
                                            Alumni members are expected to register with the alumni association
                                            for future communication and periodically update their contact
                                            information in the alumni database, online at the SAA website.
                                        </li>
                                        <li><strong>Staff Members: </strong>
                                            The academic and technical staff including visiting academic staff
                                            and the Registrar, who are not alumni of SLIET shall be entitled for
                                            registration of membership in the form prescribed by the executive
                                            committee of the association.
                                        </li>
                                        <li><strong>Honorary Members: </strong>
                                            Eminent persons may be admitted to be the honorary members, as may
                                            be considered by the executive committee of the association, in
                                            consultation with the patron. Ex- Patrons of SAA automatically
                                            become Honorary Members after they cease to be the Director of
                                            SLIET, Longowal.
                                        </li>
                                    </ul>
                                </li>
                                <li><strong>Alumni Registry: </strong>
                                    A registry and/or an electronic database of members shall be kept at the
                                    registered office of the association.
                                </li>
                                <li><strong>Changes of Address Notification: </strong>
                                    If a member changes his/her postal and/or e-mail address, he/she shall
                                    notify his/her new address to the Alumni Association Office, and the entry
                                    in the registry shall be accordingly changed; but if he/she fails to notify
                                    his/her new address, the address in the roll of members or Registry shall be
                                    deemed to be his/her address.
                                </li>
                                <li><strong>Alumni-SAA Communication: </strong>
                                    All communication to the members will be through e-mail, except where the
                                    member makes a request in writing for alternative means of communication.
                                </li>
                                <li><strong>Term of Ex-officio Membership: </strong>
                                    Where a member of the association becomes a member by virtue of the office
                                    or appointment he/she holds, his/her membership of the association shall
                                    terminate when he/she ceases to hold that office or appointment, with the
                                    exception of the Director of SAA as outlined in (2.2-c) above.
                                </li>
                                <li><strong>Termination of Membership: </strong>
                                    The Executive Committee of the SAA may cease any individual’s status as a
                                    member under any of the following circumstances:
                                    <ol>
                                        <li><strong>Death, Mental Disability, or Criminal Conviction: </strong>
                                            If he/she dies, resigns, becomes of unsound mind, or is convicted of
                                            a criminal offence involving moral turpitude.
                                        </li>
                                        <li><strong>Expulsion due to Misconduct as per Rules: </strong>
                                            The Executive committee shall have power to expel a member for
                                            willful disregard to the association’s rules or misconduct on the
                                            part of the member, provided that the member concerned will be an
                                            opportunity for explaining his conduct.
                                        </li>
                                        <li><strong>Appeal of Expulsion: </strong>
                                            Any member thus expelled can appeal to the executive committee and
                                            to the patron for reconsideration of expulsion with justification.
                                        </li>
                                        <li><strong>Resignation: </strong>
                                            A resignation from membership shall be tendered to the President and
                                            it shall not take effect until it has been accepted on behalf of the
                                            Association by the executive committee.
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li><strong>MEMBER OBLIGATIONS AND RIGHTS </strong>
                            <ol>
                                <li><strong>Member Privileges and Rights: </strong>
                                    Members are eligible to use the services of SAA office, receive publications
                                    and newsletter of SAA, exercise their vote in GBMs, register on the SAA
                                    website, attend alumni meetings and event, receive annual reports, and
                                    participate in SAA activities.
                                </li>
                                <li><strong>Membership Benefits: </strong>
                                    Member can avail of services and initiatives offered from time to time by
                                    the institute and SAA to alumni, which may include use of facilities at the
                                    institute or elsewhere.
                                </li>
                                <li><strong>Member Obligations: </strong>
                                    Members are expected to conduct themselves in line with the MOA and Bye laws
                                    of the association while representing SAA and participating in the
                                    association activities.
                                </li>
                            </ol>
                        </li>
                        <li><strong>SUBSCRIPTION AND FEES: </strong>
                            <ol>
                                <li><strong>Life Time Membership Fees: </strong>
                                    The life membership fee of the association shall be Rs. 5,000/- (Five
                                    Thousand only) for alumni members as defined above.
                                </li>
                                <li><strong>Staff/Honorary membership Fee: </strong>
                                    Academic and Technical Staff members and honorary members are not obliged to
                                    pay ant membership fee. <br/>
                                    The membership and subscription fees are subject to revision from time to
                                    time with the approval of the General Body. <br/>
                                    <strong>QUORUM AND VOTES: </strong>
                                    <ul>
                                        <li>Quorum for an AGM should be a minimum of 25 members.</li>
                                        <li>Quorum for an EGM should be a minimum of 100 members, whether
                                            convened by EC or requisitioned by the members.
                                        </li>
                                        <li>Quorum for changing bye laws, be it in the AGM or EGM, should be a
                                            minimum of 100.
                                        </li>
                                        <li>Every member shall have one vote and in case of equality of votes,
                                            the Chairman of the meeting shall have a casting vote. A member
                                            shall not vote by proxy.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                            <strong>Note: </strong>Since EGMs, AGMs may be physical/virtual meetings, alumni
                            should be allowed to
                            record their acceptance of the proceedings through polling that is kept open for a
                            week prior to EGM or AGM there is no need for 100 members to be physically/virtually
                            present on the day of the EGM/AGM.
                        </li>
                        <li><strong>ORGANIZATIONAL STRUCTURES: </strong>
                            <ol>
                                <li>THE ORGANIZATIONAL UNITS (OU): The Major Organizational Units of the
                                    Association are:
                                </li>
                                <li>THE GENERAL BODY,</li>
                                <li>THE EXECUTIVE COMMITTEE and Office bearers (President etc)</li>
                                <li>OUs Support: The alumni office, located in the SLIET, Longowal, will support
                                    the above OUs.
                                </li>
                            </ol>
                        </li>
                        <li><strong>THE GENERAL BODY: ITS ROLE AND FUNCTIONING</strong>
                            <ol>
                                <li>The GENERAL BODY consists of all members registered in the membership
                                    registry.
                                </li>
                                <li><strong>Member Voting Rights: </strong>
                                    Each Alumnus member will have ONE VOTE in the GENERAL BODY
                                </li>
                                <li><strong>Supreme Authority: </strong>
                                    The GENERAL BODY shall be the supreme authority in all matters pertaining to
                                    SAA.
                                </li>
                                <li><strong>The Annual General Body Meeting (AGM): </strong>
                                    AGM of the Association shall be held prior to convocation day at the
                                    institute premises or at such notified place and at such time and date as
                                    the executive committee may determine to transact the following business:
                                    <ol>
                                        <li><strong>Notice for AGM: </strong>
                                            : At least 21 days notice shall be given for holding the Annual
                                            General Meeting. The Secretary’s report and the audited statement of
                                            accounts of the preceding financial year shall be circulated and/or
                                            posted on the association’s website at least seven days prior to the
                                            date of Annual General Body Meeting.
                                        </li>
                                        <li><strong>Approval of Annual Report and Accounts: </strong>
                                            To approve the annual report and the audited statement of accounts
                                            of the Association for the previous financial year ending, 31st
                                            March.
                                        </li>
                                        <li><strong>Election of the Executive Committee: </strong>
                                            To elect the members of the Executive Committee of the association
                                            and office bearers are required.
                                        </li>
                                        <li><strong>Appointment of the Auditor: </strong>
                                            To appoint auditor or auditors to hold office from the conclusion of
                                            one Annual General Body Meeting to the conclusion of next Annual
                                            General Body Meeting.
                                        </li>
                                        <li><strong>Resolution of General Matters: </strong>
                                            To discuss, and resolve matters of general interest to the members
                                            which may be placed before the meeting or any other matter for which
                                            seven days notice has been received from any member, subject to the
                                            permission of the chair.
                                        </li>
                                    </ol>
                                </li>
                                <li>An extraordinary General Meeting (EGM) of the members of the association may
                                    be called by the executive committee.
                                    <ol>
                                        <li><strong>EC Initiated EGM: </strong>
                                            An extraordinary General Meeting of the members of the association
                                            may be called by the executive committee on its own.
                                        </li>
                                        <li><strong>Members Requested EGM: </strong>
                                            Such Extraordinary General Meeting shall also be called at the
                                            request made to the executive made to the executive committee in
                                            writing by at least 100 registered members of the association.
                                        </li>
                                        <li><strong>Announcement of EGM: </strong>
                                            The announcement of the EGM shall be done within one month from the
                                            date of receipt of their requisition in writing, and the actual
                                            meeting conducted not later than 30 days from the date of the
                                            announcement. For holding an Extraordinary General Body Meeting, 30
                                            days clear notice shall be given to the members specifying the
                                            business to be transacted.
                                        </li>
                                        <li><strong>Mode, Medium, and Voting at AGM/EGM: </strong> <br/>
                                            i) AGM and EGMs could be a combination of physical and virtual
                                            online meetings. <br/>
                                            ii) Members can cast their votes on the motions/agenda items, via
                                            internet in the POLL which will be kept open for a minimum of 3 days
                                            prior to the EGM or AGM. <br/>
                                            iii) The POLL will be set up in such a way to authorize the Chairman
                                            of the Meeting to act as the Proxy for each of the members
                                            participating in the POLL.
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li><strong>QUORUM AND VOTES</strong>
                            <ol>
                                <li><strong>Quorum for an AGM: </strong>
                                    Should be a minimum of 25 members physically present.
                                </li>
                                <li><strong>Quorum for an EGM: </strong>
                                    should be a minimum of 100 members, physically and virtually present and
                                    voting, of which at least 25 members should be physically present at the
                                    time and place of EGM notified by the EC, whether convened by EC or
                                    requisitioned by the members.
                                </li>
                                <li><strong>Quorum for changing Bylaws: </strong>Quorum for changing Byelaws, in
                                    the AGM or EGM should be a minimum of 100 members, the physical/virtual
                                    composition of which being the same as in the clause 7.2 above.
                                </li>
                                <li><strong>Revising the ‘Quorum’ of AGM/EGM: </strong>For revising the ‘Quorum’
                                    of AGM/EGM upwards to any higher figure than specified in 7.1 or 7.2 above
                                    at least twice the number of members proposed as the new quorum should be
                                    present and be voting, physically or virtually, in the AGM/EGM.
                                </li>
                                <li><strong>Member Voting Rights in the AGM/EGM: </strong> Every alumnus member
                                    shall have one vote and in case of equality of votes, the President of the
                                    EC shall be the Chairman of the meeting, and shall have a casting vote. A
                                    member shall NOT vote by proxy.
                                </li>
                                <li><strong>Meeting Mode, Medium and Voting Process: </strong>
                                    Since EGMs, AGMs may be physical /virtual meetings; a member should be
                                    allowed to record his/her acceptance of the proceedings through polling that
                                    is kept open for a week prior to the EGM or AGM. There is no need for all
                                    the 100 members to be physically/virtually present on the day of the
                                    EGM/AGM.
                                </li>
                            </ol>
                        </li>
                        <li><strong>THE EXECUTIVE COMMITTEE (EC): Its FORMATION. Its ROLE, AND
                            FUNCTIONING</strong>
                            The affairs of the ASSOCIATION will be managed by an EXECUTIVE COMMITTEE (EC) as per
                            the Clause below.
                            <ol>
                                <li><strong>Executive Committee (EC) consists of : </strong><br/>
                                    Six (6) Elected Office Bearers (EOB) and six elected members
                                    <ul>
                                        <li>President</li>
                                        <li>Two Vice- Presidents</li>
                                        <li>Secretary</li>
                                        <li>Treasurer</li>
                                        <li>Joint- Secretary</li>
                                        <li>Members (6)</li>
                                    </ul>
                                </li>
                                <li><strong>Election of EC Members including Office Bearers</strong>
                                    <ol>
                                        <li><strong>President</strong> <br/>
                                            The President shall be elected in by the AGM. He/She shall be a
                                            regular member of the Association. The President shall convene and
                                            preside over the meetings of the EC as well as the General Body and
                                            shall maintain their minutes. He/She shall make announcements
                                            regarding General Body Meetings, Elections and proposed amendments
                                            to the constitution and/or By-laws.
                                        </li>
                                        <li><strong>Vice Presidents </strong><br/>
                                            Both the Vice Presidents shall be elected by the AGM. However, one
                                            of them shall be resident within India and other resident abroad.
                                            They shall be regular members of the Association. They Shall <br/>
                                            i) discharge the duties of the President during his/her absence
                                            and <br/>
                                            ii) other tasks as assigned by the Board.
                                        </li>
                                        <li><strong>Secretary</strong><br/>
                                            The Secretary who shall be elected by the AGM and shall be a regular
                                            member of the Association and an employee of the Institute. He/She
                                            shall act as liason between the Association and the Institute one
                                            one hand and the Association and the SLIET Student body on the
                                            other. He/She shall also represent the Association in various bodies
                                            of the Institute. On behalf of the EC, he/she shall oversee <br/>
                                            (1) the functioning of the registered office of the Association,
                                            and <br/>
                                            (2) The execution of the decisions and policies made by the Board
                                            and its Standing Committee(s)
                                        </li>
                                        <li><strong>Treasurer</strong><br/>
                                            The Treasurer shall be elected by the AGM. He/She, an employee of
                                            the Institute, shall be a regular member of the Association, such
                                            as <br/>
                                            i. the collection of Membership Dues and grants and donations
                                            received by the Association <br/>
                                            ii. the expenditure of the Association <br/>
                                            iii. he/she shall be responsible for making all records available
                                            for the scrutiny to the auditor and shall be responsible for
                                            presenting the Statement of Accounts in the Annual General Body
                                            meeting (AGBM)
                                        </li>
                                        <li><strong>Members</strong><br/>
                                            The six elected members of the EC shall represent alumni at large
                                            and shall be responsible for carrying out duties assigned by the EC.
                                        </li>
                                        <li><strong>Ex-Oficio and Nominated Members</strong><br/>
                                            Immediate Past-President and the Past-Secretary who have completed
                                            their term, <br/>
                                            a. the president or his nominee of SFA <br/>
                                            b. Patron’s nominee shall be the ex-oficio members of the EC.
                                        </li>
                                        <li><strong>Distinguished Alumnus/Alumna</strong><br/>
                                            The out-going EC shall nominate a distinguished alumnus/alumna as a
                                            member of the EC for a term of two years.
                                        </li>
                                        <li><strong>EC Position and Election Characteristics: </strong>
                                            The following position and election characteristics will be
                                            preserved when conducting elections to the EC. <br/>
                                            1) All positions are GLOBAL, <br/>
                                            2) Global General Elections for EC, with one common electorate <br/>
                                            3) Each alumnus has ONE VOTE for each position in the EC via common
                                            voting mechanism across via the Internet at the Central SAA Website,
                                            allowing all alumni from all over the world to vote. <br/>
                                            4) Electronic polling will be kept open a minimum of one week prior
                                            to AGM which will coincide the last date of the polling.
                                        </li>
                                        <li><strong>Eligibility Criteria for contesting EC elections: </strong>
                                            The following alumni are eligible to contest for any of the
                                            positions in the EC, including office bearers. <br/>
                                            1. Elected Members: As described in Clause 8.2.5 <br/>
                                            2. Nominated Members: As described in Clause 8.2.6 <br/>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </Paragraph>
            </Col>
        </Row>
    </div>
);

export default withStyles(styles)(SAAConstitution);
