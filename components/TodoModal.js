import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "./Colors";

export default class TodoModal extends Component {
  state = {
    name: this.props.list.name,
    color: this.props.list.color,
    todos: this.props.list.todos,
  };

  renderTodo = (todo) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            style={{ width: 32, color: colors.grey }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.grey : colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  render() {
    const taskCount = this.state.todos.length;
    const completedCount = this.state.todos.filter((todo) => todo.completed)
      .length;

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: this.state.color }]}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 30, right: 25, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.grey} />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            { borderBottomColor: colors.black },
          ]}
        >
          <View>
            <Text style={styles.title}>{this.state.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks done
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) => this.renderTodo(item)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 34,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <KeyboardAvoidingView
          style={[styles.section, styles.footer]}
          behavior="padding"
        >
          <TextInput style={[styles.input, { borderColor: colors.black }]} />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: colors.black }]}
          >
            <AntDesign name="plus" size={20} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  todoContainer: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "normal",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 30,
    marginRight: 0,
    borderBottomWidth: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
  },
  taskCount: {
    color: colors.darkBlue,
    marginTop: 4,
    marginBottom: 16,
    fontWeight: "normal",
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1.25,
    borderRadius: 50,
    marginRight: 14,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 50,
    padding: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
