class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :item_summary, :total_cost
  belongs_to :coffee

  def total_cost
    self.object.coffee.price * self.object.quantity
  end

  def item_summary
    coffee = self.object.coffee
    {
      id: coffee.id,
      name: coffee.name,
      image: coffee.image,
      description: coffee.description
    }
  end
end
