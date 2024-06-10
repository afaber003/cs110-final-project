import Header from "../components/Header";
import Card from "../components/Card";
import React, {useEffect} from "react";
import {getUserDetails} from "../services/networkService";


export default function Home({setShow}) {

    const [userDetails, setUserDetails] = React.useState({});

    useEffect(() => {
        setShow(true)
        getUserDetails().then(userData => {
            if (userData) {
                setUserDetails(userData)
            }
        })
    }, []);


    return (
            <div className="container">
                <div className="col-9">
                    <div className="statuses">
                        {/* Status images */}
                        <div className="status">
                            <div className="image">
                                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220604085434/GeeksForGeeks-300x243.png" alt="img3" />
                            </div>
                        </div>
                        {/* Add more status items here */}
                    </div>
                    {/* Cards */}
                    <Card
                        profileImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png"
                        userName="normtheorange"
                        /*location="Mumbai, India"*/
                        postImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609090112/gfg1-298x300.jpeg"
                        likes="203"
                        dislikes="12"
                        /*userComment="Raju Modi"*/
                        comments="32"
                        postTime="2 hours ago"
                    />
                    <Card
                        profileImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609093241/g3-200x200.png"
                        userName="scottybear"
                        postImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609090119/gfg2-300x297.jpeg"
                        likes="420"
                        dislikes="69"
                        /*userComment="Piyush Agarwal"*/
                        comments="20"
                        postTime="4 hours ago"
                    />
                    {/* Add more cards here */}
                </div>
            </div>
    )
}