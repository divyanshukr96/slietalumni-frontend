import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PublicMemberList from "../components/PublicMemberList";
import {Select} from "antd";
import * as _ from "lodash";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 16,
    },
    select:{
        width: 200,
        [theme.breakpoints.down('xs')]:{
            width: '100%',
        }
    },
}));

const StudentCell = () => {
    const currentYear = new Date().getFullYear();
    const classes = useStyles();
    const [activeSession, setActiveSession] = React.useState(currentYear);

    const [members, setMembers] = useState(localStorage.student ? JSON.parse(localStorage.student) : []);

    useEffect(() => {
        const fetchData = () => {
            axios.get('/api/public/members/sac').then(({data}) => {
                if (data.data) {
                    const tmpData = data.data.filter(data => data.sac);
                    setMembers(tmpData);
                    localStorage.setItem('student', JSON.stringify(tmpData));
                }
            });
        };
        fetchData();
    }, []);

    const onSessionChange  =React.useCallback(async (value) => {
        setActiveSession(value)
        axios.get(`/api/public/members/sac/${value}`).then(({data}) => {
            if (data.data) {
                setMembers(data.data);
            }
        }).catch(err => {});
    },[])


    const changeData = () => {

        return (
            <div className={classes.header}>
                <Select placeholder="Select Session" value={activeSession} showSearch className={classes.select} onChange={onSessionChange}>
                    {_.range(currentYear, 2014).map(row =>
                        <Select.Option key={row} value={row}>{row===currentYear ? 'Current Session' : row}</Select.Option>)}
                </Select>
            </div>
        )
    }


    return (
        <PublicMemberList title="Student Alumni Cell" members={members} headerExtra={changeData()}/>
    );
};


export default StudentCell;
