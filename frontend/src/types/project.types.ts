export interface Project {
  _id: string;
  name: string;
  builder: string;
  location: string;
  propertyType: string;
  priceMin: number;
  priceMax: number;
  unitTypes?: string[];
  possession?: string;
  description?: string;
  image?: string;
  imageUrls?: string[];
  schools?: string[];
  hospitals?: string[];
  nearbySchools?: string[];
  nearbyHospitals?: string[];
}