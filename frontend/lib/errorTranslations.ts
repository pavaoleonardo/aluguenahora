export const translateError = (message: string): string => {
  if (!message) return 'Ocorreu um erro inesperado.';

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('invalid identifier or password')) {
    return 'E-mail ou senha inválidos.';
  }
  
  if (lowerMessage.includes('email is already taken')) {
    return 'Este e-mail já está sendo usado por outra conta.';
  }

  if (lowerMessage.includes('username is already taken')) {
    return 'Este nome de usuário já está em uso.';
  }

  if (lowerMessage.includes('your account email is not confirmed')) {
    return 'Seu e-mail ainda não foi confirmado. Por favor, verifique sua caixa de entrada.';
  }

  if (lowerMessage.includes('too many attempts')) {
    return 'Muitas tentativas. Por favor, tente novamente em alguns minutos.';
  }

  if (lowerMessage.includes('password is too short')) {
    return 'A senha é muito curta. Use pelo menos 6 caracteres.';
  }

  if (lowerMessage.includes('invalid parameters')) {
    return 'Algumas informações estão incorretas ou faltando.';
  }

  // Default fallbacks for common scenarios
  if (lowerMessage.includes('network error') || lowerMessage.includes('failed to fetch')) {
    return 'Erro de conexão. Verifique sua internet.';
  }

  return message; // Return original if no translation found
};
