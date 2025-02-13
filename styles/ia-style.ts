import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modelSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#404040",
  },
  selectedModel: {
    color: "#ffffff",
    fontSize: 14,
    marginRight: 8,
  },
  modelIcon: {
    marginRight: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ade80",
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  messagesContent: {
    padding: 16,
  },
  emptyMessagesContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  suggestionsContainer: {
    padding: 16,
    alignItems: "center",
  },
  suggestionsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
    textAlign: "center",
  },
  suggestionCard: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
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
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 14,
    color: "#9ca3af",
  },
  messageWrapper: {
    marginVertical: 4,
    flexDirection: "row",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  aiMessageWrapper: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: "#2563eb",
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#374151",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: "#ffffff",
  },
  aiMessageText: {
    color: "#ffffff",
  },
  timestamp: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  loadingDots: {
    marginLeft: 8,
  },
  loadingText: {
    color: "#6b7280",
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: "#ffffff",
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#2563eb",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#374151",
  },
});
