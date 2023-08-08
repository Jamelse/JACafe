class CartSerializer < ActiveModel::Serializer
  attributes :id, :cart_total
  has_many :cart_items

  def cart_total 
    self.object.cart_items.collect {|item| item.total_cost}.sum
  end
end
