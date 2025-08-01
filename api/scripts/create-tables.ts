// Script to create the necessary models in the database with their columns

import db from "../db";

async function createTables() {
  // users table
  try {
    await db.query(`CREATE TABLE users(
    id VARCHAR(150) PRIMARY KEY, 
    created_at TIMESTAMP WITH TIME ZONE, 
    username VARCHAR(150) NOT NULL, 
    email VARCHAR(150) NOT NULL, 
    password VARCHAR(150) NOT NULL, 

    UNIQUE (username, email)
  )`);
  } catch (err) {
    console.error("create-table error: failed to create user table");
    return;
  }

  // posts table
  try {
    await db.query(`CREATE TABLE posts(
      id VARCHAR(150) PRIMARY KEY, 
      created_at TIMESTAMP WITH TIME ZONE, 
      title VARCHAR(150) NOT NULL, 
      body TEXT NOT NULL, 
      author VARCHAR(150) REFERENCES users(id)
    )`);
  } catch (err) {
    console.error("create-table error: failed to create posts table");
    return;
  }

  // comments table
  try {
    await db.query(`CREATE TABLE comments(
      id VARCHAR(150) PRIMARY KEY, 
      created_at TIMESTAMP WITH TIME ZONE, 
      body TEXT NOT NULL, 
      author VARCHAR(150) REFERENCES users(id), 
      post VARCHAR(150) REFERENCES posts(id)
    )`);
  } catch (err) {
    console.error("create-table error: failed to create comments table");
  }
}

createTables();