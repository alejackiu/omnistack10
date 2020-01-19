import React from 'react';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const gitHubUsername = navigation.getParam('github_username');

    const uri = `http://www.github.com/${gitHubUsername}`;

    return <WebView style={{ flex: 1}} source={{ uri: uri }} />;
}

export default Profile;