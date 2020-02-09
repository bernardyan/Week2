-- display all movie info uploaded by me
SELECT title FROM movies WHERE created_by=1;

-- List all movies and their steaming platforms
SELECT title, service FROM movies m JOIN movies_platforms mp ON m.id = mp.movie_id JOIN platform p ON mp.platform_id = p.id;

-- Search on a given movie
SELECT title, service FROM movies m JOIN movies_platforms mp ON m.id = mp.movie_id JOIN platform p ON mp.platform_id = p.id where m.id=4;