import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../../styles/ia-style";
import { Message, Suggestion, ApiResponse } from "../../constants/interfaces";
// import { aiChannels } from "../../constants/aiChannels";
// import { aiModels } from "../../constants/aiModels";
import { suggestions } from "../../constants/suggestions";

export default function ModernChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const loadingDots = useRef(new Animated.Value(0)).current;
  const suggestionOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (messages.length > 0) {
      Animated.timing(suggestionOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(suggestionOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [messages.length]);

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingDots, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(loadingDots, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      loadingDots.setValue(0);
    }
  }, [isLoading]);

  const handleSuggestionPress = (suggestion: Suggestion) => {
    setInputText(suggestion.title);
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    console.log(inputText);
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.139.222:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputText,
        }),
      });

      if (!response.ok) throw new Error("Error en la respuesta");

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response, // Asumiendo que la API devuelve { response: "..." }
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "❌ Error al obtener la respuesta. Intenta nuevamente.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <LinearGradient
        colors={["#1a1a1a", "#2d2d2d"]}
        style={globalStyles.header}
      >
        <Text style={globalStyles.headerTitle}>
          IA Canales conversacionales
        </Text>
        <View style={globalStyles.headerControls}>
          <TouchableOpacity
            style={globalStyles.modelSelector}
            onPress={() =>
              alert(
                "Selector de modelo - Puedes implementar un modal o dropdown aquí"
              )
            }
          >
            <FontAwesome5
              name="robot"
              size={14}
              color="#4ade80"
              style={globalStyles.modelIcon}
            />
            <Text style={globalStyles.selectedModel}>GPT-4</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={globalStyles.statusContainer}>
            <View style={globalStyles.statusDot} />
            <Text style={globalStyles.statusText}>Online</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        ref={scrollViewRef}
        style={globalStyles.messagesContainer}
        contentContainerStyle={[
          globalStyles.messagesContent,
          messages.length === 0 && globalStyles.emptyMessagesContent,
        ]}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.length === 0 && (
          <Animated.View
            style={[
              globalStyles.suggestionsContainer,
              { opacity: suggestionOpacity },
            ]}
          >
            <Text style={globalStyles.suggestionsTitle}>
              ¿Qué te gustaría preguntar? 🤔
            </Text>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={globalStyles.suggestionCard}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={globalStyles.suggestionIcon}>
                  {suggestion.icon}
                </Text>
                <View style={globalStyles.suggestionTextContainer}>
                  <Text style={globalStyles.suggestionTitle}>
                    {suggestion.title}
                  </Text>
                  <Text style={globalStyles.suggestionDescription}>
                    {suggestion.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              globalStyles.messageWrapper,
              message.isUser
                ? globalStyles.userMessageWrapper
                : globalStyles.aiMessageWrapper,
            ]}
          >
            <View
              style={[
                globalStyles.messageBubble,
                message.isUser
                  ? globalStyles.userBubble
                  : globalStyles.aiBubble,
              ]}
            >
              <Text
                style={[
                  globalStyles.messageText,
                  message.isUser
                    ? globalStyles.userMessageText
                    : globalStyles.aiMessageText,
                ]}
              >
                {message.text}
              </Text>
              <Text style={globalStyles.timestamp}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}

        {isLoading && (
          <View style={globalStyles.loadingContainer}>
            <ActivityIndicator color="#6b7280" />
            <Animated.View
              style={[
                globalStyles.loadingDots,
                {
                  opacity: loadingDots,
                },
              ]}
            >
              <Text style={globalStyles.loadingText}>...</Text>
            </Animated.View>
          </View>
        )}
      </ScrollView>

      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#6b7280"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            globalStyles.sendButton,
            !inputText.trim() && globalStyles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={inputText.trim() ? "#fff" : "#6b7280"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
