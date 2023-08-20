class CartItem < ApplicationRecord
  belongs_to :cart, optional: true
  belongs_to :coffee
  belongs_to :order, optional: true

  validates :quantity, presence: true

  def total_cost
    self.coffee.price * self.quantity
  end

end
