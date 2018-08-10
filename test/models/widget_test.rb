# == Schema Information
#
# Table name: widgets
#
#  id         :bigint(8)        not null, primary key
#  size       :string
#  thickness  :string
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class WidgetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
