var inquirer = require("inquirer"); // why are there 3 dots under the require?
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  listAllProducts();
});

function listAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + ". " + res[i].product_name + ". Price: $" + res[i].price + ". In Stock: " + res[i].stock_quantity + ".");
    }
    console.log("-------------------------------------------------------------------------------------------------");
  });
  purchaseProduct();
}

function purchaseProduct() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'input',
        name: 'item_id',
        message: 'Please enter the ID of the item you want to purchase.'
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many?'
      }
    ]).then(function (input) {
      connection.query('SELECT * FROM products WHERE ?', { item_id: input.item_id }, function (err, data) {
        if (err) throw err;
        if (data.length === 0) {
          console.log('Please enter a valid item ID.');
          connection.end();
          // this is is in the "then" part of the inquirer prompt so it currently takes the quantity even after not correctly accepting a valid item_id
          // also not checking if a valid quantity has been placed - will tell not enough product if you type in a character that's not a number
        } else {
          var productData = data[0];
          if (input.quantity <= productData.stock_quantity) {
            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - input.quantity) + ' WHERE item_id = ' + input.item_id;
            connection.query(updateQueryStr, function (err, data) {
              if (err) throw err;
            })
            console.log(`Your oder for $${productData.price * input.quantity} has been placed. We still have ${productData.stock_quantity - input.quantity} in stock. Thanks for shopping with Bamazon. :)`);
            console.log("-------------------------------------------------------------------------------------------------");
            connection.end();
          } else {
            console.log(`Sorry, there is not enough of that product in stock. We have ${productData.stock_quantity} of that item in stock. Please reduce the number of that item you wish to purchase.`);
            console.log("-------------------------------------------------------------------------------------------------");
            connection.end();
          }
        }
      })
    })
  });
} // end of purchase product function

