class CoffeeDetailSerializer < ActiveModel::Serializer
  attributes :id, :coffee_id, :espresso_shots, :milk, :syrup, :syrup_pumps
end
