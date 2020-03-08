INSERT INTO users
(id, username, email, password)
VALUES
(1, 'byan', 'test@me.com', 'pass'),
(2, 'otherguy', 'test1@me.com', 'pass2');

INSERT INTO movies (id, title, description, created_by) VALUES
(1, 'Tony Story 4', 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.', 1),
(2, 'Avengers: End Game','After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.', 2),
(3, 'Avengers: Infinity War', 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.', 2),
(4, 'Avengers', 'Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', 1);


INSERT INTO platform (id, service) VALUES
(1, 'Disney+'),
(2, 'Netflix'),
(3, 'Apple TV+'),
(4, 'Hulu');

INSERT INTO movies_platforms
(movie_id, platform_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (4, 2);

