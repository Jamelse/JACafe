class Cart < ApplicationRecord
  belongs_to :order, optional: true
  has_many :cart_items, dependent: :destroy
  has_many :coffees, through: :cart_items
end
