class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.integer :cart_id
      t.integer :order_id
      t.integer :coffee_id
      t.integer :quantity
      t.timestamps
    end
  end
end
