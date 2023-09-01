class CoffeeDetail < ApplicationRecord
  belongs_to :coffee

  validates :coffee_id, presence: true 
end
