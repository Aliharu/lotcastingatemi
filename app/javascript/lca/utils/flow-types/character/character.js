// @flow

import type {
  withBasicInfo,
  withCombatInfo,
  withHealthLevels,
  withIntimacies,
  withMotePool,
  withWillpower,
} from '../shared.js'

export type withAttributes = {
  attr_strength: number,
  attr_dexterity: number,
  attr_stamina: number,
  attr_charisma: number,
  attr_manipulation: number,
  attr_appearance: number,
  attr_perception: number,
  attr_intelligence: number,
  attr_wits: number,
}

export type withAbilities = {
  abil_archery: number,
  abil_athletics: number,
  abil_awareness: number,
  abil_brawl: number,
  abil_bureaucracy: number,
  abil_dodge: number,
  abil_integrity: number,
  abil_investigation: number,
  abil_larceny: number,
  abil_linguistics: number,
  abil_lore: number,
  abil_medicine: number,
  abil_melee: number,
  abil_occult: number,
  abil_performance: number,
  abil_presence: number,
  abil_resistance: number,
  abil_ride: number,
  abil_sail: number,
  abil_socialize: number,
  abil_stealth: number,
  abil_survival: number,
  abil_thrown: number,
  abil_war: number,
  abil_martial_arts: Array<{ style: string, rating: number }>,
  abil_craft: Array<{ craft: string, rating: number }>,
}

export type withArmorStats = {
  armor_name: string,
  armor_weight: 'unarmored' | 'light' | 'medium' | 'heavy',
  armor_is_artifact: boolean,
  armor_tags: Array<string>,
  bonus_soak: number,
  bonus_hardness: number,
  bonus_mobility_penalty: number,
}

export type specialty = {
  ability: string,
  context: string,
}
export type withSpecialties = {
  specialties: Array<specialty>,
}

export type xpLog = {
  label: string,
  points: number,
}

export type form = {
  form: string,
  qc_id: number,
}

export type Character = {
  caste: string,
  aspect: ?boolean,
  aura: string,
  type: string,
  exalt_type: string,
  excellency: string,
  excellency_stunt: string,
  excellencies_for: Array<string>,
  is_sorcerer: boolean,
  sorcererous_motes: number,
  caste_abilities?: Array<string>,
  favored_abilities: Array<string>,
  caste_attributes: Array<string>,
  favored_attributes: Array<string>,
  supernal_ability: string,
  totem: string,
  tell: string,
  forms: Array<form>,
  sorcerous_motes: number,
  rituals: Array<string>,
  native_language: string,
  lore_background: string,
  portrait_link: string,
  notes: string,
  equipment: string,
  xp_total: number,
  xp_solar_total: number,
  xp_craft_silver: number,
  xp_craft_gold: number,
  xp_craft_white: number,
  xp_log: Array<xpLog>,
  xp_log_solar: Array<xpLog>,
  bp_log: Array<xpLog>,
  limit: number,
  limit_trigger: string,
  resources: Array<{ resource: string, value: number }>,
  weapons: Array<number>,
  merits: Array<number>,
  charms: Array<number>,
  evocations: Array<number>,
  martial_arts_charms: Array<number>,
  spirit_charms: Array<number>,
  spells: Array<number>,
} & withBasicInfo &
  withMotePool &
  withWillpower &
  withHealthLevels &
  withCombatInfo &
  withAttributes &
  withAbilities &
  withSpecialties &
  withArmorStats &
  withIntimacies
