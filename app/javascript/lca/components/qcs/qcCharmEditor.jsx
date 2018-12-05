// @flow
import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import QcCharmFields from './qcCharmFields.jsx'

import { createQcCharm, destroyQcCharm, updateQcCharm } from 'ducks/actions.js'
import { getCharmsForQc } from 'selectors'
import type { fullQc, QcCharm, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  qc: fullQc,
}
type Props = ExposedProps & {
  qc_charms: Array<QcCharm>,
  updateQcCharm: Function,
  createQcCharm: Function,
  destroyQcCharm: Function,
}

class QcCharmEditor extends React.Component<Props> {
  handleChange = (id, trait, value) => {
    this.props.updateQcCharm(id, this.props.qc.id, trait, value)
  }

  handleAdd = () => {
    this.props.createQcCharm(this.props.qc.id)
  }

  handleRemove = id => {
    this.props.destroyQcCharm(id, this.props.qc.id)
  }
  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcCharms = this.props.qc_charms.map(charm => (
      <QcCharmFields
        key={charm.id}
        charm={charm}
        qc={this.props.qc}
        onCharmChange={handleChange}
        onRemoveClick={handleRemove}
      />
    ))

    return (
      <div>
        <Typography variant="title">
          Charms
          <Button onClick={handleAdd}>
            Add Charm
            <ContentAddCircle />
          </Button>
        </Typography>

        {qcCharms}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const qc = ownProps.qc
  let qc_charms = qc !== undefined ? getCharmsForQc(state, qc.id) : []

  return {
    qc_charms,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  {
    updateQcCharm,
    createQcCharm,
    destroyQcCharm,
  }
)

export default enhance(QcCharmEditor)
