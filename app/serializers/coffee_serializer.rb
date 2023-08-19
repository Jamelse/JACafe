class CoffeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image, :description, :calories, :hot
  has_one :coffee_detail
end
