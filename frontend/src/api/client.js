const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('nj_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Announcements
export async function getActiveAnnouncement() {
  try {
    const res = await fetch(`${API_BASE}/announcements/active`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('API connection fallback', err);
    return null;
  }
}

export async function getAdminAnnouncement() {
  const res = await fetch(`${API_BASE}/announcements/`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch announcement');
  return await res.json();
}

export async function updateAnnouncement(data) {
  const res = await fetch(`${API_BASE}/announcements/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update announcement');
  return await res.json();
}

// Blog Posts
export async function getPosts(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.tag) query.append('tag', params.tag);

    const res = await fetch(`${API_BASE}/posts/?${query.toString()}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn('Fetch posts fallback', err);
    return [];
  }
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${API_BASE}/posts/${slug}`);
  if (!res.ok) throw new Error('Post not found');
  return await res.json();
}

export async function getAdminAllPosts() {
  const res = await fetch(`${API_BASE}/posts/admin/all`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

export async function createPost(postData) {
  const res = await fetch(`${API_BASE}/posts/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return await res.json();
}

export async function updatePost(postId, postData) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return await res.json();
}

export async function deletePost(postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete post');
  return await res.json();
}

// Stays & Experiences
export async function getStays(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.location) query.append('location', params.location);
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured_only) query.append('featured_only', 'true');

    const res = await fetch(`${API_BASE}/stays/?${query.toString()}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn('Fetch stays fallback', err);
    return [];
  }
}

export async function getStayBySlug(slug) {
  const res = await fetch(`${API_BASE}/stays/${slug}`);
  if (!res.ok) throw new Error('Stay not found');
  return await res.json();
}

export async function getAdminAllStays() {
  const res = await fetch(`${API_BASE}/stays/admin/all`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch stays');
  return await res.json();
}

export async function createStay(stayData) {
  const res = await fetch(`${API_BASE}/stays/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(stayData)
  });
  if (!res.ok) throw new Error('Failed to create stay');
  return await res.json();
}

export async function updateStay(stayId, stayData) {
  const res = await fetch(`${API_BASE}/stays/${stayId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(stayData)
  });
  if (!res.ok) throw new Error('Failed to update stay');
  return await res.json();
}

export async function deleteStay(stayId) {
  const res = await fetch(`${API_BASE}/stays/${stayId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete stay');
  return await res.json();
}

// Leads & Inquiries
export async function submitLeadInquiry(leadData) {
  const res = await fetch(`${API_BASE}/leads/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  if (!res.ok) throw new Error('Failed to submit inquiry');
  return await res.json();
}

export async function getAdminLeads(status = 'All') {
  const query = status !== 'All' ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE}/leads/${query}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch leads');
  return await res.json();
}

export async function updateLeadStatus(leadId, data) {
  const res = await fetch(`${API_BASE}/leads/${leadId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update lead');
  return await res.json();
}

export async function deleteLead(leadId) {
  const res = await fetch(`${API_BASE}/leads/${leadId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete lead');
  return await res.json();
}

// Auth & Dashboard Stats
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Login failed. Please check credentials.');
  }
  return await res.json();
}

export async function getAdminStats() {
  const res = await fetch(`${API_BASE}/auth/stats`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return await res.json();
}
