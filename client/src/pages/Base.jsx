import {Outlet} from "react-router-dom";
import {useEffect} from "react";


export default function Base() {

    return (<>
        <Outlet style={{marginTop: '50px'}}/>
    </>)
}