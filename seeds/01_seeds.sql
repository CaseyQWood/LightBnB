INSERT INTO users (name, email, password)
VALUES ('Casey', 'cwood1@gmail.com', $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.),
('Brandon', 'barndon99@gmail.com', $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.),
('Mingfeng', 'feng@gmail.com' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,
 number_of_bedrooms, country, street, city, active, )
VALUES (1, '2 bedroom', 'its a laneway', 'https://fakeURLthumb.com', 'https://fakeURLcover.com', 55, 2, 3, 2, 'canada',
 'fake Ave', 'Vancouver', 'BC', '2v41p6',),
(2, '3 bedroom', 'bungalo', 'https://fakeURLthumb.com', 'https://fakeURLcover.com', 75, 4, 2, 1, 'canada',
 'morefake Ave', 'Vancouver', 'BC', '2v69v6',),
(3, '2 bedroom', 'mansion', 'https://fakeURLthumb.com', 'https://fakeURLcover.com', 100, 1, 2, 4, 'canada',
 'lessfake Ave', 'Vancouver', 'BC', '2p56k6',);

INSERT INTO property_reviews (reservation_id, property_id, rating, message)
VALUES (1, 1, 5, 'twas good'),
(2, 2, 5, 'twas great'),
(3, 3, 5, 'twas awesome');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');






