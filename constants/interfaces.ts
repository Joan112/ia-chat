export interface Message {
  isUser: any;
  id: string;
  text: string;
  timestamp: Date;
}

export interface Suggestion {
  icon: string;
  title: string;
  description: string;
}

export interface ApiResponse {
  response: string;
}
