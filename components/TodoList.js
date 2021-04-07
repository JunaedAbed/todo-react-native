import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "./Colors";

const TodoList = ({ list }) => {
  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View style={[styles.listContainer, { backgroundColor: list.color }]}>
      <Text style={styles.listTitle} numberOfLines={1}>
        {list.name}
      </Text>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.count}>{remainingCount}</Text>
        <Text style={styles.subtitle}>Remaining</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.count}>{completedCount}</Text>
        <Text style={styles.subtitle}>Done</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.darkBlue,
    marginBottom: 18,
  },
  count: {
    fontSize: 35,
    fontWeight: "200",
    color: colors.black,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "100",
    color: colors.black,
  },
});

export default TodoList;
