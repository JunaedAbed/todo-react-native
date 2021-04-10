import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./components/Colors";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import firebase from "firebase";

export default class App extends Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    fb = new Fire((error, user) => {
      if (error) {
        return alert("something went wrong");
      }

      fb.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    fb.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    fb.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    fb.updateList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.grey} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 170,
            backgroundColor: colors.grey,
          }}
        >
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{ fontWeight: "300", color: colors.seaGreen }}>
              Lists
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View
          style={[
            styles.todoDisplay,
            {
              height: 350,
              paddingLeft: 0,
            },
          ]}
        >
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>

        <View
          style={{
            marginVertical: 50,
            paddingTop: 50,
          }}
        >
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={20} color={colors.darkBlue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.black,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },

  title: {
    fontSize: 35,
    fontWeight: "700",
    paddingHorizontal: 30,
  },
  todoDisplay: {
    paddingTop: 0,
  },
  addList: {
    borderWidth: 0,
    backgroundColor: colors.grey,
    borderRadius: 50,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.grey,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 7,
  },
});
