class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :email
      t.string :first_name
      t.string :last_name

      t.string :address1
      t.string :address2
      t.string :company
      t.string :city
      t.string :state
      t.string :country
      t.string :zip

      t.boolean :default, default: false

      t.timestamps
    end
  end
end
