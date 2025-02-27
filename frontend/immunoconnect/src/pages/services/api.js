const API_BASE = 'http://localhost:5000/api';

export const createChild = async (childData) => {
    try {
        const response = await fetch(`${API_BASE}/children`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(childData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create child');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchChildren = async (parentId) => {
    const response = await fetch(`${API_BASE}/children?parentId=${parentId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
};

export const fetchChildVaccinations = async (childId) => {
    const response = await fetch(`${API_BASE}/children/${childId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
};

export const updateVaccination = async (vaccinationId, updateData) => {
    const response = await fetch(`${API_BASE}/vaccinations/${vaccinationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
    });
    return await response.json();
};