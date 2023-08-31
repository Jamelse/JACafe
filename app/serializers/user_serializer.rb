class UserSerializer < ActiveModel::Serializer
  attributes :id, :isAdmin, :email, :first_name, :last_name
  has_many :orders
end
