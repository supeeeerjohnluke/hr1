const modal = document.getElementById('staffModal');
    const staffTable = document.getElementById('staffTable');
    const staffForm = document.getElementById('staffForm');
    let debounceTimeout;

    // Utility: Get staff data from localStorage
    function getStaffData() {
      return JSON.parse(localStorage.getItem('staff')) || [];
    }

    // Utility: Save staff data to localStorage
    function saveStaffData(data) {
      localStorage.setItem('staff', JSON.stringify(data));
    }

    // Load and render staff into table
    function loadStaff() {
      const staffData = getStaffData();
      staffTable.innerHTML = '';

      staffData.forEach(staff => {
        const row = document.createElement('tr');
        row.classList.add('table-row');
        row.innerHTML = `
          <td class="p-2">${staff.id}</td>
          <td class="p-2">${staff.dateAdded}</td>
          <td class="p-2">${staff.firstName}</td>
          <td class="p-2">${staff.lastName}</td>
          <td class="p-2">${staff.startDate}</td>
          <td class="p-2">${staff.location}</td>
          <td class="p-2">${staff.department}</td>
          <td class="p-2">${staff.email}</td>
          <td class="p-2 flex space-x-2">
            <button onclick="checkStaff(${staff.id})" class="text-blue-600 hover:underline">✔️ Check</button>
            <button onclick="removeStaff(${staff.id})" class="text-red-500 hover:underline">🗑️ Delete</button>
          </td>
        `;
        staffTable.appendChild(row);
      });
    }

    // Modal open/close
    function openModal() {
      modal.classList.remove('hidden');
    }

    function closeModal() {
      modal.classList.add('hidden');
      staffForm.reset();
    }

    // Remove staff
    function removeStaff(id) {
      const staffData = getStaffData();
      const updatedStaff = staffData.filter(staff => staff.id !== id);
      saveStaffData(updatedStaff);
      loadStaff();
    }

    // Check staff details
    function checkStaff(id) {
      const staff = getStaffData().find(s => s.id === id);
      if (staff) {
        alert(`
Staff ID: ${staff.id}
Name: ${staff.firstName} ${staff.lastName}
Start Date: ${staff.startDate}
Location: ${staff.location}
Department: ${staff.department}
Email: ${staff.email}
Date Added: ${staff.dateAdded}
        `);
      }
    }

    // Handle form submission
    staffForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const startDate = document.getElementById('startDate').value;
      const location = document.getElementById('location').value;
      const email = document.getElementById('email').value;
      const department = document.getElementById('department').value;
      const dateAdded = new Date().toLocaleDateString();

      const staffData = getStaffData();
      const newId = staffData.length > 0 ? Math.max(...staffData.map(s => s.id)) + 1 : 1;

      const newStaff = {
        id: newId,
        firstName,
        lastName,
        startDate,
        location,
        email,
        department,
        dateAdded
      };

      staffData.push(newStaff);
      saveStaffData(staffData);
      loadStaff();
      closeModal();
    });

    // Debounced Search Function
    function debounceSearch() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        searchStaff();
      }, 300);
    }

    // Search Staff
    function searchStaff() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      const staffData = getStaffData();
      const filteredStaff = staffData.filter(staff => {
        return (
          staff.id.toString().includes(searchTerm) ||
          staff.firstName.toLowerCase().includes(searchTerm) ||
          staff.lastName.toLowerCase().includes(searchTerm)
        );
      });
      
      staffTable.innerHTML = '';
      filteredStaff.forEach(staff => {
        const row = document.createElement('tr');
        row.classList.add('table-row');
        row.innerHTML = `
          <td class="p-2">${staff.id}</td>
          <td class="p-2">${staff.dateAdded}</td>
          <td class="p-2">${staff.firstName}</td>
          <td class="p-2">${staff.lastName}</td>
          <td class="p-2">${staff.startDate}</td>
          <td class="p-2">${staff.location}</td>
          <td class="p-2">${staff.department}</td>
          <td class="p-2">${staff.email}</td>
          <td class="p-2 flex space-x-2">
            <button onclick="checkStaff(${staff.id})" class="text-blue-600 hover:underline">✔️ Check</button>
            <button onclick="removeStaff(${staff.id})" class="text-red-500 hover:underline">🗑️ Delete</button>
          </td>
        `;
        staffTable.appendChild(row);
      });
    }

    // Clear Search
    function clearSearch() {
      document.getElementById('searchInput').value = '';
      searchStaff();
    }

    // Load on page ready
    loadStaff();
  