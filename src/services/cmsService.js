import api from '@/services/api';

const mapToCamelCase = (data) => {
  if (!data) return null;
  return {
    titlePrefix: data.title_prefix || '',
    titleHighlight: data.title_highlight || '',
    titleSuffix: data.title_suffix || '',
    subtitle: data.subtitle || '',
  };
};

/**
 * Fetch the active hero section content (Public)
 */
export async function getHeroSection() {
  const response = await api.get('/landing/hero');
  return mapToCamelCase(response.data.data);
}

/**
 * Update the hero section content (Admin Only)
 */
export async function updateHeroSection(data) {
  const response = await api.put('/admin/landing/hero', {
    title_prefix: data.titlePrefix,
    title_highlight: data.titleHighlight,
    title_suffix: data.titleSuffix,
    subtitle: data.subtitle,
  });
  return mapToCamelCase(response.data.data);
}

/**
 * Reset the hero section content to defaults (Admin Only)
 */
export async function resetHeroSection() {
  const response = await api.post('/admin/landing/hero/reset');
  return mapToCamelCase(response.data.data);
}
