import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Suggestion {
  icon: string;
  title: string;
  description: string;
}

const aiChannels = [
  { id: '1', name: 'Asistente General', icon: '🤖', description: 'Ayuda general y respuestas precisas' },
  { id: '2', name: 'Programación', icon: '👨‍💻', description: 'Código y soluciones técnicas' },
  { id: '3', name: 'Análisis de Datos', icon: '📊', description: 'Análisis y visualización de datos' },
  { id: '4', name: 'Creativo', icon: '🎨', description: 'Generación de ideas y contenido creativo' },
];

const aiModels = [
  { id: '1', name: 'DeepSeek-Coder', icon: '🚀', description: 'Especializado en código' },
  { id: '2', name: 'GPT-4', icon: '🧠', description: 'Modelo avanzado de OpenAI' },
  { id: '3', name: 'Claude 2', icon: '🤖', description: 'IA conversacional Anthropic' },
  { id: '4', name: 'Llama 2', icon: '🦙', description: 'Modelo open source de Meta' },
];

const suggestions: Suggestion[] = [
  {
    icon: '🐍',
    title: '¿Cómo crear una función en Python?',
    description: 'Aprende a definir funciones básicas y avanzadas',
  },
  {
    icon: '🚀',
    title: '¿Cómo optimizar el rendimiento?',
    description: 'Mejores prácticas para código eficiente',
  },
  {
    icon: '🎨',
    title: '¿Diseño de interfaces con React Native?',
    description: 'Tips para crear UIs modernas y responsivas',
  },
  {
    icon: '🔐',
    title: '¿Implementar autenticación segura?',
    description: 'Métodos seguros de autenticación de usuarios',
  },
];

export default function ModernChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
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
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Soy un asistente AI. Esta es una respuesta de ejemplo que demuestra cómo se vería un mensaje más largo en la interfaz. Puedes personalizar estas respuestas según tus necesidades.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>IA Canales conversacionales</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.modelSelector} onPress={() => alert('Selector de modelo - Puedes implementar un modal o dropdown aquí')}>
            <FontAwesome5 name="robot" size={14} color="#4ade80" style={styles.modelIcon} />
            <Text style={styles.selectedModel}>GPT-4</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={[
          styles.messagesContent,
          messages.length === 0 && styles.emptyMessagesContent
        ]}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 && (
          <Animated.View 
            style={[
              styles.suggestionsContainer,
              { opacity: suggestionOpacity }
            ]}
          >
            <Text style={styles.suggestionsTitle}>¿Qué te gustaría preguntar? 🤔</Text>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionCard}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionIcon}>{suggestion.icon}</Text>
                <View style={styles.suggestionTextContainer}>
                  <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                  <Text style={styles.suggestionDescription}>
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
              styles.messageWrapper,
              message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble,
            ]}>
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText,
              ]}>
                {message.text}
              </Text>
              <Text style={styles.timestamp}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#6b7280" />
            <Animated.View style={[styles.loadingDots, {
              opacity: loadingDots,
            }]}>
              <Text style={styles.loadingText}>...</Text>
            </Animated.View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#6b7280"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#404040',
  },
  selectedModel: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 8,
  },
  modelIcon: {
    marginRight: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  messagesContent: {
    padding: 16,
  },
  emptyMessagesContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  suggestionsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  suggestionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  suggestionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
  messageWrapper: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  aiMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#2563eb',
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#374151',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  loadingDots: {
    marginLeft: 8,
  },
  loadingText: {
    color: '#6b7280',
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: '#ffffff',
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2563eb',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#374151',
  },
});