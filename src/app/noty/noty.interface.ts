export interface INotyMessage {
  type: 'success' | 'info' | 'error';
  message: string;
}

export interface INoty extends INotyMessage {
  id: number;
  isHiding: boolean;
}
