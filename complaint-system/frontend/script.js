// script.js

let editMode = false;
let currentComplaintId = null;

document.addEventListener('DOMContentLoaded', fetchComplaints);

function fetchComplaints() {
    fetch('/complaints')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#complaintsTable tbody');
            tbody.innerHTML = '';
            data.forEach(complaint => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${complaint._id}</td>
                    <td>${complaint.title}</td>
                    <td>${complaint.description}</td>
                    <td>
                        <button onclick="openEditModal('${complaint._id}', '${complaint.title}', '${complaint.description}')">Edit</button>
                        <button onclick="deleteComplaint('${complaint._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function openAddModal() {
    editMode = false;
    currentComplaintId = null;
    document.getElementById('modalTitle').textContent = 'Add Complaint';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('complaintModal').style.display = 'flex';
}

function openEditModal(id, title, description) {
    editMode = true;
    currentComplaintId = id;
    document.getElementById('modalTitle').textContent = 'Edit Complaint';
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('complaintModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('complaintModal').style.display = 'none';
}

document.getElementById('complaintForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const complaintData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    };

    if (editMode) {
        updateComplaint(currentComplaintId, complaintData);
    } else {
        addComplaint(complaintData);
    }
});

function addComplaint(data) {
    fetch('/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.ok ? fetchComplaints() : alert('Failed to add complaint'))
    .then(closeModal)
    .catch(error => console.error('Error:', error));
}

function updateComplaint(id, data) {
    fetch(`/complaints/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.ok ? fetchComplaints() : alert('Failed to update complaint'))
    .then(closeModal)
    .catch(error => console.error('Error:', error));
}

function deleteComplaint(id) {
    fetch(`/complaints/${id}`, { method: 'DELETE' })
        .then(response => response.ok ? fetchComplaints() : alert('Failed to delete complaint'))
        .catch(error => console.error('Error:', error));
}
