# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

 User.create(
  first_name: 'Admin',
  last_name: 'Account',
  email: 'admin@jacafe.com',
  password: '123',
  password_confirmation: '123',
  isAdmin: true
);



User.create(
  first_name: 'Customer',
  last_name: 'User',
  email: 'user@jacafe.com',
  password: '123',
  password_confirmation: '123',
  isAdmin: false
)

Coffee.create!([
  {
    name: 'Caffè Latte',
    price: 4.79,
    image: 'https://www.foodandwine.com/thmb/CCe2JUHfjCQ44L0YTbCu97ukUzA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Latte-FT-BLOG0523-09569880de524fe487831d95184495cc.jpg',
    description: 'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up.',
    calories: 190,
    hot: true
  }
])

CoffeeDetail.create(
  coffee_id: 1,
  espresso_shots: 1,
  milk: '2%',
  syrup: '',
  syrup_pumps: 0
)