import React from 'react';

const Loading = () => {
    return (
        <div style={{height: 'calc(100vh - 16px)', display: 'flex'}}>
            <div style={{width: 300, margin: 'auto', textAlign: 'center'}}>
                <img src={"./SAA-logo-color.png"} alt=""/><br/>
                <img src={"./loading.gif"} alt="" style={{width: 150, marginTop: -45}}/>
                <h3 style={{marginTop: -8}}>Loading . . .</h3>
            </div>
        </div>
    );
};

export default Loading;
