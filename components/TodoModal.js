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
  Animated,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "./Colors";

export default class TodoModal extends Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    if (this.state.newTodo != "") {
      let list = this.props.list;
      list.todos.push({ title: this.state.newTodo, completed: false });

      this.props.updateList(list);
      this.setState({ newTodo: "" });
    }
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
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

        <View style={{ left: 320, position: "absolute" }}>
          <TouchableOpacity onPress={() => this.deleteTodo(index)}>
            <Ionicons
              name="close-outline"
              size={22}
              style={{ width: 32, color: colors.grey }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ android: undefined, ios: "padding" })}
      >
        <SafeAreaView
          style={[styles.container, { backgroundColor: list.color }]}
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
              { borderBottomColor: colors.black, borderBottomRightRadius: 0 },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks done
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 30,
                paddingVertical: 24,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: colors.black }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: colors.black }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    paddingRight: 20,
    flexShrink: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 0.75,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    paddingLeft: 30,
  },
  taskCount: {
    color: colors.darkBlue,
    marginTop: 4,
    marginBottom: 16,
    fontWeight: "normal",
    paddingLeft: 30,
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
