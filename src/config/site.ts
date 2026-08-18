export const site = {
  name: 'Frontier Maritime',
  tagline: 'Global Logistics',
  city: 'Dubai, UAE',
  whatsappNumber: '971567614169',
  whatsappDefaultMessage:
    "Hi Frontier Maritime, I'd like to know more about your freight forwarding services.",
  email: 'Joshua@frontier-marine.com',
  phone: '+971 56 761 4169',
  address: 'Jebel Ali Free Zone, Dubai, United Arab Emirates',
  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
};

export const whatsappHref = () =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;
