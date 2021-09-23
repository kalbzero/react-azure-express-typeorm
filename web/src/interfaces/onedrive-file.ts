import { User } from './user';

export interface OneDriveFile {
  id: string;
  name: string;
  createdBy: User;
  webUrl: string;
  file?: { hashes: { quickXorHash: string }; mimeType: string };
  folder?: { childCount: number };
  remoteItem: {
    parentReference: { driveId: string; driveType: string; id: string };
  };
}
