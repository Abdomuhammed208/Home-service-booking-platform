import React from 'react';

function SwitchUser({ setUserType }) {
    return (
        <div>
            <button className='customer-registration-btn' onClick={() => setUserType('customer')}>
                Customer
            </button>
            <button className='tasker-registration-btn' onClick={() => setUserType('tasker')}>
                Tasker
            </button>
        </div>
    );
}

export default SwitchUser;
