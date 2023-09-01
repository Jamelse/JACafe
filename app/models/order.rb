class Order < ApplicationRecord
  has_many :cart_items, dependent: :destroy
  belongs_to :user

  validates :date, presence: true
  validates :status, presence: true
  validates :total, presence: true, numericality:  { greater_than_or_equal_to: 0 }
end
