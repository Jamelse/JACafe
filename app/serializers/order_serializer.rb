class OrderSerializer < ActiveModel::Serializer
  attributes :id, :date, :total, :status
  has_one :cart
  belongs_to :user, serializer: UserOrderSerializer
end
