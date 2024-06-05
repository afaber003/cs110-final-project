import React from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
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
              userName="Ayush Agarwal"
              location="Mumbai, India"
              postImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609090112/gfg1-298x300.jpeg"
              likes="203 likes"
              userComment="Raju Modi"
              comments="View all 32 comments"
              postTime="2 hours ago"
            />
            <Card
              profileImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609093241/g3-200x200.png"
              userName="Piyush Agarwal"
              location="Delhi, India"
              postImg="https://media.geeksforgeeks.org/wp-content/uploads/20220609090119/gfg2-300x297.jpeg"
              likes="119 likes"
              userComment="Piyush Agarwal"
              comments="View all 20 comments"
              postTime="4 hours ago"
            />
            {/* Add more cards here */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

