class RenameClassColumn < ActiveRecord::Migration
  def change
    rename_column :cars, :class, :class_id
  end
end
