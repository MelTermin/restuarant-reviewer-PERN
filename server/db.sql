CREATE TABLE restuarants(
  id serial not null primary key,
  name varchar(100) not null,
  location varchar(100) not null,
  price_range int not null check(price_range>=1 and price_range<=5)
);


CREATE TABLE reviews(
  id serial not null primary key,
  restuarant_id serial not null references restuarants (id),
  name varchar(100) not null,
  review text not null,
  rating int not null check(rating>=1 and rating<=5)
);
