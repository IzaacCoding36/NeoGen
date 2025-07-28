export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Modelo Padrão',
    description: 'Modelo primário para uma conversa geral',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Modelo Raciocínio',
    description: 'Usa raciocínio avançado',
  },
];
