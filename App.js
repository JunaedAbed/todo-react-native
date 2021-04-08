import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./components/Colors";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";

export default class App extends Component {
  state = {
    addTodoVisible: false,
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{ fontWeight: "300", color: colors.grey }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View
          style={{
            marginVertical: 50,
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
        <View style={{ height: 290, paddingLeft: 0 }}>
          <FlatList
            data={tempData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.darkPink,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    paddingHorizontal: 30,
  },
  addList: {
    borderWidth: 1,
    borderColor: colors.darkPink,
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
