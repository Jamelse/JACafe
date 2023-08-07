class CreateCoffeeDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :coffee_details do |t|
      t.integer :coffee_id
      t.string :size
      t.integer :espresso_shots
      t.string :milk
      t.string :syrup
      t.integer :syrup_pumps

      t.timestamps
    end
  end
end
