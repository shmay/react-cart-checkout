# frozen_string_literal: true

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


class Widget < ApplicationRecord
  PRICE_CENTS = 10000 # $100

  COLORS = [
    'red',
    'green',
    'blue'
  ].freeze

  SIZES = ['80px', '100px', '120px'].freeze

  THICKNESS = ['solid', 'regular', 'light'].freeze
end
