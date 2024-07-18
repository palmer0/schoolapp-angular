  export interface ChatI {
    id: string;
    userIds: string[]; 
    mensajes: Mensaje[];
  }
  
  
  export interface Mensaje {
    userId: string;
    content: string;
    timestamp: Date;
  }