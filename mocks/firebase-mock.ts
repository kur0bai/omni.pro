import {
  CollectionReference,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
} from "firebase/firestore";

export type AddDoc = (
  collection: CollectionReference<DocumentData>,
  data: DocumentData
) => Promise<DocumentReference<DocumentData>>;
export type GetDocs = (
  query: QuerySnapshot<DocumentData>
) => Promise<QuerySnapshot<DocumentData>>;
export type Collection = (
  db: any,
  collectionPath: string
) => CollectionReference<DocumentData>;

export const mockAddDoc: jest.Mock<AddDoc> = jest.fn();
export const mockGetDocs: jest.Mock<GetDocs> = jest.fn();
export const mockCollection: jest.Mock<Collection> = jest.fn();

export {
  mockAddDoc as addDoc,
  mockGetDocs as getDocs,
  mockCollection as collection,
};
