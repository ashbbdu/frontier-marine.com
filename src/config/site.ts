export const site = {
  name: 'Frontier Maritime',
  tagline: 'Global Logistics',
  whatsappNumber: '15550000000',
  whatsappDefaultMessage:
    "Hi Frontier Maritime, I'd like to know more about your freight forwarding services.",
  email: 'info@frontiermaritime.example',
  phone: '+1 (555) 000-0000',
  address: '123 Port Avenue, Global City',
  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
};

export const whatsappHref = () =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;
