# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
  validates :name, presence: true
  validates :author, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: User

  has_many :taggings

  has_many :notes,
    through: :taggings,
    source: :note
end
