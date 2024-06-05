import React from 'react';

function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220609090809/download-200x200.png" alt="img1" height="30px" />
            </a>
          </div>
          <div className="searchbar">
            <input type="text" placeholder="Search" />
            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093658/search-200x200.png" height="18" alt="img2" />
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
