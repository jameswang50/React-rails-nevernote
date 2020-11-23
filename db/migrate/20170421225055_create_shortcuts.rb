class CreateShortcuts < ActiveRecord::Migration[5.0]
  def change
    create_table :shortcuts do |t|
      t.string :name, null: false
      t.string :route, null: false
      t.integer :author_id, null: false

      t.timestamps
    end
    add_index :shortcuts, :name, unique: true
    add_index :shortcuts, :route, unique: true
    add_index :shortcuts, :author_id
  end
end
