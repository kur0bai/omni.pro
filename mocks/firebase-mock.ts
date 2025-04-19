import {
  CollectionReference,
  QuerySnapshot,
  DocumentData,
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

//best to use the same type as the one used in the real function
export const mockAddDoc = jest.fn<ReturnType<AddDoc>, Parameters<AddDoc>>();
export const mockGetDocs = jest.fn<ReturnType<GetDocs>, Parameters<GetDocs>>();
export const mockCollection = jest.fn<
  ReturnType<Collection>,
  Parameters<Collection>
>();

export const getFirestore = jest.fn(() => ({}));
export {
  mockAddDoc as addDoc,
  mockGetDocs as getDocs,
  mockCollection as collection,
};
