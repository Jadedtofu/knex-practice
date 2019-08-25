BEGIN;

INSERT INTO blogful_articles 
    (title, date_published, content)
VALUES
('A King''s Daily Life',    now() - '21 days'::INTERVAL, 'Details about the daily life of King Gilgamesh'),
('Clay Departure',          now() - '20 days'::INTERVAL, 'A short summary about Enkidu'),
('Dumplings From Scratch',  now() - '20 days'::INTERVAL, 'A simple guide on how to make dumplings from scratch'),
('Zuppa Toscana',           now() - '19 days'::INTERVAL, 'Super home-made version of a delicious wedding soup'),
('Tomato Soup',             now() - '19 days'::INTERVAL, 'Easy tomato soup with onion and basil'),
('Comfort Sweets',          now() - '18 days'::INTERVAL, 'Everything from Rice Krispies to Snickerdoodles'),
('Best Breakfast',          now() - '17 days'::INTERVAL, 'Breakfast sunrise and croissants'),
('Upsidedown Pyramid',      now() - '16 days'::INTERVAL, 'A glimpse into King Ozymandias''s life'),
('Detective Consultant',    now() - '15 days'::INTERVAL, 'Reminisce about the life of Sherlock Holmes'),
('Sweet Wines',             now() - '15 days'::INTERVAL, 'Brief discussions about dessert wines'),
('My Favorite Mix',         now() - '14 days'::INTERVAL, 'Exploring easy-to-make cocktails'),
('Thighs or Breast',        now() - '12 days'::INTERVAL, 'Counting calories and comparing each'),
('Ice Cream or Bar',        now() - '10 days'::INTERVAL, 'When the craving hits, what do you like to eat?'),
('My Life as Queen',        now() - '7 days'::INTERVAL, 'An interview with Cleopatra'),
('Candies for Demons',      now() - '5 days'::INTERVAL, 'Delicacies for Banana'),
('Bunnies Everywhere' ,     now() - '5 days'::INTERVAL, 'Men dressed in bunny casino service outfits too!'),
('Abs or Butts',            now() - '3 days'::INTERVAL, 'Do you like the front or the back?'),
('Cotton or Hard',         now() - '2 days'::INTERVAL, 'Playing with melting sugar'),
('Donating Hair',           now() - '10 hours'::INTERVAL, 'Where and how to best donate your hair'),
('Sleeping Right',          now() - '8 hours'::INTERVAL, 'Notes about how to get the best rest');

COMMIT;