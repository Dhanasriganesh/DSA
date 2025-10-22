import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  projectsService,
  testimonialsService,
  teamMembersService,
  contactSubmissionsService,
  heroImagesService,
  aboutContentService,
  contactContentService
} from '../services/firestoreService';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [contactContent, setContactContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all data from Firestore on mount
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const [
          projectsData,
          testimonialsData,
          teamData,
          contactsData,
          heroData,
          aboutData,
          contactInfoData
        ] = await Promise.all([
          projectsService.getAll(),
          testimonialsService.getAll(),
          teamMembersService.getAll(),
          contactSubmissionsService.getAll(),
          heroImagesService.getAll(),
          aboutContentService.getAll(),
          contactContentService.getAll()
        ]);

        setProjects(projectsData);
        setTestimonials(testimonialsData);
        setTeamMembers(teamData);
        setContactSubmissions(contactsData);
        setHeroImages(heroData);
        setAboutContent(aboutData[0] || null);
        setContactContent(contactInfoData[0] || null);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // CRUD operations for Projects
  const addProject = async (project) => {
    try {
      const newProject = await projectsService.add(project);
      setProjects([...projects, newProject]);
      return newProject;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      await projectsService.update(id, updatedProject);
      setProjects(projects.map(p => p.id === id ? { ...p, ...updatedProject } : p));
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectsService.delete(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  // CRUD operations for Testimonials
  const addTestimonial = async (testimonial) => {
    try {
      const newTestimonial = await testimonialsService.add(testimonial);
      setTestimonials([...testimonials, newTestimonial]);
      return newTestimonial;
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
  };

  const updateTestimonial = async (id, updatedTestimonial) => {
    try {
      await testimonialsService.update(id, updatedTestimonial);
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, ...updatedTestimonial } : t));
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await testimonialsService.delete(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  };

  // CRUD operations for Team Members
  const addTeamMember = async (member) => {
    try {
      const newMember = await teamMembersService.add(member);
      setTeamMembers([...teamMembers, newMember]);
      return newMember;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  };

  const updateTeamMember = async (id, updatedMember) => {
    try {
      await teamMembersService.update(id, updatedMember);
      setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...updatedMember } : m));
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  };

  const deleteTeamMember = async (id) => {
    try {
      await teamMembersService.delete(id);
      setTeamMembers(teamMembers.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  };

  // Contact Submissions
  const addContactSubmission = async (submission) => {
    try {
      const newSubmission = {
        ...submission,
        date: new Date().toISOString().split('T')[0],
        status: 'new'
      };
      const savedSubmission = await contactSubmissionsService.add(newSubmission);
      setContactSubmissions([savedSubmission, ...contactSubmissions]);
      return savedSubmission;
    } catch (error) {
      console.error('Error adding contact submission:', error);
      throw error;
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await contactSubmissionsService.update(id, { status });
      setContactSubmissions(contactSubmissions.map(c => c.id === id ? { ...c, status } : c));
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  };

  const deleteContactSubmission = async (id) => {
    try {
      await contactSubmissionsService.delete(id);
      setContactSubmissions(contactSubmissions.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      throw error;
    }
  };

  // Hero Images
  const addHeroImage = async (image) => {
    try {
      const newImage = await heroImagesService.add(image);
      setHeroImages([...heroImages, newImage]);
      return newImage;
    } catch (error) {
      console.error('Error adding hero image:', error);
      throw error;
    }
  };

  const updateHeroImage = async (id, updatedImage) => {
    try {
      await heroImagesService.update(id, updatedImage);
      setHeroImages(heroImages.map(h => h.id === id ? { ...h, ...updatedImage } : h));
    } catch (error) {
      console.error('Error updating hero image:', error);
      throw error;
    }
  };

  const deleteHeroImage = async (id) => {
    try {
      await heroImagesService.delete(id);
      setHeroImages(heroImages.filter(h => h.id !== id));
    } catch (error) {
      console.error('Error deleting hero image:', error);
      throw error;
    }
  };

  // About Content Management
  const updateAboutContent = async (content) => {
    try {
      if (aboutContent && aboutContent.id) {
        // Update existing
        await aboutContentService.update(aboutContent.id, content);
        setAboutContent({ ...aboutContent, ...content });
      } else {
        // Create new
        const newContent = await aboutContentService.add(content);
        setAboutContent(newContent);
      }
    } catch (error) {
      console.error('Error updating about content:', error);
      throw error;
    }
  };

  // Contact Content Management
  const updateContactContent = async (content) => {
    try {
      if (contactContent && contactContent.id) {
        // Update existing
        await contactContentService.update(contactContent.id, content);
        setContactContent({ ...contactContent, ...content });
      } else {
        // Create new
        const newContent = await contactContentService.add(content);
        setContactContent(newContent);
      }
    } catch (error) {
      console.error('Error updating contact content:', error);
      throw error;
    }
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    contactSubmissions,
    addContactSubmission,
    updateContactStatus,
    deleteContactSubmission,
    heroImages,
    addHeroImage,
    updateHeroImage,
    deleteHeroImage,
    aboutContent,
    updateAboutContent,
    contactContent,
    updateContactContent,
    loading
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
