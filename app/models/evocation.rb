# frozen_string_literal: true

# Evocations.  Rules found starting at p.611 of Core, and in Arms
class Evocation < Charm
  attribute :name, :string, default: 'New Evocation'

  def entity_assoc
    'evocation'
  end
end
