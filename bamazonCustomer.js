var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    listAllProducts();
  });

  function listAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + ". " + res[i].product_name + ". Price: $" + res[i].price + ". In Stock: " + res[i].stock_quantity + ".");
      }
      console.log("-------------------------------------------------------------------------------------------------");
    });
    whichItemDoYouWant();
  }
  
function purchaseProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list", //was rawlist
          message: "What item would you like to buy?",
          choices: function() {
            console.log("Results length: " + results.length);
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        if (answer.quantity < chosenItem.stock_quantity) {
          console.log("Your total is $" + (answer.quantity * chosenItem.price + "."));
          console.log("==================================================================================================");
          // bid was high enough, so update db, let the user know, and start over
          // connection.query(
          //   "UPDATE products SET ? WHERE ?",
          //   [
          //     {
          //       stock_quantity: answer.quantity
          //     }
          //   ],
          //   function(error) {
          //     console.log("error checking function");
          //     console.log("Stock " + stock_quantity);
          //     if (error) throw err;
          //     console.log("Bid placed successfully!");
          //   }
          // );
        }
        else {
          console.log("Insufficient quantity. Please choose a number lower than " + (chosenItem.stock_quantity + 1));
          console.log("==================================================================================================");
        }
        whichItemDoYouWant();
      });
  });
} // end of purchase product function

function whichItemDoYouWant(){
  purchaseProduct();
}
