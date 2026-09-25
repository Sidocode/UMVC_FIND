// Prototype records only; edits remain in memory until the page reloads.
export const adminBuildings = [
  {
    id: "old",
    name: "Old Building",
    description: "Main building of the university",
    category: "Academic",
    floors: 3,
    status: "Active",
    image: require("../../assets/locations/old-building.png"),
  },
  {
    id: "canteen",
    name: "Canteen",
    description: "Food services and dining area",
    category: "Other",
    floors: 1,
    status: "Active",
    image: require("../../assets/locations/cafeteria.png"),
  },
  {
    id: "new",
    name: "New Building 1",
    description: "Recently constructed building",
    category: "Academic",
    floors: 3,
    status: "Active",
    image: require("../../assets/locations/new-building.png"),
  },
  {
    id: "library",
    name: "Library",
    description: "Books, study area and resources",
    category: "Academic",
    floors: 1,
    status: "Maintenance",
    image: require("../../assets/locations/library.png"),
  },
  {
    id: "clinic",
    name: "School Clinic",
    description: "Provides healthcare services",
    category: "Facility",
    floors: 1,
    status: "Unavailable",
    image: require("../../assets/locations/clinic.png"),
  },
  {
    id: "admin",
    name: "Admin Building",
    description: "Administrative office",
    category: "Admin",
    floors: 1,
    status: "Active",
    image: require("../../assets/locations/category-admin.png"),
  },
];
export const categoryColors = {
  Academic: "#AF2532",
  Other: "#FD8C53",
  Facility: "#217E47",
  Admin: "#FEBF1F",
};
export const statusColors = {
  Active: "#1EAB58",
  Maintenance: "#DE878F",
  Unavailable: "#6C757D",
};
