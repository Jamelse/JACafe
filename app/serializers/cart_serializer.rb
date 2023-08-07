class CartSerializer < ActiveModel::Serializer
  attributes :id
  has_man :cart_items
end
