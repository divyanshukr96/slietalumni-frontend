import React from 'react';
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


const HomeCarousel = ({classes, images}) => {
    return (
        <Carousel className={classes.slickSlide} autoplay fade pauseOnHover>
            {images.map((e, i) => (
                <div key={i}>
                    <div className={classes.background} style={{backgroundImage: `url("${e}")`,}}/>
                </div>
            ))}
        </Carousel>
    );
};

HomeCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
};

HomeCarousel.defaultProps = {
    images: []
};

export default withStyles(styles)(HomeCarousel);
