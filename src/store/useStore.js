import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'browse', // 'browse' | 'favorites' | 'applications' | 'shelter-portal'
  selectedSpecies: 'All', // 'All' | 'Dog' | 'Cat' | 'Rabbit'
  selectedPetDetail: null,

  pets: [
    {
      id: 'PET-01',
      name: 'Mochi',
      species: 'Dog',
      breed: 'Shiba Inu Mix',
      age: '1.5 yrs',
      gender: 'Male',
      size: 'Medium (12 kg)',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      shelter: 'Golden Sun Sanctuary',
      location: 'Austin, TX',
      vaccinated: true,
      neutered: true,
      microchipped: true,
      goodWithKids: true,
      goodWithCats: false,
      personality: ['Playful', 'Curious', 'Affectionate'],
      story: 'Mochi loves chasing autumn leaves and snuggling up after long park walks. He knows basic commands and is fully house-trained.',
      adoptionFee: '$180',
      isFavorite: true
    },
    {
      id: 'PET-02',
      name: 'Luna & Celeste',
      species: 'Cat',
      breed: 'British Shorthair Duo',
      age: '8 mos',
      gender: 'Bonded Pair (F/F)',
      size: 'Small (3.5 kg each)',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
      shelter: 'Whisker Haven Rescue',
      location: 'Seattle, WA',
      vaccinated: true,
      neutered: true,
      microchipped: true,
      goodWithKids: true,
      goodWithCats: true,
      personality: ['Gentle', 'Quiet', 'Cuddle-bug'],
      story: 'Luna and Celeste are inseparable sisters looking for a quiet home with sunny windowsills and gentle hands.',
      adoptionFee: '$220 (Pair)',
      isFavorite: false
    },
    {
      id: 'PET-03',
      name: 'Barnaby',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '3 yrs',
      gender: 'Male',
      size: 'Large (30 kg)',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
      shelter: 'Austin Animal Center',
      location: 'Austin, TX',
      vaccinated: true,
      neutered: true,
      microchipped: true,
      goodWithKids: true,
      goodWithCats: true,
      personality: ['Energetic', 'Loyal', 'Swimmer'],
      story: 'Barnaby is a joyful companion who adores swimming in lakes and playing fetch until sundown. Great family dog!',
      adoptionFee: '$150',
      isFavorite: false
    },
    {
      id: 'PET-04',
      name: 'Clover',
      species: 'Rabbit',
      breed: 'Holland Lop',
      age: '1 yr',
      gender: 'Female',
      size: 'Small (1.8 kg)',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
      shelter: 'Bunny Haven Society',
      location: 'Portland, OR',
      vaccinated: true,
      neutered: true,
      microchipped: false,
      goodWithKids: true,
      goodWithCats: true,
      personality: ['Sweet', 'Loves Greens', 'Docile'],
      story: 'Clover is a gentle indoor lop bunny who loves fresh cilantro and hopping around playpens.',
      adoptionFee: '$60',
      isFavorite: false
    }
  ],

  applications: [
    {
      id: 'APP-801',
      petName: 'Mochi',
      applicantName: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      housingType: 'House with Fenced Yard',
      hasOtherPets: 'None',
      status: 'In Review', // 'In Review' | 'Approved' | 'Home Visit Scheduled'
      submittedAt: 'Yesterday'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSpecies: (species) => set({ selectedSpecies: species }),
  setSelectedPetDetail: (pet) => set({ selectedPetDetail: pet }),

  toggleFavorite: (petId) => set((state) => ({
    pets: state.pets.map(p => p.id === petId ? { ...p, isFavorite: !p.isFavorite } : p)
  })),

  submitApplication: (appData) => set((state) => {
    const newApp = {
      id: `APP-${Math.floor(802 + Math.random() * 900)}`,
      status: 'In Review',
      submittedAt: 'Just now',
      ...appData
    };
    return {
      applications: [newApp, ...state.applications],
      activeTab: 'applications'
    };
  }),

  updateAppStatus: (appId, newStatus) => set((state) => ({
    applications: state.applications.map(a => a.id === appId ? { ...a, status: newStatus } : a)
  })),

  addPetListing: (petData) => set((state) => ({
    pets: [
      {
        id: `PET-0${state.pets.length + 1}`,
        isFavorite: false,
        image: petData.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
        ...petData
      },
      ...state.pets
    ],
    activeTab: 'browse'
  }))
}));
