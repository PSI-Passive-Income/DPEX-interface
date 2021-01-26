import { stringify } from 'qs'
import React, { useContext, useMemo } from 'react'
import { useLocation } from 'react-router'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import useParsedQueryString from '../../hooks/useParsedQueryString'

import { StyledInternalLink } from '../../theme'
import { YellowCard } from '../Card'
import { AutoColumn } from '../Column'

function VersionLinkContainer({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext)

  return (
    <YellowCard style={{ marginTop: '12px', padding: '0.5rem 0.5rem' }}>
      <AutoColumn gap="sm" justify="center" style={{ alignItems: 'center', textAlign: 'center' }}>
        <Text lineHeight="145.23%;" fontSize={14} fontWeight={400} color={theme.text1}>
          {children}
        </Text>
      </AutoColumn>
    </YellowCard>
  )
}

export default function BetterTradeLink() {
  const location = useLocation()
  const search = useParsedQueryString()

  const linkDestination = useMemo(() => {
    return {
      ...location,
      search: `?${stringify({
        ...search,
        use: 'V2'
      })}`
    }
  }, [location, search])

  return (
    <VersionLinkContainer>
      There is a better price for this trade on{' '}
      <StyledInternalLink to={linkDestination}>
        <b>Uniswap V2 ↗</b>
      </StyledInternalLink>
    </VersionLinkContainer>
  )
}

export function DefaultVersionLink() {
  const location = useLocation()
  const search = useParsedQueryString()

  const linkDestination = useMemo(() => {
    return {
      ...location,
      search: `?${stringify({
        ...search,
        use: 'V2'
      })}`
    }
  }, [location, search])

  return (
    <VersionLinkContainer>
      Showing V2 price.{' '}
      <StyledInternalLink to={linkDestination}>
        <b>Switch to Uniswap V2 ↗</b>
      </StyledInternalLink>
    </VersionLinkContainer>
  )
}
