// HumaniTill Interactive Map
document.addEventListener('DOMContentLoaded', function () {
  // Event data with district mapping instead of fixed coordinates
  const eventData = {
    'colombo-1': {
      id: 'colombo-1',
      name: 'Colombo Community Center Event',
      location: 'Colombo, Western Province',
      date: '2025-07-15',
      status: 'active',
      beneficiaries: 45,
      description:
        'Ongoing prosthetic limb fitting program at the Colombo Community Center. Our team is currently providing custom-fitted prosthetics to individuals in need.',
      districtId: 'LK-11',
      districtTitle: 'Colombo',
    },
    'kandy-1': {
      id: 'kandy-1',
      name: 'Kandy Temple Hall Initiative',
      location: 'Kandy, Central Province',
      date: '2025-06-20',
      status: 'past',
      beneficiaries: 32,
      description:
        'Successfully completed prosthetic limb distribution event at Kandy Temple Hall. Provided mobility solutions to 32 individuals with the support of local volunteers.',
      districtId: 'LK-21',
      districtTitle: 'Mahanuvara',
    },
    'galle-1': {
      id: 'galle-1',
      name: 'Galle Coastal Care Program',
      location: 'Galle, Southern Province',
      date: '2025-08-10',
      status: 'future',
      beneficiaries: 28,
      description:
        'Upcoming prosthetic limb fitting program scheduled for the Galle coastal community. Expected to serve 28 beneficiaries in collaboration with local healthcare providers.',
      districtId: 'LK-31',
      districtTitle: 'Galle',
    },
    'matale-1': {
      id: 'matale-1',
      name: 'Matale Rural Outreach',
      location: 'Matale, Central Province',
      date: '2025-05-30',
      status: 'past',
      beneficiaries: 18,
      description:
        'Completed rural outreach program in Matale district, focusing on providing prosthetic solutions to farming communities affected by accidents.',
      districtId: 'LK-22',
      districtTitle: 'Matale',
    },
    'jaffna-1': {
      id: 'jaffna-1',
      name: 'Jaffna Peninsula Project',
      location: 'Jaffna, Northern Province',
      date: '2025-09-05',
      status: 'future',
      beneficiaries: 41,
      description:
        'Planned comprehensive prosthetic limb program for the Jaffna peninsula, targeting individuals affected by past conflicts and accidents.',
      districtId: 'LK-41',
      districtTitle: 'Jaffna',
    },
    'matara-1': {
      id: 'matara-1',
      name: 'Matara Fishing Community Aid',
      location: 'Matara, Southern Province',
      date: '2025-07-28',
      status: 'active',
      beneficiaries: 22,
      description:
        'Current program supporting the fishing community in Matara with prosthetic limbs and mobility aids for those injured in maritime accidents.',
      districtId: 'LK-32',
      districtTitle: 'Matara',
    },
  };

  // Initialize map
  function initializeMap() {
    const mapVisual = document.querySelector('.map-visual');
    if (!mapVisual) return;

    const svg = mapVisual.querySelector('svg');
    if (!svg) return;

    addEventMarkers(svg);

    const defaultEvent =
      Object.values(eventData).find((event) => event.status === 'active') ||
      Object.values(eventData)[0];
    displayEventDetails(defaultEvent);
  }

  function addEventMarkers(svg) {
    // Function to calculate the center point of an SVG path element
    function getPathCenter(pathElement) {
      try {
        const bbox = pathElement.getBBox();
        const svg = pathElement.ownerSVGElement;
        const pathTransform = pathElement.getCTM();

        // Calculate center of the path
        let centerX = bbox.x + bbox.width / 2;
        let centerY = bbox.y + bbox.height / 2;

        // Apply any transforms that are applied to the path
        if (pathTransform) {
          const point = svg.createSVGPoint();
          point.x = centerX;
          point.y = centerY;
          const transformedPoint = point.matrixTransform(pathTransform);
          centerX = transformedPoint.x;
          centerY = transformedPoint.y;
        }

        return {
          x: centerX,
          y: centerY,
        };
      } catch (error) {
        console.warn('Could not calculate bounding box for path:', error);
        return { x: 200, y: 300 }; // fallback coordinates
      }
    }

    Object.values(eventData).forEach((event) => {
      // Find the corresponding district path element
      const districtPath = svg.querySelector(`path[id="${event.districtId}"]`);
      let coordinates = { x: 200, y: 300 }; // fallback coordinates

      if (districtPath) {
        coordinates = getPathCenter(districtPath);
      } else {
        console.warn(`District path not found for ${event.districtTitle} (${event.districtId})`);
      }

      const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      markerGroup.setAttribute('class', `event-marker ${event.status}`);
      markerGroup.setAttribute('data-event-id', event.id);
      markerGroup.setAttribute('transform', `translate(${coordinates.x}, ${coordinates.y})`);

      // Use an image marker instead of drawn circles so we can reuse the provided PNG
      const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      // path relative to site root; adjust if your build serves images elsewhere
      img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/humantil_map_icon.png');
      // size of the icon (adjust if needed)
      const ICON_W = 24;
      const ICON_H = 34;
      // position the image so its tip aligns with the exact coordinate (center-bottom)
      img.setAttribute('width', ICON_W);
      img.setAttribute('height', ICON_H);
      img.setAttribute('x', -ICON_W / 2);
      img.setAttribute('y', -ICON_H + 6); // adjust vertical offset so tip sits on the district center
      img.setAttribute('preserveAspectRatio', 'xMidYMid meet');

      markerGroup.addEventListener('click', (e) => {
        e.stopPropagation();
        displayEventDetails(event);
        highlightActiveMarker(markerGroup);
      });

      markerGroup.addEventListener('mouseenter', () => createTooltip(event, markerGroup));
      markerGroup.addEventListener('mouseleave', removeTooltip);

      markerGroup.appendChild(img);
      svg.appendChild(markerGroup);

      // Optional: Add visual feedback to the district itself
      if (districtPath) {
        districtPath.addEventListener('click', () => {
          displayEventDetails(event);
          highlightActiveMarker(markerGroup);
        });

        districtPath.addEventListener('mouseenter', () => {
          districtPath.style.fill = 'rgba(144, 238, 144, 0.3)';
          districtPath.style.cursor = 'pointer';
        });

        districtPath.addEventListener('mouseleave', () => {
          districtPath.style.fill = '';
          districtPath.style.cursor = '';
        });
      }
    });
  }

  function displayEventDetails(event) {
    const detailsContainer = document.getElementById('event-details');
    if (!detailsContainer) return;

    const statusLabel = event.status.charAt(0).toUpperCase() + event.status.slice(1);
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    detailsContainer.innerHTML = `
            <h3>${event.name}</h3>
            
            <div class="event-info">
                <strong>Status:</strong>
                <span class="event-status ${event.status}">${statusLabel}</span>
            </div>
            
            <div class="event-info">
                <strong>Location:</strong> ${event.location}
            </div>
            
            <div class="event-info">
                <strong>Date:</strong> ${formattedDate}
            </div>
            
            <div class="beneficiaries-count">
                ${event.beneficiaries} Beneficiaries
            </div>
            
            <div class="event-description">
                <strong>Description:</strong><br>
                ${event.description}
            </div>
        `;
  }

  function highlightActiveMarker(activeMarker) {
    document.querySelectorAll('.event-marker').forEach((marker) => {
      marker.style.transform = marker.getAttribute('transform') || '';
    });

    const baseTransform = activeMarker.getAttribute('transform') || '';
    activeMarker.style.transform = baseTransform + ' scale(1.3)';
  }

  function createTooltip(event, markerElement) {
    removeTooltip();

    const tooltip = document.createElement('div');
    tooltip.id = 'event-tooltip';
    tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;

    tooltip.textContent = `${event.name} - ${event.beneficiaries} beneficiaries`;

    const rect = markerElement.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 30 + 'px';

    document.body.appendChild(tooltip);
  }

  function removeTooltip() {
    const existingTooltip = document.getElementById('event-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
  }

  // Initialize after DOM load
  setTimeout(initializeMap, 500);
});
