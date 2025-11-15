import type { FormData } from '@/types/generator';

export const mockFormData: FormData = {
  name: 'Test Plombier',
  activity: 'plombier',
  city: 'Paris',
  services: ['Dépannage', 'Installation', 'Réparation'],
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
  },
  style: 'modern',
  languages: ['fr'],
  contact: {
    phone: '0123456789',
    email: 'test@example.com',
    address: '123 Rue de Test, 75001 Paris',
  },
};

export const mockFormDataMinimal: FormData = {
  name: 'Minimal Test',
  activity: 'électricien',
  city: 'Lyon',
  services: ['Dépannage'],
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
  },
  style: 'classic',
  languages: ['fr'],
  contact: {
    phone: '0987654321',
    email: 'minimal@example.com',
  },
};
