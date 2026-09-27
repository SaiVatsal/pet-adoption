import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Heart,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  Home,
  FileText,
  PlusCircle,
  X,
  MessageCircle,
  PawPrint
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedSpecies,
    setSelectedSpecies,
    selectedPetDetail,
    setSelectedPetDetail,
    pets,
    applications,
    toggleFavorite,
    submitApplication,
    updateAppStatus,
    addPetListing
  } = useStore();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyingPet, setApplyingPet] = useState(null);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [housingType, setHousingType] = useState('Single Family House');
  const [hasYard, setHasYard] = useState('Yes, Fenced');
  const [experience, setExperience] = useState('Experienced pet parent for 5+ years');

  // Shelter Create Listing State
  const [newPetName, setNewPetName] = useState('');
  const [newSpecies, setNewSpecies] = useState('Dog');
  const [newBreed, setNewBreed] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('Female');
  const [newShelter, setNewShelter] = useState('PawHaven Central Rescue');
  const [newLocation, setNewLocation] = useState('Austin, TX');
  const [newFee, setNewFee] = useState('$150');
  const [newStory, setNewStory] = useState('');

  const speciesList = ['All', 'Dog', 'Cat', 'Rabbit'];

  const filteredPets = pets.filter(p => {
    if (activeTab === 'favorites') return p.isFavorite;
    return selectedSpecies === 'All' ? true : p.species === selectedSpecies;
  });

  const handleOpenApplyModal = (pet) => {
    setApplyingPet(pet);
    setShowApplyModal(true);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!applicantName.trim() || !applyingPet) return;
    submitApplication({
      petName: applyingPet.name,
      applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      housingType: `${housingType} (${hasYard})`,
      experience
    });
    setShowApplyModal(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
  };

  const handleCreatePetSubmit = (e) => {
    e.preventDefault();
    if (!newPetName.trim() || !newBreed.trim()) return;
    addPetListing({
      name: newPetName,
      species: newSpecies,
      breed: newBreed,
      age: newAge || '1 yr',
      gender: newGender,
      shelter: newShelter,
      location: newLocation,
      adoptionFee: newFee,
      story: newStory || 'Looking for a warm home with loving caregivers.',
      vaccinated: true,
      neutered: true,
      microchipped: true,
      goodWithKids: true,
      goodWithCats: true,
      personality: ['Loving', 'Loyal', 'Friendly']
    });
    setNewPetName('');
    setNewBreed('');
    setNewStory('');
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#431407] font-sans flex flex-col selection:bg-orange-400 selection:text-white">
      {/* Top Peach & Cream Header */}
      <header className="bg-white border-b border-orange-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-300 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <PawPrint className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-black text-xl text-[#431407] tracking-tight block leading-tight">PawHaven</span>
              <span className="text-[10px] text-orange-600 font-mono font-bold uppercase tracking-wider">
                COMPASSIONATE ANIMAL RESCUE & ADOPTION
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-orange-50 p-1 rounded-2xl border border-orange-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'browse' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-950 hover:text-orange-700'
                }`}
              >
                Find Pets
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1 ${
                  activeTab === 'favorites' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-950 hover:text-orange-700'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" /> Saved
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'applications' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-950 hover:text-orange-700'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('shelter-portal')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'shelter-portal' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-950 hover:text-orange-700'
                }`}
              >
                Shelter Console
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* PET CATALOG (BROWSE & FAVORITES) */}
        {(activeTab === 'browse' || activeTab === 'favorites') && (
          <div className="space-y-6">
            {/* Header and Species Filter */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-orange-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#431407]">
                  {activeTab === 'favorites' ? 'Saved Furry Friends' : 'Meet Adoptable Pets Waiting for Home'}
                </h1>
                <p className="text-xs text-orange-800/80">Every pet is medically examined, vaccinated, microchipped, and loved</p>
              </div>

              {activeTab === 'browse' && (
                <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-orange-200">
                  {speciesList.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSpecies(s)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                        selectedSpecies === s
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-orange-900 hover:bg-orange-50'
                      }`}
                    >
                      {s === 'All' ? 'All Breeds' : `${s}s`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pet Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPets.map(pet => (
                <div
                  key={pet.id}
                  className="bg-white rounded-3xl border border-orange-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-60 overflow-hidden bg-orange-100">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <button
                      onClick={() => toggleFavorite(pet.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition shadow-md ${
                        pet.isFavorite
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 text-orange-950 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${pet.isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg">
                      {pet.age} • {pet.gender}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider">{pet.species}</span>
                        <span className="text-xs font-mono font-bold text-[#431407]">{pet.adoptionFee}</span>
                      </div>
                      <h3 className="font-extrabold text-lg text-[#431407] leading-tight">{pet.name}</h3>
                      <p className="text-xs font-medium text-orange-900/80">{pet.breed}</p>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{pet.story}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-orange-100">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-orange-800">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{pet.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedPetDetail(pet)}
                          className="flex-1 py-2 bg-orange-50 hover:bg-orange-100 text-orange-950 font-bold rounded-xl text-xs transition border border-orange-200"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleOpenApplyModal(pet)}
                          className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold rounded-xl text-xs transition shadow-sm"
                        >
                          Adopt Me
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPLICATIONS VIEW */}
        {activeTab === 'applications' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-orange-200 pb-3">
              <h2 className="font-black text-2xl text-[#431407]">Adoption Applications & Home Assessments</h2>
              <p className="text-xs text-orange-800/80 font-mono">Real-time status tracking with shelter review teams</p>
            </div>

            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="bg-white p-6 rounded-3xl border border-orange-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-orange-600 font-mono">ID: {app.id}</span>
                    </div>

                    <h3 className="font-bold text-base text-[#431407]">Applying for: <span className="text-orange-600">{app.petName}</span></h3>
                    <p className="text-xs text-stone-600">Applicant: {app.applicantName} ({app.email})</p>
                    <p className="text-xs text-stone-500 font-mono">Housing: {app.housingType}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateAppStatus(app.id, 'Approved')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-sm"
                    >
                      Approve Match
                    </button>
                    <button
                      onClick={() => updateAppStatus(app.id, 'Home Visit Scheduled')}
                      className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-950 font-bold text-xs rounded-xl transition"
                    >
                      Schedule Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHELTER ADMIN PORTAL */}
        {activeTab === 'shelter-portal' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-orange-200 pb-3">
              <h2 className="font-black text-2xl text-[#431407]">Shelter Listing Management Console</h2>
              <p className="text-xs text-orange-800/80 font-mono">Publish rescued animals to the national adoption directory</p>
            </div>

            <form onSubmit={handleCreatePetSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-sm space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-orange-950 font-bold">Pet Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bella"
                    value={newPetName}
                    onChange={e => setNewPetName(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-orange-950 font-bold">Species</label>
                  <select
                    value={newSpecies}
                    onChange={e => setNewSpecies(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-orange-950 font-bold">Breed Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Corgi Mix"
                    value={newBreed}
                    onChange={e => setNewBreed(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-orange-950 font-bold">Age</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 yrs"
                    value={newAge}
                    onChange={e => setNewAge(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-orange-950 font-bold">Adoption Fee</label>
                  <input
                    type="text"
                    value={newFee}
                    onChange={e => setNewFee(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-orange-950 font-bold">Shelter Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-orange-950 font-bold">Pet Story & Behavioral Bio</label>
                <textarea
                  rows="3"
                  placeholder="Describe temperament, favorite toys, and ideal home environment..."
                  value={newStory}
                  onChange={e => setNewStory(e.target.value)}
                  className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500 font-sans"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold rounded-xl shadow-md transition"
                >
                  Publish Adoptable Profile
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* DETAILED PROFILE MODAL */}
      {selectedPetDetail && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-orange-200 space-y-4">
            <div className="relative h-64 bg-orange-100">
              <img src={selectedPetDetail.image} alt={selectedPetDetail.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPetDetail(null)}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full text-stone-900 shadow-md transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-2xl text-[#431407]">{selectedPetDetail.name}</h3>
                  <p className="text-xs text-orange-600 font-mono font-bold">{selectedPetDetail.breed} • {selectedPetDetail.age}</p>
                </div>
                <span className="text-lg font-black font-mono text-orange-600">{selectedPetDetail.adoptionFee}</span>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">{selectedPetDetail.story}</p>

              {/* Health Badges */}
              <div className="grid grid-cols-3 gap-2 bg-orange-50 p-3 rounded-2xl border border-orange-100 text-center text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="text-emerald-600 block font-bold">✓ Vaccinated</span>
                  <span className="text-[10px] text-stone-500">Core DHPP / Rabies</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-emerald-600 block font-bold">✓ Spayed/Neutered</span>
                  <span className="text-[10px] text-stone-500">Certified</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-emerald-600 block font-bold">✓ Microchipped</span>
                  <span className="text-[10px] text-stone-500">Lifetime Reg</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedPetDetail(null)}
                  className="w-1/2 py-2.5 bg-orange-100 text-orange-950 font-bold rounded-xl text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleOpenApplyModal(selectedPetDetail);
                    setSelectedPetDetail(null);
                  }}
                  className="w-1/2 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Apply to Adopt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADOPTION APPLICATION MODAL */}
      {showApplyModal && applyingPet && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-orange-200">
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#431407]">Adoption Application</h3>
                <span className="text-xs text-orange-600 font-mono">Matching with {applyingPet.name}</span>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harrison Vance"
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={applicantEmail}
                    onChange={e => setApplicantEmail(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 019-2834"
                    value={applicantPhone}
                    onChange={e => setApplicantPhone(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Housing Environment</label>
                <select
                  value={housingType}
                  onChange={e => setHousingType(e.target.value)}
                  className="w-full bg-orange-50/50 border border-orange-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="Single Family House">Single Family House</option>
                  <option value="Townhouse / Condo">Townhouse / Condo</option>
                  <option value="Apartment">Apartment (Pet Friendly)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="w-1/2 py-2.5 bg-orange-100 text-orange-950 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-orange-200 bg-white py-6 px-4 text-center text-xs font-mono text-orange-900/60">
        PAWHAVEN • NO-KILL ANIMAL RESCUE NETWORK • FOREVER HOME ADOPTION PLATFORM
      </footer>
    </div>
  );
}
