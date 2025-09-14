/* ARCHIVED COPY: Original interactive map script from legacy site
   Moved here during repository cleanup to preserve history.

   NOTE: The active map implementation for the React app lives in
   `src/pages/Locations.jsx` and related `src/assets/styles/locations.css`.

   This file was copied verbatim from the root `map/map-interactive.js`.
*/

// --- BEGIN ARCHIVED CONTENT ---
const eventData = [
  {
    id: 1,
    district: 'Colombo',
    date: '2023-09-12',
    status: 'past',
    beneficiaries: 120,
    description: 'Community support programme in Colombo.',
  },
  {
    id: 2,
    district: 'Kandy',
    date: '2024-01-20',
    status: 'future',
    beneficiaries: 200,
    description: 'Educational outreach in Kandy.',
  },
];

function initializeMap() {
  console.log('ARCHIVED: initializeMap placeholder — see React app for active map');
}

function addEventMarkers(map) {
  // Original code placed markers onto an interactive SVG map.
}

function displayEventDetails(eventId) {
  const event = eventData.find((e) => e.id === eventId);
  if (!event) return;
  console.log('ARCHIVED: displayEventDetails', event);
}

// --- END ARCHIVED CONTENT ---

console.log('ARCHIVED: legacy map-interactive.js preserved in archive/legacy-site/map/');
/* ARCHIVED: legacy map interactive script moved to archive. The React app contains the active map implementation in `src/pages/Locations.jsx`. */
console.log('ARCHIVED: map-interactive.js placeholder');
