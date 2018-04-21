DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dad jokes", "humor", 3, 9999999);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tunafish sandwich", "grocery", 2, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Moccasins somene else has been walkin' in", "footwear", 1, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Last year's fruitcake", "seasonal", 3, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat videos", "Media", 1, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ether soaked rag", "pharmacy", 19, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hitchiker's Guide to the Galaxy", "Books", 42, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Man Suit", "sporting goods", 50000000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Taylor Swift tickets", "tickets", 75, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hipster boots", "clearance", 20, 7);

