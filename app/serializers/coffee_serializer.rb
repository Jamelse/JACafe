class CoffeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :hot
  has_one :coffee_detail
end
