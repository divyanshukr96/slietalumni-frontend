import React from "react";
import {isEmpty as _} from "lodash";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';

class FormError extends React.Component {
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        const {errors, form: {setFields, getFieldValue}, formName, name} = nextProps;
        if (!_(errors) && formName === name) {
            Object.keys(errors).forEach(k => {
                setFields({
                    [k]: {
                        value: getFieldValue(k),
                        errors: [new Error(errors[k])]
                    }
                });
            });
            nextProps.onClearError();
        }
        return null;
    }


    render() {
        return null;
    }
}

FormError.propTypes = {
    form: PropTypes.object.isRequired,
    formName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors.errors,
    name: state.errors.name,
});

const mapDispatchToProps = dispatch => ({
    onClearError: () => dispatch({type: 'ERROR_CLEAR'})
});

export default connect(mapStateToProps, mapDispatchToProps)(FormError);
