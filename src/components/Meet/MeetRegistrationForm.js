import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as _ from "lodash";
import {Form, Row, Col, Input, Button, Checkbox, Select, Divider, Typography, Result, Avatar, Modal} from 'antd';
import {Branch, Programme} from "Constants/ProgrammeAndBranch";
import FormError from "components/Errors";
import {meetRegister} from "actions/publicAction";
import {authRequired, fetchDetails} from "../../actions/authAction";
import logo from "../../assets/SAA-logo-color.png";
import {withRouter} from "react-router-dom";

const {Text, Title, Paragraph} = Typography;


const SuccessMessage = ({success, data, history}) => {
    if (_.isEmpty(data)) return null;
    return (
        <Modal visible={success} footer={null} closable={false}>
            <Result
                icon={<Avatar size={100} src={logo} shape={"square"} style={{width: 150, height: 'auto'}}/>}
                status="success"
                title="Thank you for SLIET Alumni Meet"
                style={{
                    padding: 0
                }}
                subTitle={
                    <>
                        <Title level={4}>Dear {data.name}</Title>
                        Thanks a lot for registering yourself for Alumni Meet. <br/>
                        Kindly Pay your Alumni Meet registration fees on the given Bank Details and send us your
                        payment receipt on <a
                        href="mailto:association@slietalumni.com">association@slietalumni.com</a>
                        for your payment Confirmation

                        <Paragraph style={{textAlign: 'left', paddingTop: 12}}>
                            <Text style={{fontWeight: 500}}>Registration charges for Alumni Meet</Text><br/>
                            <Text>Single Person : ₹ 2000/-</Text><br/>
                            <Text>With Family : ₹ 2500/-</Text>
                        </Paragraph>


                        <Divider orientation={"left"} style={{marginBottom: 4}}>Bank Details</Divider>
                        <Paragraph style={{textAlign: 'left'}}>
                            Account No - 3652214249<br/>
                            Name - SLIET Alumni Association<br/>
                            IFSC Code - CBIN0283105<br/>
                            Branch - LONGOWAL<br/>
                            Bank Name - Central Bank of India<br/>
                        </Paragraph>

                        <Divider orientation={"left"} style={{marginBottom: 4}}>Contact Details</Divider>
                        <Paragraph style={{textAlign: 'left'}}>
                            Balraj - <a href="tel:+91-9041542991">+91-9041542991</a><br/>
                            Raghav Sharma - <a href="tel:+91-9569468234">+91-9569468234</a><br/>
                            Yash Verma - <a href="tel:+91-7300633011">+91-7300633011</a><br/>
                        </Paragraph>
                        <Paragraph style={{paddingTop: 8}} code>
                            A confirmation Mail is sent to your email <a
                            href={`mailto:${data.email}`}>{data.email}</a>
                        </Paragraph>
                    </>
                }
                extra={[
                    <Button type="primary" key="console" onClick={() => history.goBack()}>
                        Go Back
                    </Button>
                ]}
            />
        </Modal>
    );
};

const MeetRegistrationForm = Form.create({name: 'meet_registration'})(
    ({form, onRegister, user, loginRequired, isAuthenticated, fetchUser, history}) => {
        const [success, setSuccess] = useState(false);
        const [registered, setRegistered] = useState(false);
        const [data, setData] = useState(null);

        const {getFieldDecorator, resetFields} = form;

        const handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) onRegister(values).then(res => {
                    setData(res);
                    setSuccess(true);
                })
            });
        };

        useEffect(() => {
            if (isAuthenticated && registered) if (_.isEmpty(user)) {
                fetchUser()
            } else {
                setRegistered(isAuthenticated);
            }
        }, [isAuthenticated, user, registered]);


        const handleChecked = e => {
            e.preventDefault();
            const checkData = e.target.checked;
            setRegistered(checkData);
            if (checkData) loginRequired();
        };

        const FormColumn = ({name, children}) => {
            return registered ? null : <Col sm={12}>{children}</Col>
        };

        return (
            <>
                <SuccessMessage success={success} data={data} history={history}/>

                <Form onSubmit={handleSubmit}>
                    <FormError form={form}/>
                    <Row gutter={24}>

                        <Col sm={24}>
                            <Form.Item style={{marginBottom: 0}}>
                                <Checkbox onChange={handleChecked} checked={registered}
                                >Are you registered member?</Checkbox>
                            </Form.Item>
                        </Col>

                        {registered && isAuthenticated && <>

                            <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Name : </Col>
                            <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{user.name}</Text></Col>

                            <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>E-mail : </Col>
                            <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{user.email}</Text></Col>

                            <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Mobile : </Col>
                            <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{user.mobile}</Text></Col>

                            <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Username : </Col>
                            <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{user.username}</Text></Col>


                            <Col xs={24}>
                                <Form.Item style={{marginBottom: 0}}>
                                    {getFieldDecorator('member', {initialValue: user.email})(<Input hidden/>)}
                                </Form.Item>
                            </Col>
                        </>}

                        <FormColumn name="name">
                            <Form.Item label={'Name'} style={{marginBottom: 0}}>
                                {getFieldDecorator('name', {
                                    rules: [{required: !registered, message: 'Please enter your full name!'}],
                                })(<Input placeholder="Enter full name"/>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="email">
                            <Form.Item label={'Email'} style={{marginBottom: 0}}>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {required: !registered, message: 'Please enter your email-id!',},
                                        {type: 'email', message: 'The input is not valid e-mail!'},
                                    ],
                                })(<Input placeholder="Enter email-id"/>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="mobile">
                            <Form.Item label={'Mobile'} style={{marginBottom: 0}}>
                                {getFieldDecorator('mobile', {
                                    rules: [{required: !registered, message: 'Please enter your mobile number!'}],
                                })(<Input placeholder="Enter mobile number"/>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="academics">
                            <Form.Item label={'Programme'} style={{marginBottom: 0}}>
                                {getFieldDecorator('programme', {
                                    rules: [{required: !registered, message: 'Please select your programme!'}],
                                })(<Select placeholder="Select programme">
                                    <Select.Option key="programme" value={null}>None</Select.Option>
                                    {Programme.map(row =>
                                        <Select.Option key={row.value}
                                                       value={row.value}>{row.text}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="academics">
                            <Form.Item label={'Branch'} style={{marginBottom: 0}}>
                                {getFieldDecorator('branch', {
                                    rules: [{required: !registered, message: 'Please select your branch!'}],
                                })(<Select placeholder="Select branch">
                                    <Select.Option key="branch" value={null}>None</Select.Option>
                                    {Branch.map(row =>
                                        <Select.Option key={row.value}
                                                       value={row.value}>{row.text}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="academics">
                            <Form.Item label={'Passing Year'} style={{marginBottom: 0}}>
                                {getFieldDecorator('passing', {
                                    rules: [{required: !registered, message: 'Select your passing year!'}],
                                })(<Select placeholder="Select passing year" showSearch>
                                    <Select.Option key="passing" value={null}>None</Select.Option>
                                    {_.range(new Date().getFullYear(), 1985).map(row =>
                                        <Select.Option key={row} value={row}>{row}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="academics">
                            <Form.Item label={'Batch'} style={{marginBottom: 0}}>
                                {getFieldDecorator('batch', {
                                    rules: [{required: !registered, message: 'Select your batch!'}],
                                })(<Select placeholder="Select batch" showSearch>
                                    <Select.Option key="batch" value={null}>None</Select.Option>
                                    {_.range(new Date().getFullYear() - 3, 1985).map(row =>
                                        <Select.Option key={row} value={row}>{row}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="professionals">
                            <Form.Item label={'Organisation'} style={{marginBottom: 0}}>
                                {getFieldDecorator('organisation', {
                                    rules: [{
                                        required: !registered,
                                        message: 'Please enter your current organisation!'
                                    }],
                                })(<Input placeholder="Enter your current organisation"/>)}
                            </Form.Item>
                        </FormColumn>

                        <FormColumn name="professional">
                            <Form.Item label={'Designation'} style={{marginBottom: 0}}>
                                {getFieldDecorator('designation', {
                                    rules: [{required: !registered, message: 'Please enter your designation!'}],
                                })(<Input placeholder="Enter your designation"/>)}
                            </Form.Item>
                        </FormColumn>


                        <Col sm={24}>
                            <Divider orientation={"left"} style={{marginBottom: 0}}>Meet Details</Divider>
                        </Col>

                        <Col sm={12}>
                            <Form.Item style={{marginBottom: 0}}>
                                {getFieldDecorator('family', {
                                    valuePropName: 'checked'
                                })(<Checkbox>With Family</Checkbox>)}
                            </Form.Item>
                            <Form.Item style={{marginBottom: 0}}>
                                {getFieldDecorator('accommodation', {
                                    valuePropName: 'checked'
                                })(<Checkbox>Accommodation required</Checkbox>)}
                            </Form.Item>
                        </Col>

                        <Col sm={12}>
                            <Form.Item label={'any other requirements ?'} style={{marginBottom: 0}}>
                                {getFieldDecorator('requirements', {})(
                                    <Input.TextArea placeholder="Write your requirements here!"
                                                    autosize={{minRows: 3, maxRows: 6}}/>
                                )}
                            </Form.Item>
                        </Col>


                        {/*<Col span={24}>*/}
                        {/*    <Form.Item style={{marginBottom: 0}}>*/}
                        {/*        {getFieldDecorator('accept', {*/}
                        {/*            valuePropName: 'checked', initialValue: false,*/}
                        {/*            rules: [{validator: this.confirmAccept}],*/}
                        {/*        })(<Checkbox>I accept all information is correct</Checkbox>)}*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}
                        <Col span={24} style={{textAlign: 'right', paddingTop: 16}}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={() => resetFields()}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
);

const mapStateToProps = ({auth}) => ({
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
    onRegister: e => dispatch(meetRegister(e)),
    loginRequired: () => dispatch(authRequired()),
    fetchUser: () => dispatch(fetchDetails()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeetRegistrationForm));
