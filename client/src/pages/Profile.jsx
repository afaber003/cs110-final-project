import {useEffect} from "react";


export default function Profile({setShow}) {

    useEffect(() => {
        setShow(false)
    }, []);



    return (
        <div style={{width: '100%'}} className="container">
            {/*create profile display here and hook up to /users/edit endpoint*/}
            {/*can get user info by using the await getUserDetails() function}*/}
        </div>
    )
}