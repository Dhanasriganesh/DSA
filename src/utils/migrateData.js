// One-time data migration from localStorage to Firestore
// This helps migrate your old data to the new Firebase/Firestore system

import { 
  projectsService,
  testimonialsService,
  teamMembersService,
  heroImagesService
} from '../services/firestoreService';

/**
 * Migrate data from localStorage to Firestore
 * Run this once to transfer your old data
 */
export const migrateLocalStorageToFirestore = async () => {
  try {
    console.log('🔄 Starting migration from localStorage to Firestore...');
    
    const results = {
      projects: 0,
      testimonials: 0,
      teamMembers: 0,
      heroImages: 0,
      errors: []
    };

    // Migrate Projects
    const oldProjects = localStorage.getItem('adminProjects');
    if (oldProjects) {
      try {
        const projects = JSON.parse(oldProjects);
        console.log(`Found ${projects.length} projects in localStorage`);
        
        for (const project of projects) {
          // Remove old ID, Firestore will generate new one
          const { id, ...projectData } = project;
          await projectsService.add(projectData);
          results.projects++;
        }
        console.log(`✅ Migrated ${results.projects} projects`);
      } catch (error) {
        console.error('Error migrating projects:', error);
        results.errors.push('projects: ' + error.message);
      }
    }

    // Migrate Testimonials
    const oldTestimonials = localStorage.getItem('adminTestimonials');
    if (oldTestimonials) {
      try {
        const testimonials = JSON.parse(oldTestimonials);
        console.log(`Found ${testimonials.length} testimonials in localStorage`);
        
        for (const testimonial of testimonials) {
          const { id, ...testimonialData } = testimonial;
          await testimonialsService.add(testimonialData);
          results.testimonials++;
        }
        console.log(`✅ Migrated ${results.testimonials} testimonials`);
      } catch (error) {
        console.error('Error migrating testimonials:', error);
        results.errors.push('testimonials: ' + error.message);
      }
    }

    // Migrate Team Members
    const oldTeamMembers = localStorage.getItem('adminTeamMembers');
    if (oldTeamMembers) {
      try {
        const teamMembers = JSON.parse(oldTeamMembers);
        console.log(`Found ${teamMembers.length} team members in localStorage`);
        
        for (const member of teamMembers) {
          const { id, ...memberData } = member;
          await teamMembersService.add(memberData);
          results.teamMembers++;
        }
        console.log(`✅ Migrated ${results.teamMembers} team members`);
      } catch (error) {
        console.error('Error migrating team members:', error);
        results.errors.push('teamMembers: ' + error.message);
      }
    }

    // Migrate Hero Images
    const oldHeroImages = localStorage.getItem('adminHeroImages');
    if (oldHeroImages) {
      try {
        const heroImages = JSON.parse(oldHeroImages);
        console.log(`Found ${heroImages.length} hero images in localStorage`);
        
        for (const image of heroImages) {
          const { id, ...imageData } = image;
          await heroImagesService.add(imageData);
          results.heroImages++;
        }
        console.log(`✅ Migrated ${results.heroImages} hero images`);
      } catch (error) {
        console.error('Error migrating hero images:', error);
        results.errors.push('heroImages: ' + error.message);
      }
    }

    // Summary
    console.log('\n🎉 Migration Complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Projects: ${results.projects}`);
    console.log(`✅ Testimonials: ${results.testimonials}`);
    console.log(`✅ Team Members: ${results.teamMembers}`);
    console.log(`✅ Hero Images: ${results.heroImages}`);
    
    if (results.errors.length > 0) {
      console.log('\n⚠️ Errors:');
      results.errors.forEach(err => console.log(`  - ${err}`));
    }
    
    console.log('\n💡 You can now safely clear localStorage!');
    console.log('📍 Check Firebase Console → Firestore to see your data');
    
    return results;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

/**
 * Clear old localStorage data after successful migration
 */
export const clearOldLocalStorage = () => {
  const keysToRemove = [
    'adminProjects',
    'adminTestimonials',
    'adminTeamMembers',
    'adminContactSubmissions',
    'adminHeroImages'
  ];

  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`🗑️ Removed ${key} from localStorage`);
  });

  console.log('✅ Old localStorage data cleared!');
};

/**
 * Check what data exists in localStorage
 */
export const checkLocalStorageData = () => {
  console.log('🔍 Checking localStorage for old data...\n');
  
  const data = {
    projects: localStorage.getItem('adminProjects'),
    testimonials: localStorage.getItem('adminTestimonials'),
    teamMembers: localStorage.getItem('adminTeamMembers'),
    contactSubmissions: localStorage.getItem('adminContactSubmissions'),
    heroImages: localStorage.getItem('adminHeroImages')
  };

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        console.log(`✅ ${key}: ${parsed.length} items found`);
      } catch (error) {
        console.log(`⚠️ ${key}: Invalid data`);
      }
    } else {
      console.log(`❌ ${key}: No data`);
    }
  });

  return data;
};

export default {
  migrateLocalStorageToFirestore,
  clearOldLocalStorage,
  checkLocalStorageData
};
