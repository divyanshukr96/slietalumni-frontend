import React from 'react';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    scroll: {
        display: 'flex',
        overflow: 'scroll hidden',
        marginTop: 4,
        paddingBottom: 2,
        '& *': {
            marginRight: 4,
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
        },
        '&::-webkit-scrollbar': {
            height: 8,
            backgroundColor: '#F5F5F5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#AAA',
            borderRadius: 8,
            backgroundImage: '-webkit-linear-gradient(90deg, rgba(0, 0, 0, .2) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .2) 75%, transparent 75%, transparent)'
        },
    }

});


const Scrollable = ({classes, children}) => <div className={classes.scroll}>{children}</div>;

export default withStyles(styles)(Scrollable);