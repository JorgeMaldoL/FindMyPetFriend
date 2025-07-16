import { useState, useEffect, useCallback } from 'react';

const usePetfinderAPI = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const baseURL = 'https://api.petfinder.com/v2';
  const clientId = import.meta.env.VITE_PETFINDER_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_PETFINDER_CLIENT_SECRET;

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

  const getMockData = () => {
    return [
      {
        id: 1,
        name: "Buddy",
        species: "Dog",
        breed: "Golden Retriever",
        age: "Adult",
        gender: "Male",
        size: "Large",
        contact: { address: { city: "San Francisco", state: "CA" } },
        photos: [{ large: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400" }],
        description: "Friendly and energetic dog looking for a loving home."
      },
      {
        id: 2,
        name: "Luna",
        species: "Cat",
        breed: "Siamese",
        age: "Young",
        gender: "Female",
        size: "Medium",
        contact: { address: { city: "Los Angeles", state: "CA" } },
        photos: [{ large: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400" }],
        description: "Sweet and playful cat who loves to cuddle."
      },
      {
        id: 3,
        name: "Max",
        species: "Dog",
        breed: "Labrador Mix",
        age: "Adult",
        gender: "Male",
        size: "Large",
        contact: { address: { city: "New York", state: "NY" } },
        photos: [{ large: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400" }],
        description: "Loyal companion who loves long walks and playing fetch."
      },
      {
        id: 4,
        name: "Bella",
        species: "Cat",
        breed: "Persian",
        age: "Senior",
        gender: "Female",
        size: "Medium",
        contact: { address: { city: "Chicago", state: "IL" } },
        photos: [{ large: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400" }],
        description: "Gentle senior cat looking for a quiet home."
      },
      {
        id: 5,
        name: "Charlie",
        species: "Dog",
        breed: "Beagle",
        age: "Young",
        gender: "Male",
        size: "Medium",
        contact: { address: { city: "Austin", state: "TX" } },
        photos: [{ large: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" }],
        description: "Playful young dog with lots of energy."
      }
    ];
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
