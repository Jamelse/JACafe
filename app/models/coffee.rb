class Coffee < ApplicationRecord
  has_one :coffee_detail
  has_many :cart_items, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :calories, presence: true, numericality:  { greater_than_or_equal_to: 0 }
  validates :price, presence: true, numericality:  { greater_than_or_equal_to: 0 }
  validates :image, presence: true 
 
end
