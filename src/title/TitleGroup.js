/* @flow strict-local */

import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import type { Dispatch, UserOrBot } from '../types';
import { connectFlowFixMe } from '../react-redux';
import { UserAvatarWithPresence } from '../common';
import { getRecipientsInGroupNarrow } from '../selectors';
import styles from '../styles';
import { navigateToAccountDetails } from '../nav/navActions';

type Props = $ReadOnly<{
  dispatch: Dispatch,
  recipients: UserOrBot[],
}>;

class TitleGroup extends PureComponent<Props> {
  handlePress = (user: UserOrBot) => {
    const { dispatch } = this.props;
    dispatch(navigateToAccountDetails(user.email));
  };

  styles = StyleSheet.create({
    titleAvatar: {
      marginRight: 16,
    },
  });

  render() {
    const { recipients } = this.props;
    const { width, height } = Dimensions.get('window');
    const numOfAvatar = Math.ceil(Math.max(width, height) / (32 + 16)); // ImgSize: 32, margin: 16

    return (
      <View style={styles.navWrapper}>
        {recipients.slice(0, numOfAvatar).map((user, index) => (
          <View key={user.email} style={this.styles.titleAvatar}>
            <UserAvatarWithPresence
              onPress={() => this.handlePress(user)}
              size={32}
              avatarUrl={user.avatar_url}
              email={user.email}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default connectFlowFixMe((state, props) => ({
  recipients: getRecipientsInGroupNarrow(state, props.narrow),
}))(TitleGroup);
