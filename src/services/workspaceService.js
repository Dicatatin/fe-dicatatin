import api from '@/services/api';

const unwrapData = (response) => response.data?.data ?? response.data;

const parseIfString = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return Array.isArray(data) ? data : [];
};

const normalizeWorkspace = (workspace) => ({
  ...workspace,
  nodes: parseIfString(workspace?.nodes),
  edges: parseIfString(workspace?.edges),
  flashcards: parseIfString(workspace?.flashcards),
});

export async function getWorkspaces() {
  const response = await api.get('/workspaces');
  const data = unwrapData(response);
  return Array.isArray(data) ? data.map(normalizeWorkspace) : [];
}

export async function getWorkspace(id) {
  const response = await api.get(`/workspaces/${id}`);
  return normalizeWorkspace(unwrapData(response));
}

export async function createWorkspace({ file, method, name }) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('method', method);
  formData.append('name', name || 'Untitled Note');

  const response = await api.post('/workspaces', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return unwrapData(response);
}

export async function updateWorkspace(id, payload) {
  const response = await api.put(`/workspaces/${id}`, payload);
  return unwrapData(response);
}

export async function deleteWorkspace(id) {
  const response = await api.delete(`/workspaces/${id}`);
  return unwrapData(response);
}

export async function transformWorkspace(id, newMethod) {
  const response = await api.post(`/workspaces/${id}/transform`, {
    new_method: newMethod,
  });

  return unwrapData(response);
}
