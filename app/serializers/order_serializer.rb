class OrderSerializer < ActiveModel::Serializer
  attributes :id, :date, :total, :status
  has_many :cart_items
  belongs_to :user, serializer: UserOrderSerializer
end
