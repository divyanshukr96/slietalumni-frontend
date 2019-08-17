import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {Carousel} from "antd";

const styles = theme => ({
    slickSlide: {
        marginBottom: theme.spacing() * 2,
    },
    background: {
        height: 400,
        maxHeight: '40vh',
        width: '100%',
        backgroundSize: 'cover !important',
        backgroundPosition: 'center !important',
        backgroundRepeat: 'no-repeat !important'
    },
});


class HomeCarousel extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Carousel className={classes.slickSlide} autoplay fade pauseOnHover>
                {[
                    'https://slietalumni.com/images/sliet-college.jpg',
                    'https://slietalumni.com/images/alumnimeet-2018/meet2018-010.jpg',
                    'https://slietalumni.com/images/student-cell-member-meet-2018-001.JPG',
                    'https://slietalumni.com/images/abhivyakti-08-10-2018-2152.jpg'].map(e => (
                    <div>
                        <div className={classes.background} style={{
                            backgroundImage: `url("${e}")`,
                        }}/>
                    </div>
                ))}
            </Carousel>
        );
    }
}

HomeCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeCarousel);
