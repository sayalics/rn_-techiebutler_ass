import React, { memo, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FlatList, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook from React Navigation
import { styles } from "./styles";

const PostList = memo((props) => {
  const [postData, setPostData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    setIsLoading(true);
    let config = {
      method: "get",
      url: `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setPostData((prevData) => [...prevData, ...response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
  };

  const navigation = useNavigation(); // Get navigation object

  const navigateToDetails = useCallback((postId) => {
    navigation.navigate("PostDetails", { postId:postId }); // Navigate to details screen with postId as parameter
  }, []);

  const heavyComputation = useMemo(() => {
    return (item) => {
      const startTime = performance.now(); // Measure start time
      // Simulate heavy computation with a delay
      const result = `${item.title}...`; // Example heavy computation
      const endTime = performance.now(); // Measure end time
      console.log(`Heavy computation time for item ${item.id + " " +result}: ${endTime - startTime} milliseconds`);
    };
  }, []);

  const PostItem = React.memo(({ item }) => {
    const handlePress = () => {
      console.log("item.........",item.id)
      navigateToDetails(item.id); // Navigate to details screen when pressed
    };

    heavyComputation(item); // Compute heavy details

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.itemContainer}>
          <View style={styles.idView}>
            <Text style={styles.id}>{item.id}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={2} style={styles.description}>
              {item.body}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  const renderItem = ({ item }) => {
    return <PostItem item={item} />;
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  const onEndReachedCalledDuringMomentum = useRef(true);

  const loadMoreData = ({ distanceFromEnd }) => {
    if (!onEndReachedCalledDuringMomentum.current) {
      setPage((prevPage) => prevPage + 1);
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
        ListFooterComponent={renderFooter}
        maxToRenderPerBatch={10}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </View>
  );
});

export default PostList;
