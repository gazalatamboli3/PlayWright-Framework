Feature: Ecommerce Validations

Scenario: Adding Item to cart
  Given Login to application with "gntamboli786@gmail.com" and "Learning!1"
  When Add "zara coat 3" to cart
  Then Verify "zara coat 3" is added in cart