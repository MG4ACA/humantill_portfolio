// Sample event data for Locations page
// Use manual coordinates (SVG viewBox units) for marker placement
const events = [
  {
    id: 'LK-11',
    title: 'Community Health Camp',
    districtId: 'LK-11',
    districtTitle: 'Colombo',
    date: '2025-09-10',
    address: 'Colombo Municipal Grounds, Colombo',
    description:
      'Free health screenings, consultations, and community education provided by volunteer medical teams. All community members welcome.',
    type: 'active',
    status: 'Ongoing',
  },
  {
    id: 'LK-12',
    title: 'Child Education Drive',
    districtId: 'LK-12',
    districtTitle: 'Gampaha',
    date: '2025-05-01',
    address: 'Gampaha Public Library, Gampaha',
    description:
      'Provided books, mentoring sessions and after-school support to children from nearby communities.',
    type: 'concluded',
    status: 'Completed',
  },
  {
    id: 'LK-22',
    title: 'Tree Planting Day',
    districtId: 'LK-22',
    districtTitle: 'Matale',
    date: '2025-10-12',
    address: 'Matale City Park, Matale',
    description:
      'Volunteers will plant native saplings to improve urban green cover and support local biodiversity.',
    type: 'upcoming',
    status: 'Planned',
  },
  {
    id: 'LK-31',
    title: 'Food Relief Distribution',
    districtId: 'LK-31',
    districtTitle: 'Galle',
    date: '2025-08-20',
    address: 'Galle Town Hall, Galle',
    description:
      'Distribution of emergency food packages to families affected by recent flooding; coordinated with local partners and volunteers.',
    type: 'active',
    status: 'Ongoing',
  },
  {
    id: 'LK-61',
    title: 'Water Supply Project (phase 1)',
    districtId: 'LK-61',
    districtTitle: 'Kurunegala',
    date: '2025-03-15',
    address: 'Kurunegala District Office, Kurunegala',
    description:
      'Installed community taps and trained local staff for ongoing maintenance of the water points.',
    type: 'concluded',
    status: 'Completed',
  },
  {
    id: 'LK-92',
    title: 'Youth Skills Workshop',
    districtId: 'LK-92',
    districtTitle: 'Kegalle',
    date: '2025-11-05',
    address: 'Kegalle Community Center, Kegalle',
    description:
      'A hands-on programme teaching digital skills, entrepreneurship, and job-readiness to local youth.',
    type: 'upcoming',
    status: 'Planned',
  },
];

export default events;
