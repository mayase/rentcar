class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.integer :price
      t.integer :class
      t.integer :seats
      t.integer :luggage
      t.boolean :conditioning
      t.integer :transmission
      t.date :availability_start_date
      t.date :availability_end_date

      t.timestamps
    end
  end
end
