import React from 'react';

function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/NormGramLogo.jpeg`} alt="NormGram logo" height="40px" />
            </a>
          </div>
          <div style={{margin: '0 auto 0 auto'}} className="searchbar">
            <img style={{zIndex: -1, position: "absolute", left: '32vw', height: '50px', width: "40vw"}} src={`${process.env.PUBLIC_URL}/UCR background.png`}
                 alt="UCR background"/>
            <div style={{margin: '0 auto 0 auto', height: '30px'}} className="searchbar">
              <input type="text" placeholder="Search"/>
              <img style={{height: '26px', position: "absolute"}}
                   src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093658/search-200x200.png"
                   alt="img2"/>
            </div>
          </div>


          <div className="nav-links">
            <ul className="nav-group">
              <li className="nav-item"><a href="#"><i className="fas fa-home"></i></a></li>
              <li className="nav-item"><a href="#"><i className="fab fa-facebook-messenger"></i></a></li>
              <li className="nav-item"><a href="#"><i className="far fa-compass"></i></a></li>
              <li className="nav-item"><a href="#"><i className="far fa-heart"></i></a></li>
              <li className="nav-item">
                <div className="action">
                  <div className="profile" onClick={() => { /* menuToggle() */ }}>
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg" alt="user Avatar" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
