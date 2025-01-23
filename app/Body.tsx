import React from 'react';
import { CSSProperties } from 'react';

const styles: {
  bodyContainer: CSSProperties;
  header: CSSProperties;
  section: CSSProperties;
  prong: CSSProperties;
} = {
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#001b1f', // Dark background
    color: '#00ff00', // Space green
    fontFamily: "'Press Start 2P', monospace", // Retro video game font
    textAlign: 'center',
    height: '100vh',
  },
  header: {
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
    border: '2px solid #00ff00', // Space green border
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#002a30', // Slightly lighter dark background
  },
  prong: {
    backgroundColor: '#004040', // Dark green
    color: '#ffffff', // White text
    padding: '10px',
    marginBottom: '10px',
    border: '2px solid #00ff00', // Space green border
    borderRadius: '10px',
  },
};

const Body = () => {
  return (
    <div style={styles.bodyContainer}>
      <div className="body-container">
        <div style={styles.header}>
          <h1>Welcome to the Data Science Club!</h1>
          <p>
            Exploring the versatile, ever-evolving field of data science through
            collaborative learning, real-world projects, and industry
            connections.
          </p>
        </div>
        <div className="content">
          <section style={styles.section}>
            <h2>What is Data Science?</h2>
            <p>
              Data science is a growing field that involves using analytical
              methods to extract insights from data sets. At its core, data
              science is about taking raw data and turning it into actionable
              information.
            </p>
          </section>
          <section style={styles.section}>
            <h2>Why is Data Science Important?</h2>
            <p>
              In today’s data-driven world, skills in data science are becoming
              increasingly valuable in order to make data-driven decisions in
              all fields ranging from finance to healthcare.
            </p>
          </section>
          <section style={styles.section}>
            <h2>Curriculum</h2>
            <div className="prongs">
              <div style={styles.prong}>
                <h3>Prong 1: Excel</h3>
                <p>
                  The Excel section of our curriculum provides an introduction
                  to data science, where we will cover the basics including
                  simple data tables and data visualization.
                </p>
              </div>
              <div style={styles.prong}>
                <h3>Prong 2: SQL and R</h3>
                <p>
                  In the SQL and R section, members will dive deeper into the
                  labyrinth of data science, learning to use tools such as SQL
                  and R to query, manipulate, and analyze data.
                </p>
              </div>
              <div style={styles.prong}>
                <h3>Prong 3: Capstone Project</h3>
                <p>
                  The capstone project is where members will analyze case
                  studies using industry-standard tools like Tableau and Jupyter
                  Notebooks. Through creating interactive dashboards and
                  visualizations, members will learn to make data-driven
                  decisions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Body;