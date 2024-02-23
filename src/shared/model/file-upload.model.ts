export interface IFileUpload {
  ok?: string;
  redirected?: boolean;
  status?: number;
  statusText?: string;
  type?: string;
  url?: string;
}

export const defaultValue: Readonly<IFileUpload> = {
  ok: '',
  redirected: false,
  status: 200,
  statusText: '',
  type: 'cors',
  url: ''
};
