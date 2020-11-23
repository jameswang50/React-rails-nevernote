# == Schema Information
#
# Table name: notebooks
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: User

  has_many :notes
end
