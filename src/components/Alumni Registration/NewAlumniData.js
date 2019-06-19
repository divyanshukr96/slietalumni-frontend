import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";

const styles = theme => ({});

class NewAlumniData extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>

            </>
        );
    }
}

NewAlumniData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewAlumniData);