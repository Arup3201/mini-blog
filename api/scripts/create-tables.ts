// Script to create the necessary models in the database with their columns

import DB from "../db";

// users table
DB.query(
  `CREATE TABLE users(
    id VARCHAR(150) PRIMARY KEY, 
    created_at TIMESTAMP WITH TIME ZONE, 
    username VARCHAR(150) NOT NULL, 
    email VARCHAR(150) NOT NULL, 
    password VARCHAR(150) NOT NULL, 

    UNIQUE (username, email)
  )`,
  (err) => {
    if (err) {
      DB.end(); // release all the clients that are still connected
      console.error(
        `Error: while creating users table, error occured - ${err.message}`
      );
      return;
    }

    DB.query("COMMIT", (err) => {
      if (err) {
        DB.end(); // release all the clients that are still connected
        console.error(
          `Error: while creating posts table, error occured - ${err.message}`
        );
        return;
      }

      // posts table
      DB.query(
        `CREATE TABLE posts(
          id VARCHAR(150) PRIMARY KEY, 
          created_at TIMESTAMP WITH TIME ZONE, 
          title VARCHAR(150) NOT NULL, 
          body VARCHAR(150) NOT NULL, 
          author VARCHAR(150) REFERENCES users(id)
        )`,
        (err) => {
          if (err) {
            DB.end(); // release all the clients that are still connected
            console.error(
              `Error: while creating posts table, error occured - ${err.message}`
            );
            return;
          }

          DB.query("COMMIT", (err) => {
            if (err) {
              DB.end(); // release all the clients that are still connected
              console.error(
                `Error: while creating comments table, error occured - ${err.message}`
              );
              return;
            }

            // comments table
            DB.query(
              `CREATE TABLE comments(
                id VARCHAR(150) PRIMARY KEY, 
                created_at TIMESTAMP WITH TIME ZONE, 
                body VARCHAR(150) NOT NULL, 
                author VARCHAR(150) REFERENCES users(id), 
                post VARCHAR(150) REFERENCES posts(id)
              )`,
              (err) => {
                if (err) {
                  DB.end(); // release all the clients that are still connected
                  console.error(
                    `Error: while creating comments table, error occured - ${err.message}`
                  );
                  return;
                }

                DB.query("COMMIT", (err) => {
                  if (err) {
                    DB.end(); // release all the clients that are still connected
                    console.error(
                      `Error: while commiting create comments table, error occured - ${err.message}`
                    );
                    return;
                  }
                });
              }
            );
          });
        }
      );
    });
  }
);
