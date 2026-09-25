// Clone nested records so Cancel never mutates the dashboard.
export function createBuildingDraft(building) {
  const floorRooms =
    building.floorRooms ||
    Array.from({ length: building.floors }, (_, i) => ({
      id: building.id + "-floor-" + (i + 1),
      number: i + 1,
      rooms: Array.from({ length: 3 }, (_, j) => ({
        id: building.id + "-" + (i + 1) + "-" + j,
        name: "Room " + (i + 1) + "0" + (j + 1),
        type: "Classroom",
        description: "A standard room for lectures.",
      })),
    }));
  return {
    ...building,
    floorRooms: floorRooms.map((f) => ({
      ...f,
      rooms: f.rooms.map((r) => ({ ...r })),
    })),
  };
}
export function resizeBuildingFloors(draft, count) {
  // Prevent silent deletion of rooms. Empty floors can be removed.
  if (draft.floorRooms.some((f) => f.number > count && f.rooms.length))
    return null;
  return {
    ...draft,
    floors: count,
    floorRooms: Array.from(
      { length: count },
      (_, i) =>
        draft.floorRooms.find((f) => f.number === i + 1) || {
          id: draft.id + "-floor-" + (i + 1),
          number: i + 1,
          rooms: [],
        },
    ),
  };
}
export function updateDraftRoom(draft, floorId, room) {
  return {
    ...draft,
    floorRooms: draft.floorRooms.map((f) =>
      f.id === floorId
        ? {
            ...f,
            rooms: f.rooms.map((r) => (r.id === room.id ? { ...room } : r)),
          }
        : f,
    ),
  };
}
