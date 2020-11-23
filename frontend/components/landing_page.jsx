import React from 'react';
import { Link } from 'react-router';

const LandingPage = () => (
  <div>
    <div className="landing-header">
      <div className="header-left">
        <img className="logo" src="https://res.cloudinary.com/dq5kxnx9d/image/upload/e_grayscale,o_63,r_5/v1490316135/logo_o2ibft.png" alt="logo"/>
        <h1>NEVERNOTE</h1>
      </div>
      <nav className="landing-nav">
        <Link to="/login"><p>Sign In</p></Link>
        <Link to="/signup"><p>Create account</p></Link>
      </nav>
    </div>

    <section className="main-video">
      <div className="video-frame">
        <video autoPlay="autoplay" loop="loop" poster="https://cdn1.evernote.com/evernote.com/img/homepage/homepage-hero-video-desktop-still.jpg">
          <source className="webm" type="video/webm" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.webm" />
          <source className="mp4" type="video/mp4" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.mp4" />
        </video>
      </div>
    </section>

    <section className="middle-text">
      <h2>Never Forget Anything</h2>
      <h3>Because elephants don't so<br/>you shouldn't either.</h3>

      <Link to="/login"><button className="landing-button white">LOG IN</button></Link>
      <p>or</p>
      <Link to="/signup"><button className="landing-button green">SIGN UP FOR FREE</button></Link>
    </section>

  </div>
);

export default LandingPage;
