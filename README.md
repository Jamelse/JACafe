# JACafe

JACafe is an online coffee shop app that allows users to securely sign in and place orders. The admin is also able to change order statuses and adjust / create menu items.

## Tech Used

Back-End

- Ruby
- Rails
- ActiveRecord
- Bcrypt
- Active Model Serializers(AMS)
- Stripe

Front-End

- JavaScript
- React
- React Router
- React MUI
- Stripe API
- HTML 
- CSS

## Installation
In your terminal run: 

```sh
bundle install

# creates migrations and example seeding for menu items
rails db:migrate db:seed

# start back-end server
rails s

#install front-end dependencies
npm install --prefix-client

#start front-end server
npm start --prefix-client
```

## Features 

- ability to add items to cart, change quantity, and remove items from cart
- see newest menu items

# User
- create a user profile with a secure password
- login that persists using cookies
- ability to checkout and order
- view orders

# Admin
- create, update, and delete coffee items from the menu
- view all orders and their statuses
- update a users order status

## Video Walkthrough
[https://youtu.be/vbyR7BtXPqE](https://youtu.be/C4fu2I9Lydg)

## License
#### Copyright 2023 Jacob Amelse
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.