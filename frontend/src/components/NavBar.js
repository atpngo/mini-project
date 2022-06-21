import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

function NavBar()
{
    let {user, logoutUser} = useContext(AuthContext);

    const doSomething = () =>
    {
        console.log(user);
    }

    return (
        <div>
            {user && <p>Hello {user.username}</p>}
            {!user && <p>Hello World</p>}
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
}

export default NavBar;