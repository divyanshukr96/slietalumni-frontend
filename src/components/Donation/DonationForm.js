import React, {Component} from 'react';
import * as _ from 'lodash'
import * as PropTypes from "prop-types";
import {Button, Form, Input, InputNumber, Modal, Result} from "antd";
import FileUploadButton from "../Registration/FileUploadButton";
import {connect} from "react-redux";
import {authRequired, fetchDetails} from "actions/authAction";
import {donate} from "actions/donationAction";
import FormError from "../Errors";
import {Category} from 'Constants/Donation';


const CollectionCreateForm = Form.create({name: 'donation_form'})(
    class extends Component {
        state = {};

        static getDerivedStateFromProps(nextProps, prevState) {
            const {isAuthenticated, isMember, user} = nextProps;
            if (isAuthenticated && isMember && _.isEmpty(user)) nextProps.fetchUser();
            return null;
        }

        render() {
            const {isMember, visible, onCancel, onCreate, form, user, donateFor} = this.props;
            const {getFieldDecorator} = form;

            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 6},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };

            return (
                <Modal
                    visible={visible}
                    title={`Donation Details for ${donateFor}`}
                    okText="Submit"
                    onCancel={onCancel}
                    onOk={onCreate}
                    confirmLoading={this.state.submitted}
                    destroyOnClose
                    maskClosable={false}
                >

                    <Form {...formItemLayout}>

                        <FormError form={form} formName="donation_form"/>

                        {isMember && <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('member', {initialValue: user.username})(<Input hidden/>)}
                        </Form.Item>}

                        <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('category', {initialValue: donateFor})(<Input hidden/>)}
                        </Form.Item>

                        <Form.Item label={'Name'} style={{marginBottom: 0}}>
                            {isMember ? user.name : getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please enter your full name!'}],
                            })(<Input placeholder="Enter full name"/>)}
                        </Form.Item>

                        <Form.Item label={'Email'} style={{marginBottom: 0}}>
                            {isMember ? user.email : getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: 'Please enter your email-id!',},
                                    {type: 'email', message: 'The input is not valid e-mail!'},
                                ],
                            })(<Input placeholder="Enter email-id"/>)}
                        </Form.Item>

                        <Form.Item label={'Mobile'} style={{marginBottom: 0}}>
                            {isMember && user.mobile ? user.mobile : getFieldDecorator('mobile', {
                                rules: [{required: true, message: 'Please enter your mobile number!'}],
                            })(<Input placeholder="Enter mobile number"/>)}
                        </Form.Item>

                        {isMember && !_.isEmpty(user.professional) ? ([
                            <Form.Item label={'Organisation'} style={{marginBottom: 0}} key="organisation">
                                {user.professional.organisation}
                            </Form.Item>,
                            <Form.Item label={'Designation'} style={{marginBottom: 0}} key="designation">
                                {user.professional.designation}
                            </Form.Item>
                        ]) : ([
                            <Form.Item label={'Organisation'} style={{marginBottom: 0}} key="organisation">
                                {getFieldDecorator('organisation', {
                                    rules: [{required: true, message: 'Please enter your current organisation!'}],
                                })(<Input placeholder="Enter your current organisation"/>)}
                            </Form.Item>,

                            <Form.Item label={'Designation'} style={{marginBottom: 0}} key="designation">
                                {getFieldDecorator('designation', {
                                    rules: [{required: true, message: 'Please enter your designation!'}],
                                })(<Input placeholder="Enter your designation"/>)}
                            </Form.Item>
                        ])}

                        <Form.Item label="Amount">
                            {getFieldDecorator('amount', {
                                rules: [{required: true, message: 'Please enter the donation amount!'}],
                            })(<InputNumber
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="Enter donation amount!"
                                style={{width: '100%'}}
                            />)}
                        </Form.Item>

                        <FileUploadButton
                            formProps={form}
                            label={'Receipt'}
                            name={'receipt'}
                            decoratorProps={{
                                rules: [{required: true, message: 'Please select the donation receipt!'}],
                            }}
                            uploadProps={{
                                listType: "picture"
                            }}
                        >
                            <Button type={"dashed"}>
                                Select Donation Receipt . . .
                            </Button>
                        </FileUploadButton>

                    </Form>
                </Modal>
            );
        }
    },
);

class DonationForm extends Component {
    state = {
        visible: false,
        login: false,
        member: false,
        success: false,
    };

    handleCancel = () => {
        this.formRef.setState({submitted: false});
        this.setState({visible: false, success: false, member: false, login: false});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const {isAuthenticated} = this.props;
        if (isAuthenticated && this.state.login) this.setState({visible: true, login: false, member: true});
        return null;
    }

    handleCreate = (e) => {
        const {form} = this.formRef.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                this.formRef.setState({submitted: true});
                this.props.addDonation(values).then(res => {
                    if (res) this.setState({visible: false, success: true, member: false, login: false});
                    this.formRef.setState({submitted: false});
                });
            }
        });
    };


    render() {
        const {loginRequired} = this.props;
        const showModal = () => this.setState({visible: true, member: false});
        const authModal = () => this.setState(s => ({...s, login: true}));
        return (
            <div>
                <Button type="primary" onClick={() => Modal.confirm({
                    title: 'Are you registered member ?',
                    okText: "Yes",
                    cancelText: 'No',
                    onOk() {
                        loginRequired();
                        authModal();
                    },
                    onCancel() {
                        showModal();
                    },
                })}>
                    Donate
                </Button>
                {this.state.success && null}

                <Modal
                    visible={this.state.success}
                    closable={false}
                    footer={null}
                >
                    <Result
                        style={{padding: `12px 8px`}}
                        status="success"
                        title="Your Donation is Successfully Submitted!"
                        subTitle={
                            <>
                                We are extremely grateful for the gift that you have given to
                                <strong> SLIET Alumni Association</strong>. <br/>
                                We appreciate your help and look forward to encourage for donation.
                            </>
                        }
                        extra={[
                            <Button
                                onClick={() => this.setState({success: false})}
                                key="buy" icon="close" size={"small"} type={"danger"}
                            >Close</Button>
                        ]}
                    />
                </Modal>

                <CollectionCreateForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    isMember={this.state.member}
                    fetchUser={this.props.fetchUser}
                    success={this.state.success}
                    user={this.props.user}
                    {...this.props}
                />
            </div>
        );
    }
}


DonationForm.propTypes = {
    donateFor: PropTypes.oneOf(Category.map(e => e.value)).isRequired,
};

const mapStateToProps = ({auth}) => ({
    user: auth.user,
    authRequired: auth.authRequired,
    isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    loginRequired: () => dispatch(authRequired()),
    fetchUser: () => dispatch(fetchDetails()),
    addDonation: (data) => dispatch(donate(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DonationForm);
