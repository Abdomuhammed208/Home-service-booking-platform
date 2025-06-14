import React, { useState } from "react";
import CustomerForm from './CustomerForm';
import TaskerForm from './TaskerForm';

function Signup() {
    const [userType, setUserType] = useState('customer');

    return (
        <div>
            {userType === 'customer' ? 
                <CustomerForm setUserType={setUserType} /> : 
                <TaskerForm setUserType={setUserType} />
            }
        </div>
    );
}

export default Signup;
