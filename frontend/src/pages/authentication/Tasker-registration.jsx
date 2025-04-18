import React from "react";
function Registration() {
    return <div>
        <div>
            <div>
                <div>
                    <div>
                        <label for="name">Name</label>
                        <input type="name" name="name" />
                    </div>
                    <div>
                        <label for="mobile">Mobile Number</label>
                        <input type="mobile" name="mobile" />
                    </div>
                    <div>
                        <label for="city" name="city">City</label>
                        <select name="city" id="" autofocus>
                            <option name="city">Cyberjaya</option>
                            <option>Putrajaya</option>
                        </select>
                    </div>
                    <div>
                        <label for="type" name="type">Type: </label>

                        <input type="radio" name="type"/><label for="group">Group</label>
                        <input type="radio" name="type" /> <label for="individual">individual</label>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="username" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" />
                        <a href="/login">I already have account</a>
                        <button type="submit">Register</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Registration;