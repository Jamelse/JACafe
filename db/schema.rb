# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_07_035158) do
  create_table "cart_items", force: :cascade do |t|
    t.integer "cart_id"
    t.integer "order_id"
    t.integer "coffee_id"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coffee_details", force: :cascade do |t|
    t.integer "coffee_id"
    t.integer "espresso_shots"
    t.string "milk"
    t.string "syrup"
    t.integer "syrup_pumps"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coffees", force: :cascade do |t|
    t.string "name"
    t.decimal "price"
    t.string "image"
    t.string "description"
    t.integer "calories"
    t.boolean "hot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id"
    t.date "date"
    t.decimal "total"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.boolean "isAdmin", default: false
    t.text "stripe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
