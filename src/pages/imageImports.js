// src/pages/imageImports.js

// Import all souv images
import souv1 from './assets/souv/souv1.jpeg';
import souv1_1 from './assets/souv/souv1.1.jpeg';
import souv1_2 from './assets/souv/souv1.2.jpeg';
import souv1_3 from './assets/souv/souv1.3.jpeg';
import souv2 from './assets/souv/souv2.jpeg';
import souv2_1 from './assets/souv/souv2.1.jpeg';
import souv2_2 from './assets/souv/souv2.2.jpeg';
import souv2_3 from './assets/souv/souv2.3.jpeg';
import souv2_4 from './assets/souv/souv2.4.jpeg';
import souv3 from './assets/souv/souv3.jpeg';

// Import all thot images
import thot1 from './assets/thot/thot1.jpeg';
import thot1_1 from './assets/thot/thot1.1.jpeg';
import thot1_2 from './assets/thot/thot1.2.jpeg';
import thot2 from './assets/thot/thot2.jpeg';

// Import all pablo images
import pablo1 from './assets/pablo/pablo1.jpeg';
import pablo1_1 from './assets/pablo/pablo1.1.jpeg';
import pablo1_2 from './assets/pablo/pablo1.2.jpeg';

// Create a mapping object
const imageImports = {
    // Suvinor images
    'souv1.jpeg': souv1,
    'souv1.1.jpeg': souv1_1,
    'souv1.2.jpeg': souv1_2,
    'souv1.3.jpeg': souv1_3,
    'souv2.jpeg': souv2,
    'souv2.1.jpeg': souv2_1,
    'souv2.2.jpeg': souv2_2,
    'souv2.3.jpeg': souv2_3,
    'souv2.4.jpeg': souv2_4,
    'souv3.jpeg': souv3,
    
    // Thotilla images
    'thot1.jpeg': thot1,
    'thot1.1.jpeg': thot1_1,
    'thot1.2.jpeg': thot1_2,
    'thot2.jpeg': thot2,
    
    // Pablo images
    'pablo1.jpeg': pablo1,
    'pablo1.1.jpeg': pablo1_1,
    'pablo1.2.jpeg': pablo1_2,
};

// Function to get imported image
export const getImportedImage = (filename) => {
    console.log('Looking for image:', filename);
    const image = imageImports[filename];
    if (!image) {
        console.warn('Image not found in imports:', filename);
    }
    return image || null;
};

// Export individual images if needed
export { 
    souv1, souv1_1, souv1_2, souv1_3, 
    souv2, souv2_1, souv2_2, souv2_3, souv2_4,
    souv3,
    thot1, thot1_1, thot1_2, thot2,
    pablo1, pablo1_1, pablo1_2 
};

export default imageImports;