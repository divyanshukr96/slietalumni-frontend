import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Divider, Form, Typography} from "antd";
import InputField from "./InputField";

const {Title} = Typography;

const styles = theme => ({
    main: {
        maxWidth: 1100,
        margin: 'auto',
    }
});

const data = {
    title: 'Sample Form',
    formField: {
        name: 'name',
        label: 'Name Label',
        placeholder: 'Name PlaceHolder',

    }
};

class FormLayoutInner extends Component {
    render() {
        const {classes, ...h} = this.props;
        return (
            <div className={classes.main}>
                <Form onSubmit={this.handleSubmit} className={classes.form}>
                    <Title level={4}>{data.title}</Title>
                    <Divider/>
                    <InputField {...h} field={data.formField}/>
                </Form>
            </div>
        );
    }
}

const FormLayout = Form.create({name: 'contact_form'})(FormLayoutInner);

export default withStyles(styles)(FormLayout);