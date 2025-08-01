'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  pt: {
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.send': 'Enviar',
    'common.close': 'Fechar',
    'common.ok': 'OK',
    
    // Greeting
    'greeting.hello': 'Olá!',
    'greeting.help': 'Como posso te ajudar hoje?',
    
    // Navigation
    'nav.new_chat': 'Nova Conversa',
    'nav.history': 'Histórico',
    'nav.settings': 'Configurações',
    'nav.help': 'Ajuda',
    'nav.sign_out': 'Sair',
    
    // Chat
    'chat.title': 'NeoGen AI',
    'chat.subtitle': 'Seu assistente de IA inteligente',
    'chat.placeholder': 'Digite sua mensagem...',
    'chat.send_message': 'Enviar mensagem',
    'chat.new_chat': 'Nova conversa',
    'chat.clear_history': 'Limpar histórico',
    'chat.copy_message': 'Copiar mensagem',
    'chat.regenerate': 'Regenerar resposta',
    'chat.stop_generating': 'Parar geração',
    
    // Authentication
    'auth.sign_in': 'Entrar',
    'auth.sign_up': 'Criar conta',
    'auth.sign_out': 'Sair',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.remember_me': 'Lembrar-me',
    'auth.forgot_password': 'Esqueci minha senha',
    'auth.create_account': 'Criar uma conta',
    'auth.have_account': 'Já tem uma conta?',
    'auth.no_account': 'Não tem uma conta?',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.theme': 'Tema',
    'settings.language': 'Idioma',
    'settings.model': 'Modelo de IA',
    'settings.privacy': 'Privacidade',
    'settings.data': 'Dados',
    'settings.account': 'Conta',
    
    // Theme
    'theme.light': 'Claro',
    'theme.dark': 'Escuro',
    'theme.system': 'Sistema',
    
    // Language
    'language.portuguese': 'Português',
    'language.english': 'English',
    
    // Errors
    'error.generic': 'Algo deu errado. Tente novamente.',
    'error.network': 'Erro de conexão. Verifique sua internet.',
    'error.unauthorized': 'Você não tem autorização para esta ação.',
    'error.not_found': 'Página não encontrada.',
    'error.server': 'Erro interno do servidor.',
    
    // Success messages
    'success.saved': 'Salvo com sucesso!',
    'success.deleted': 'Excluído com sucesso!',
    'success.updated': 'Atualizado com sucesso!',
    'success.sent': 'Enviado com sucesso!',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.send': 'Send',
    'common.close': 'Close',
    'common.ok': 'OK',
    
    // Greeting
    'greeting.hello': 'Hello!',
    'greeting.help': 'How can I help you today?',
    
    // Navigation
    'nav.new_chat': 'New Chat',
    'nav.history': 'History',
    'nav.settings': 'Settings',
    'nav.help': 'Help',
    'nav.sign_out': 'Sign Out',
    
    // Chat
    'chat.title': 'NeoGen AI',
    'chat.subtitle': 'Your intelligent AI assistant',
    'chat.placeholder': 'Type your message...',
    'chat.send_message': 'Send message',
    'chat.new_chat': 'New chat',
    'chat.clear_history': 'Clear history',
    'chat.copy_message': 'Copy message',
    'chat.regenerate': 'Regenerate response',
    'chat.stop_generating': 'Stop generating',
    
    // Authentication
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.sign_out': 'Sign Out',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.remember_me': 'Remember me',
    'auth.forgot_password': 'Forgot password',
    'auth.create_account': 'Create an account',
    'auth.have_account': 'Already have an account?',
    'auth.no_account': 'Don\'t have an account?',
    
    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.model': 'AI Model',
    'settings.privacy': 'Privacy',
    'settings.data': 'Data',
    'settings.account': 'Account',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    
    // Language
    'language.portuguese': 'Português',
    'language.english': 'English',
    
    // Errors
    'error.generic': 'Something went wrong. Please try again.',
    'error.network': 'Connection error. Check your internet.',
    'error.unauthorized': 'You are not authorized for this action.',
    'error.not_found': 'Page not found.',
    'error.server': 'Internal server error.',
    
    // Success messages
    'success.saved': 'Saved successfully!',
    'success.deleted': 'Deleted successfully!',
    'success.updated': 'Updated successfully!',
    'success.sent': 'Sent successfully!',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}