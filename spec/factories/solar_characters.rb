# frozen_string_literal: true

FactoryBot.define do
  factory :solar_character, parent: :character, class: 'SolarCharacter' do
    type { 'SolarCharacter' }
    caste { 'dawn' }
    caste_abilities { %w[ awareness brawl dodge resistance war ] }
    favored_abilities { %w[ bureaucracy ride sail socialize survival] }
    supernal_ability { 'war' }
    anima_level { 1 }
  end
end
