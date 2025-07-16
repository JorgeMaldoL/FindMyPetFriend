class PetfinderAPI {
  constructor() {
    this.baseURL = 'https://api.petfinder.com/v2';
    this.clientId = import.meta.env.VITE_PETFINDER_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_PETFINDER_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${this.baseURL}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      // Set expiry to 1 hour from now (tokens usually last 1 hour)
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async makeAuthenticatedRequest(endpoint, params = {}) {
    const token = await this.getAccessToken();
    
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
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
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getAnimals(params = {}) {
    try {
      const defaultParams = {
        limit: 100, // Get more pets to work with
        page: 1,
        ...params
      };

      const data = await this.makeAuthenticatedRequest('/animals', defaultParams);
      return data.animals || [];
    } catch (error) {
      console.error('Error fetching animals:', error);
      // Return mock data if API fails
      return this.getMockData();
    }
  }

  // Mock data for development/testing
  getMockData() {
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
        photos: [{ large: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400" }],
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
        photos: [{ large: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400" }],
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
        photos: [{ large: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400" }],
        description: "Playful young dog with lots of energy."
      },
      {
        id: 6,
        name: "Whiskers",
        species: "Cat",
        breed: "Tabby",
        age: "Adult",
        gender: "Male",
        size: "Medium",
        contact: { address: { city: "Seattle", state: "WA" } },
        photos: [{ large: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400" }],
        description: "Independent cat who enjoys sunny windowsills."
      },
      {
        id: 7,
        name: "Rosie",
        species: "Dog",
        breed: "Poodle Mix",
        age: "Adult",
        gender: "Female",
        size: "Small",
        contact: { address: { city: "Denver", state: "CO" } },
        photos: [{ large: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" }],
        description: "Small and smart dog perfect for apartment living."
      },
      {
        id: 8,
        name: "Mittens",
        species: "Cat",
        breed: "Maine Coon",
        age: "Young",
        gender: "Female",
        size: "Large",
        contact: { address: { city: "Boston", state: "MA" } },
        photos: [{ large: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400" }],
        description: "Large, fluffy cat with a gentle personality."
      },
      {
        id: 9,
        name: "Rocky",
        species: "Dog",
        breed: "German Shepherd",
        age: "Adult",
        gender: "Male",
        size: "Large",
        contact: { address: { city: "Phoenix", state: "AZ" } },
        photos: [{ large: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400" }],
        description: "Protective and loyal dog, great with families."
      },
      {
        id: 10,
        name: "Princess",
        species: "Cat",
        breed: "Ragdoll",
        age: "Adult",
        gender: "Female",
        size: "Large",
        contact: { address: { city: "Miami", state: "FL" } },
        photos: [{ large: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400" }],
        description: "Calm and affectionate cat who loves attention."
      },
      {
        id: 11,
        name: "Zeus",
        species: "Dog",
        breed: "Husky",
        age: "Young",
        gender: "Male",
        size: "Large",
        contact: { address: { city: "Portland", state: "OR" } },
        photos: [{ large: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400" }],
        description: "Energetic husky who loves outdoor adventures."
      },
      {
        id: 12,
        name: "Shadow",
        species: "Cat",
        breed: "Black Cat",
        age: "Adult",
        gender: "Male",
        size: "Medium",
        contact: { address: { city: "Atlanta", state: "GA" } },
        photos: [{ large: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=400" }],
        description: "Mysterious black cat with striking green eyes."
      }
    ];
  }
}

export default new PetfinderAPI();
