import React, { memo, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";

const PostDetails = memo(() => {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const route = useRoute();
  const postId = route.params && route.params.postId !== undefined && route.params.postId;

  useEffect(() => {
    // Fetch post details when postId changes
    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  const fetchPostDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPostDetails(response.data);
      setLoading(false);
      console.log("Post details fetched:", response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setLoading(false);
    }
  }, [postId]);

  return (
    <View style={styles.container}>
      {loading ? ( // Display loading indicator while data is being fetched
        <ActivityIndicator size="large" color="#0000ff" />
      ) : postDetails ? ( // Render post details if available
        <>
          <Text style={styles.title}>{"Title: "+postDetails.title}</Text>
          <Text style={styles.description}>{"Description: "+postDetails.body.replace(/\n/g, ' ')}</Text>
        </>
      ) : (
        <Text style={styles.noDataText}>No data available</Text> // Display message if no data is available
      )}
    </View>
  );
});

export default PostDetails;
