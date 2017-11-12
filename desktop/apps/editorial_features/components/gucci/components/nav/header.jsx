import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { PartnerInline } from '../partner/partner_inline.jsx'
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'
import Icon from '@artsy/reaction-force/dist/Components/Icon'

export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    onOpenMenu: PropTypes.any,
    partner_logo: PropTypes.string,
    partner_url: PropTypes.string
  }

  render () {
    const {
      title,
      isMobile,
      isOpen,
      onOpenMenu,
      partner_logo,
      partner_url
    } = this.props

    return (
      <HeaderMain className='Header'>
        <PartnerInline
          url={partner_url}
          logo={partner_logo}
        />

        {/* Gucci Tracking Pixel */}
        <a href={`https://ad.doubleclick.net/ddm/jump/N32001.3019648ARTSY/B20483079.208849246;sz=1x1;ord${moment().unix()}=?`}>
          <img
            src={`https://ad.doubleclick.net/ddm/ad/N32001.3019648ARTSY/B20483079.208849246;sz=1x1;ord=${moment().unix()};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?`}
            border='0'
            width='1'
            height='1'
            alt='Advertisement'
          />
        </a>

        {!isMobile &&
          <div className='title'>
            {title}
          </div>
        }

        {!isMobile &&
          <div className='menu'>
            <a href='/articles'>
              Back to Editorial
            </a>
          </div>
        }

        {isMobile && onOpenMenu &&
          <div className='menu' onClick={onOpenMenu}>
            <Icon
              name={isOpen ? 'close' : 'list'}
              color='black'
              fontSize={isOpen ? '35px' : '40px'}
            />
          </div>
        }

      </HeaderMain>
    )
  }
}

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .PartnerInline {
    flex: 1;
  }
  .title {
    flex: 2;
    text-align: center;
    font-size: 23px;
    text-transform: uppercase;
    height: 23px;
  }
  .menu {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    a {
      ${Fonts.unica('s16', 'medium')}
      text-decoration: none;
      border-bottom: 2px solid;
    }
  }
  ${pMedia.sm`
    .title {
      display: none;
    }
  `}
`
