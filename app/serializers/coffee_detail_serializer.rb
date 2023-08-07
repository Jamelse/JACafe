class CoffeeDetailSerializer < ActiveModel::Serializer
  attributes :id, :coffee_id, :size, :espresso_shots, :milk, :syrup, :syrup_pumps
end
