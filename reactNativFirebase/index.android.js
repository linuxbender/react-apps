'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
import {firebaseConfig} from './bootstrap/database';
 
const firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Alert
} = ReactNative;

const firebaseApp = firebase.initializeApp(firebaseConfig);

class TodoReactNative extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Dani's List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview} />

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

  _addItem() {
    Alert.prompt(
      'Add New Item',
      null,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      Alert.alert(
        'Complete',
        null,
        [
          { text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
          { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}

AppRegistry.registerComponent('reactNativDemo', () => TodoReactNative);