import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PublicMemberList from "../components/PublicMemberList";

const Executive = () => {

    const [members, setMembers] = useState(localStorage.executive ? JSON.parse(localStorage.executive) : []);

    useEffect(() => {
        const fetchData = () => {
            axios.get('/api/public/members').then(({data}) => {
                if (data.data) {
                    const tmpData = data.data.filter(data => !data.sac);
                    setMembers(tmpData);
                    localStorage.setItem('executive', JSON.stringify(tmpData));
                }
            });
        };
        fetchData();
    }, []);


    return (
        <PublicMemberList title="Executive Committee" members={members}/>
    );
};


export default Executive;
