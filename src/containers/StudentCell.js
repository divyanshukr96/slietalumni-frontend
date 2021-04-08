import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PublicMemberList from "../components/PublicMemberList";

const StudentCell = () => {

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


    return (
        <PublicMemberList title="Student Alumni Cell" members={members}/>
    );
};


export default StudentCell;
