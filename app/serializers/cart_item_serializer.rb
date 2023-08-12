class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :total_cost, :item_summary
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
end
