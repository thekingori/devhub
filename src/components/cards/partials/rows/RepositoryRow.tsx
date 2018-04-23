import React, { SFC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'

import Avatar from '../../../common/Avatar'
import cardStyles from '../../styles'
import { getRepositoryPressHandler } from './helpers'
import rowStyles from './styles'

export interface RepositoryRowProperties {
  isForcePush?: boolean
  isFork?: boolean
  isPush?: boolean
  isRead: boolean
  ownerName: string
  repositoryName: string
  showMoreItemsIndicator?: boolean
}

export interface RepositoryRowState {}

const RepositoryRow: SFC<RepositoryRowProperties> = ({
  isForcePush,
  isFork,
  isPush,
  isRead,
  ownerName,
  repositoryName,
  showMoreItemsIndicator,
}) => {
  const repoIcon =
    (isForcePush && 'repo-force-push') ||
    (isPush && 'repo-push') ||
    (isFork && 'repo-forked') ||
    'repo'

  return (
    <View style={rowStyles.container}>
      <View style={cardStyles.leftColumn}>
        <Avatar
          isBot={Boolean(ownerName && ownerName.indexOf('[bot]') >= 0)}
          linkURL=""
          small
          style={cardStyles.avatar}
          username={ownerName}
        />
      </View>

      <View style={cardStyles.rightColumn}>
        <TouchableOpacity
          onPress={
            showMoreItemsIndicator
              ? undefined
              : getRepositoryPressHandler(ownerName, repositoryName)
          }
          style={rowStyles.mainContentContainer}
        >
          <Text
            numberOfLines={1}
            style={[cardStyles.normalText, isRead && cardStyles.mutedText]}
          >
            <Icon name={repoIcon} />{' '}
            <Text
              style={[rowStyles.repositoryText, isRead && cardStyles.mutedText]}
            >
              {showMoreItemsIndicator ? '' : repositoryName}
            </Text>
            <Text
              style={[
                rowStyles.repositorySecondaryText,
                (isRead || showMoreItemsIndicator) && cardStyles.mutedText,
              ]}
            >
              {showMoreItemsIndicator ? '...' : ` ${ownerName}`}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RepositoryRow
