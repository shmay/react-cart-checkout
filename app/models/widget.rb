# frozen_string_literal: true

class Widget < ApplicationRecord
  PRICE_CENTS = 10000 # $100

  COLORS = [
    'blue',
    'yellow',
    'red'
  ].freeze

  SIZES = ['12px', '15px', '20px'].freeze

  THICKNESS = ['solid', 'regular', 'thin'].freeze
end
