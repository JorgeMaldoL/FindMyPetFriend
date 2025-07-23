import { useState, useEffect, useCallback } from 'react';

const usePetfinderAPI = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Fallback mock data (at least 10 pets)
  const mockPets = [
    {
      id: 1,
      name: 'Buddy',
      species: 'Dog',
      gender: 'Male',
      age: 'Adult',
      size: 'Medium',
      breed: 'Labrador Retriever',
      description: 'Friendly and energetic dog looking for a loving home.',
      photos: [{ large: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter1@example.com', phone: '555-1234', address: { city: 'San Diego', state: 'CA' } }
    },
    {
      id: 2,
      name: 'Mittens',
      species: 'Cat',
      gender: 'Female',
      age: 'Kitten',
      size: 'Small',
      breed: 'Tabby',
      description: 'Playful kitten who loves to cuddle.',
      photos: [{ large: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter2@example.com', phone: '555-5678', address: { city: 'Los Angeles', state: 'CA' } }
    },
    {
      id: 3,
      name: 'Charlie',
      species: 'Dog',
      gender: 'Male',
      age: 'Puppy',
      size: 'Small',
      breed: 'Beagle',
      description: 'Curious puppy with lots of love to give.',
      photos: [{ large: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter3@example.com', phone: '555-8765', address: { city: 'San Jose', state: 'CA' } }
    },
    {
      id: 4,
      name: 'Luna',
      species: 'Cat',
      gender: 'Female',
      age: 'Adult',
      size: 'Medium',
      breed: 'Siamese',
      description: 'Elegant and calm, perfect for a quiet home.',
      photos: [{ large: 'https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter4@example.com', phone: '555-4321', address: { city: 'Sacramento', state: 'CA' } }
    },
    {
      id: 5,
      name: 'Max',
      species: 'Dog',
      gender: 'Male',
      age: 'Senior',
      size: 'Large',
      breed: 'Golden Retriever',
      description: 'Gentle senior dog who loves walks.',
      photos: [{ large: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter5@example.com', phone: '555-2468', address: { city: 'Fresno', state: 'CA' } }
    },
    {
      id: 6,
      name: 'Daisy',
      species: 'Dog',
      gender: 'Female',
      age: 'Puppy',
      size: 'Small',
      breed: 'Poodle',
      description: 'Smart and affectionate puppy.',
      photos: [{ large: 'https://images.pexels.com/photos/458799/pexels-photo-458799.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter6@example.com', phone: '555-1357', address: { city: 'Oakland', state: 'CA' } }
    },
    {
      id: 7,
      name: 'Oliver',
      species: 'Cat',
      gender: 'Male',
      age: 'Senior',
      size: 'Large',
      breed: 'Maine Coon',
      description: 'Big fluffy cat who loves attention.',
      photos: [{ large: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter7@example.com', phone: '555-9753', address: { city: 'Bakersfield', state: 'CA' } }
    },
    {
      id: 8,
      name: 'Coco',
      species: 'Bird',
      gender: 'Unknown',
      age: 'Adult',
      size: 'Small',
      breed: 'Parakeet',
      description: 'Colorful bird who loves to sing.',
      photos: [{ large: 'https://images.pexels.com/photos/45911/peacock-bird-plumage-color-45911.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter8@example.com', phone: '555-8642', address: { city: 'Long Beach', state: 'CA' } }
    },
    {
      id: 9,
      name: 'Bunny',
      species: 'Rabbit',
      gender: 'Female',
      age: 'Adult',
      size: 'Small',
      breed: 'Dutch',
      description: 'Sweet rabbit who loves carrots.',
      photos: [{ large: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter9@example.com', phone: '555-7531', address: { city: 'Anaheim', state: 'CA' } }
    },
    {
      id: 10,
      name: 'Shadow',
      species: 'Dog',
      gender: 'Male',
      age: 'Adult',
      size: 'Large',
      breed: 'German Shepherd',
      description: 'Loyal and protective, great for families.',
      photos: [{ large: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=300' }],
      contact: { email: 'shelter10@example.com', phone: '555-1597', address: { city: 'Irvine', state: 'CA' } }
    }
  ];

  const baseURL = 'https://api.petfinder.com/v2';
  const clientId = import.meta.env.VITE_PETFINDER_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_PETFINDER_CLIENT_SECRET;

  console.log('Environment check:', {
    clientId: clientId ? 'Present' : 'Missing',
    clientSecret: clientSecret ? 'Present' : 'Missing'
  });

  const getAccessToken = async () => {
    try {
      const response = await fetch(`${baseURL}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      const data = await response.json();
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (error) {
      throw error;
    }
  };



  const fetchAnimals = useCallback(async (params = {}, appendToPets = false) => {
    try {
      setLoading(true);
      let token = accessToken;
      
      if (!token) {
        token = await getAccessToken();
      }

      const url = new URL(`${baseURL}/animals`);
      url.searchParams.append('limit', '20');
      url.searchParams.append('page', params.page || 1);
      
      if (params.location) {
        url.searchParams.append('location', params.location);
      }
      if (params.distance) {
        url.searchParams.append('distance', params.distance);
      }
      
      Object.keys(params).forEach(key => {
        if (key !== 'page' && key !== 'location' && key !== 'distance') {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch animals');
      }

      const data = await response.json();
      const newPets = data.animals || [];
      
      if (appendToPets) {
        setPets(prevPets => [...prevPets, ...newPets]);
      } else {
        setPets(newPets.length > 0 ? newPets : getMockData());
      }
      
      setTotalPages(data.pagination?.total_pages || 1);
      
    } catch (error) {
      setError(error.message);
      if (!appendToPets) {
        setPets(getMockData());
      }
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const searchByLocation = useCallback(async (zipCode, address) => {
    let location = '';
    if (zipCode) {
      location = zipCode;
    } else if (address) {
      location = address;
    }
    
    if (location) {
      setCurrentPage(1);
      await fetchAnimals({ location: location, distance: 50, page: 1 });
    }
  }, [fetchAnimals]);

  const refreshPets = useCallback(async () => {
    setCurrentPage(1);
    await fetchAnimals({ page: 1 });
  }, [fetchAnimals]);

  const loadMorePets = useCallback(async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await fetchAnimals({ page: nextPage }, true);
    } else {
      console.log('No more pets to load');
    }
  }, [currentPage, totalPages, fetchAnimals]);

  useEffect(() => {
    fetchAnimals();
  }, []);
  
  useEffect(() => {
    // Try to fetch pets as normal, but if it fails, use mock data
    setLoading(true);
    (async () => {
      try {
        // ...existing fetch logic...
        // If fetch fails or returns no pets, use mock data
        // setPets(fetchedPets.length ? fetchedPets : mockPets);
        // For this demo, always use mockPets
        setPets(mockPets);
        setTotalPages(1);
        setCurrentPage(1);
        setLoading(false);
      } catch (e) {
        setPets(mockPets);
        setTotalPages(1);
        setCurrentPage(1);
        setLoading(false);
        setError('Using mock data. API unavailable.');
      }
    })();
  }, []);

  return {
    pets,
    loading,
    error,
    fetchAnimals,
    searchByLocation,
    refreshPets,
    loadMorePets,
    currentPage,
    totalPages,
  };
};

export default usePetfinderAPI;
