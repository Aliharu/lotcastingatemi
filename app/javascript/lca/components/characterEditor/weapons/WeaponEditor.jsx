// @flow
import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import WeaponFields from './WeaponFields.jsx'

import BlockPaper from 'components/generic/blockPaper.jsx'
import { createWeapon, destroyWeapon, updateWeapon } from 'ducks/actions.js'
import { getWeaponsForCharacter } from 'selectors'
import type { Character, fullWeapon, Enhancer } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)
const SortableWeaponList = SortableContainer(({ items }) => <div>{items}</div>)

type ExposedProps = {
  character: Character,
}
type Props = ExposedProps & {
  weapons: Array<fullWeapon>,
  createWeapon: Function,
  updateWeapon: Function,
  destroyWeapon: Function,
}

class WeaponEditor extends React.Component<Props> {
  handleChange = (id, trait, value) => {
    if (value === 'header') return

    this.props.updateWeapon(id, this.props.character.id, trait, value)
  }

  handleAdd = () => {
    this.props.createWeapon(this.props.character.id)
  }

  handleRemove = id => {
    this.props.destroyWeapon(id, this.props.character.id)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    const weaponA = this.props.weapons[oldIndex]
    const weaponB = this.props.weapons[newIndex]
    const offset = weaponA.sort_order > weaponB.sort_order ? -1 : 1
    this.props.updateWeapon(
      weaponA.id,
      this.props.character.id,
      'sort_order',
      weaponB.sort_order + offset
    )
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this

    const weapons = this.props.weapons.map((weapon, i) => (
      <SortableItem key={weapon.id} index={i}>
        <WeaponFields
          weapon={weapon}
          character={this.props.character}
          onChange={handleChange}
          onRemoveClick={handleRemove}
        />
      </SortableItem>
    ))

    return (
      <BlockPaper>
        <Typography variant="title">
          Weapons
          <Button onClick={handleAdd}>
            Add&nbsp;
            <ContentAddCircle />
          </Button>
        </Typography>
        <SortableWeaponList
          items={weapons}
          onSortEnd={handleSort}
          useDragHandle={true}
        />
      </BlockPaper>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const character = ownProps.character
  let weapons = []

  if (character != undefined)
    weapons = getWeaponsForCharacter(state, character.id)

  return {
    weapons,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  {
    updateWeapon,
    createWeapon,
    destroyWeapon,
  }
)

export default enhance(WeaponEditor)
