class CreateWidgets < ActiveRecord::Migration[5.2]
  def change
    create_table :widgets do |t|
      t.integer :quantity

      t.string :size
      t.string :thickness
      t.string :color

      t.timestamps
    end
  end
end
