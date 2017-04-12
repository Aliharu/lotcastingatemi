# frozen_string_literal: true

class Chronicle < ApplicationRecord
  belongs_to :st, class_name: 'Player'

  has_many :characters
  has_many :qcs

  has_many :chronicle_players
  has_many :players, through: :chronicle_players
end
