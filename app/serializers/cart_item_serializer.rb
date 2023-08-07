class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  belongs_to :coffee
end
