import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Collection names
const COLLECTIONS = {
  PROJECTS: 'projects',
  TESTIMONIALS: 'testimonials',
  TEAM_MEMBERS: 'teamMembers',
  CONTACT_SUBMISSIONS: 'contactSubmissions',
  HERO_IMAGES: 'heroImages',
  ABOUT_CONTENT: 'aboutContent',
  CONTACT_CONTENT: 'contactContent'
};

// Generic CRUD operations
class FirestoreService {
  // Get all documents from a collection
  async getAll(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting ${collectionName}:`, error);
      throw error;
    }
  }

  // Get a single document
  async getOne(collectionName, docId) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  }

  // Add a new document
  async add(collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  // Update a document
  async update(collectionName, docId, data) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
      return { id: docId, ...data };
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  }

  // Delete a document
  async delete(collectionName, docId) {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return { success: true };
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      throw error;
    }
  }

  // Get documents with query
  async getWithQuery(collectionName, queryConstraints = []) {
    try {
      const q = query(collection(db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error);
      throw error;
    }
  }
}

// Create service instance
const firestoreService = new FirestoreService();

// Specific collection services
export const projectsService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.PROJECTS),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.PROJECTS, id),
  add: (data) => firestoreService.add(COLLECTIONS.PROJECTS, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.PROJECTS, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.PROJECTS, id)
};

export const testimonialsService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.TESTIMONIALS),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.TESTIMONIALS, id),
  add: (data) => firestoreService.add(COLLECTIONS.TESTIMONIALS, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.TESTIMONIALS, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.TESTIMONIALS, id)
};

export const teamMembersService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.TEAM_MEMBERS),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.TEAM_MEMBERS, id),
  add: (data) => firestoreService.add(COLLECTIONS.TEAM_MEMBERS, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.TEAM_MEMBERS, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.TEAM_MEMBERS, id)
};

export const contactSubmissionsService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.CONTACT_SUBMISSIONS),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.CONTACT_SUBMISSIONS, id),
  add: (data) => firestoreService.add(COLLECTIONS.CONTACT_SUBMISSIONS, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.CONTACT_SUBMISSIONS, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.CONTACT_SUBMISSIONS, id)
};

export const heroImagesService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.HERO_IMAGES),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.HERO_IMAGES, id),
  add: (data) => firestoreService.add(COLLECTIONS.HERO_IMAGES, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.HERO_IMAGES, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.HERO_IMAGES, id)
};

export const aboutContentService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.ABOUT_CONTENT),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.ABOUT_CONTENT, id),
  add: (data) => firestoreService.add(COLLECTIONS.ABOUT_CONTENT, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.ABOUT_CONTENT, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.ABOUT_CONTENT, id)
};

export const contactContentService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.CONTACT_CONTENT),
  getOne: (id) => firestoreService.getOne(COLLECTIONS.CONTACT_CONTENT, id),
  add: (data) => firestoreService.add(COLLECTIONS.CONTACT_CONTENT, data),
  update: (id, data) => firestoreService.update(COLLECTIONS.CONTACT_CONTENT, id, data),
  delete: (id) => firestoreService.delete(COLLECTIONS.CONTACT_CONTENT, id)
};

export default firestoreService;
