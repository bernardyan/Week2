-- admin users for managing title
CREATE TABLE users (
  id integer PRIMARY KEY,
  username varchar(25) UNIQUE NOT NULL,
  created_on timestamp NOT NULL
             DEFAULT CURRENT_TIMESTAMP,
  last_login timestamp NOT NULL
             DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE movies (
  id integer PRIMARY KEY,
  title varchar(100) NOT NULL,
  description text NOT NULL,
  created_by integer NOT NULL,
  created_on timestamp NOT NULL 
             DEFAULT CURRENT_TIMESTAMP
);

-- Streaming service name aka platform
CREATE TABLE platform (
  id integer PRIMARY KEY,
  service varchar(100) NOT NULL
);

-- Which movie is available on which platform
CREATE TABLE movies_platforms (
  movie_id integer NOT NULL,
  platform_id integer NOT NULL
);

