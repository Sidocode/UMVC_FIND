// Temporary records: replace these values with campus data later.
export const buildings = [
  {
    id: "building-1",
    name: "Building 1",
    floors: [3, 2, 1].map((number) => ({
      id: `building-1-floor-${number}`,
      number,
      rooms: Array.from({ length: 7 }, (_, index) => ({
        id: `building-1-${number}-${index + 1}`,
        name: `Room ${number}0${index + 1}`,
        type: "classroom",
        description: `A standard room for lectures on floor ${number} of Building 1.`,
      })),
    })),
  },
];
