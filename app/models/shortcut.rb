# == Schema Information
#
# Table name: shortcuts
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  route      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Shortcut < ApplicationRecord
  validates :name, presence: true
  validates :route, presence: true
  validates :author, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: User
end
