import React, {useEffect, useState} from 'react';
import axios from "axios";
import MemberList from "./MemberList";

const Sac = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUrl().then(r => setLoading(false));
    }, []);

    async function fetchUrl() {
        const {data} = await axios.get("/api/members");
        if (data.data) setMembers(data.data)
    }

    return <MemberList
        loading={loading}
        title={'SAC Member'}
        members={members.filter(data => data.sac)}
        update={fetchUrl}
    />;
};

export default Sac;
