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

require 'test_helper'

class ShortcutTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
