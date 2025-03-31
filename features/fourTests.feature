Feature: User signup functionality

  Scenario: User signs up with valid details
    Given the user is on the signup page
    When the user enters a valid username, email, and password
    And clicks the "Signup" button
    Then the user should be redirected to the account page
    And the user should see a welcome message

  # Scenario: User logs in with valid credentials
  #   Given the user is on the login page
  #   When the user enters a valid username and password
  #   And clicks the "Login" button
  #   Then the user should be redirected to the homepage
  #   And the user should see and click the logout button

  # Scenario: User adds a product to the cart
  #   Given the user is on the homepage
  #   When the user selects a product
  #   And clicks the "Add to cart" button
  #   Then the product should be added to the cart

  # Scenario: User completes a purchase
  #   Given the user has added a product to the cart
  #   When the user clicks on the "View Cart" button
  #   And clicks the "Proceed to Checkout" button
  #   Then the user should be on the checkout page
  #   And the total price should be displayed correctly