// @flow
import React from 'react'
import { connect } from 'react-redux'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { canIEdit } from 'selectors'
import type { CharacterType } from './index.jsx'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  id: number,
  characterType: CharacterType,
}
type Props = ExposedProps & {
  isHidden: boolean,
  canIEdit: boolean,
  updateCharacter: Function,
  updateQc: Function,
  updateBattlegroup: Function,
}

function CardMenuHide(props: Props) {
  if (!props.canIEdit) return null

  let action
  switch (props.characterType) {
    case 'qc':
      action = props.updateQc
      break
    case 'battlegroup':
      action = props.updateBattlegroup
      break
    case 'character':
    default:
      action = props.updateCharacter
  }

  return (
    <MenuItem
      button
      onClick={() => action(props.id, { hidden: !props.isHidden })}
    >
      <ListItemIcon>
        {props.isHidden ? <Visibility /> : <VisibilityOff />}
      </ListItemIcon>
      <ListItemText
        inset
        primary={props.isHidden ? 'Unhide' : 'Hide from other players'}
      />
    </MenuItem>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  isHidden: state.entities.current[props.characterType + 's'][props.id].hidden,
  canIEdit: canIEdit(state, props.id, props.characterType),
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  {
    updateCharacter,
    updateQc,
    updateBattlegroup,
  }
)

export default enhance(CardMenuHide)
