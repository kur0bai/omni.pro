import { DocumentReference, DocumentData } from "firebase/firestore";

export function mockDocumentReference(
  id: string
): DocumentReference<DocumentData> {
  return {
    id,
    path: `some/path/${id}`,
    firestore: {} as any,
    withConverter: jest.fn(),
    collection: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    onSnapshot: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  } as unknown as DocumentReference<DocumentData>;
}
