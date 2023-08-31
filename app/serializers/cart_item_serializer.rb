class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :item_price, :item_summary, :order_id
  belongs_to :coffee
  
  
  def item_summary
    coffee = self.object.coffee
    {
      id: coffee.id,
      name: coffee.name,
      image: coffee.image,
      description: coffee.description
    }
  end

  def item_price
    self.object.coffee.price
  end
end
