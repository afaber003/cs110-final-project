import React, {useEffect} from 'react';
import {logOutUser} from "../services/networkService";

function Header({show, searchTerm, setSearchTerm}) {

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/NormGramLogo.jpeg`} alt="NormGram logo" height="40px"/>
            </a>
          </div>
          <div style={{margin: '0 auto 3px auto', height: '30px'}} className="searchbar">
            <img style={{zIndex: -1, position: "absolute", left: '32vw', height: '50px', width: "40vw"}}
                 src={`${process.env.PUBLIC_URL}/UCR background.png`}
                 alt="UCR background"/>
            {
                show &&
                (
                    <div style={{margin: '0 auto 0 auto', height: '30px'}} className="searchbar">
                      <input value={searchTerm} type="text" placeholder="Search" onChange={(event) => setSearchTerm(event.target.value)}/>
                      <img style={{height: '26px', position: "absolute"}}
                           src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093658/search-200x200.png"
                           alt="img2"/>
                    </div>
                )
            }
          </div>


          {show && <div className="nav-links">
            <ul className="nav-group">
              <li className="nav-item"><a href="#"><i className="fas fa-home"></i></a></li>
              <li className="nav-item"><a href="#"><i className="fab fa-facebook-messenger"></i></a></li>
              <li className="nav-item"><a href="#"><i className="far fa-compass"></i></a></li>
              <li className="nav-item"><a href="#"><i className="far fa-heart"></i></a></li>
              <li className="nav-item">
                <div style={{width: "fit-content", height: '40px', padding: '5px'}} className="action">
                  <div style={{marginRight: '20px'}} className="profile" onClick={() => {
                    window.location.href = 'http://localhost:3000/profile';
                  }}>
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg"
                         alt="user Avatar"/>
                  </div>
                  <div onClick={() => { logOutUser() }}>
                    <img className="profile" src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png"
                         alt="log out"/>
                  </div>
                </div>
              </li>
            </ul>
          </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;
