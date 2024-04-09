import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    itemContainer: {
      flex: 1,
      flexDirection: "row",
      marginBottom: 16,
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      elevation: 2,
      alignItems: "center",
    },
    id: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white", // Adjust color as needed
    },
    idView: {
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue",
      marginRight: 10,
    },
    textContainer: {
      flex: 1, // Take remaining space in row
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#000",
    },
    description: {
      fontSize: 16,
      color: "#000",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
    },
  });