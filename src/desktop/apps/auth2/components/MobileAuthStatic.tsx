import React from 'react'
import styled from 'styled-components'
import Colors from '@artsy/reaction/dist/Assets/Colors'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/FormSwitcher'
import { handleSubmit } from '../helpers'
import {
  ModalType,
  ModalOptions,
} from '@artsy/reaction/dist/Components/Authentication/Types'

interface Props {
  type: string
  subtitle?: string
  options: ModalOptions
}

export class MobileAuthStatic extends React.Component<Props> {
  render() {
    return (
      <AuthFormContainer>
        <MobileContainer>
          <FormSwitcher
            {...this.props}
            type={this.props.type as ModalType}
            isMobile
            isStatic
            handleSubmit={handleSubmit.bind(
              this,
              this.props.type,
              this.props.options
            )}
          />
        </MobileContainer>
      </AuthFormContainer>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
`

const MobileContainer = styled.div`
  border: 1px solid ${Colors.grayRegular};
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  align-self: center;
  justify-content: center;

  form {
    width: 100%;
  }
`
