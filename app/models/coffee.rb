class Coffee < ApplicationRecord
  has_one :coffee_detail
  has_many :cart_items, dependant: :destroy
end
