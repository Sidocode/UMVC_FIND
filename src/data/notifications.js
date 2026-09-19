// Repeated Figma examples for the UI preview; no live notifications yet.
export const notifications = [1, 2, 3, 4, 5, 6].map((number) => ({
  id: `example-notification-${number}`,
  title: "New Building Information",
  buildingName: "Building 2",
  locationName: "Old Building",
  message: "The location of Building 2 has been updated.",
  time: "Today, 9:24 AM",
}));
