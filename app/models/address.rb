# == Schema Information
#
# Table name: addresses
#
#  id         :bigint(8)        not null, primary key
#  email      :string
#  first_name :string
#  last_name  :string
#  address1   :string
#  address2   :string
#  company    :string
#  city       :string
#  state      :string
#  country    :string
#  zip        :string
#  default    :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Address < ApplicationRecord
  validates_presence_of :first_name, :last_name, :address1, :city, :state, :zip

  # EMAIL_REGEX taken from
  # http://api.rubyonrails.org/classes/ActiveModel/Validations/ClassMethods.html#method-i-validates
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  validates :email, presence: true, format: {with: EMAIL_REGEX}

  validates_presence_of :address1, :city, :state, :zip
end
