# frozen_string_literal: true

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
