class Cart < ApplicationRecord
  belongs_to :order
  has_many :cart_items, dependant: :destroy
  has_many :coffees, through: :cart_items
end
