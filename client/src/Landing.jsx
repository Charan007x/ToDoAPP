import React from 'react';
import { Link } from 'react-router-dom';
import Hyperspeed from './Hyperspeed';
import Navbar from './Navbar';
import './Landing.css';

function Landing() {
  return (
    <>
      <div className="landing">
        <Navbar />
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x0f0f0f,
              islandColor: 0x080808,
              background: 0x000000,
              shoulderLines: 0x00ffff,
              brokenLines: 0xff00ff,
              leftCars: [0xff00ff, 0xff006f, 0xff1493],
              rightCars: [0x00ffff, 0x00bfff, 0x1e90ff],
              sticks: 0x00ff00
            }
          }}
        />
        <div className="hero-content">
          <h1 className="hero-title">TodoApp</h1>
          {/* <p className="hero-subtitle">Organize your life in neon style</p> */}
          {/* <div className="scroll-indicator">
            <span>Scroll Down</span>
            <div className="arrow-down">↓</div>
          </div> */}
        </div>
      </div>

      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose TodoApp?</h2>
          <p className="features-subtitle">Powerful features to supercharge your productivity</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Create and manage tasks in milliseconds. No lag, no waiting.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and protected. Only you have access.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Cloud Synced</h3>
              <p>Access your todos from anywhere, anytime, on any device.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Neon aesthetic meets modern UI. A pleasure to use every day.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Visual stats and insights to keep you motivated and on track.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Always Free</h3>
              <p>Full features, zero cost. No premium plans, no hidden fees.</p>
            </div>
          </div>

          <div className="cta-section">
            <h2>Ready to Get Organized?</h2>
            <p>Join thousands of users achieving their goals</p>
            <Link to="/register" className="cta-button-large">Start Now - It's Free</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;