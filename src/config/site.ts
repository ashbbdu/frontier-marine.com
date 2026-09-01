export const site = {
  name: 'SeaFargo Freight Services',
  shortName: 'SeaFargo',
  tagline: 'Global Reach. Personal Commitment.',
  city: 'Dubai, UAE',
  whatsappNumber: '971567614169',
  whatsappDefaultMessage:
    "Hi SeaFargo, I'd like to know more about your freight forwarding services.",
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
