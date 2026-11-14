export const site = {
  name: 'SeaFargo Freight Services',
  shortName: 'SeaFargo',
  tagline: 'Global Reach. Personal Commitment.',
  city: 'Dubai, UAE',
  whatsappNumber: '971507091804',
  whatsappDefaultMessage:
    "Hi SeaFargo, I'd like to know more about your freight forwarding services.",
  email: 'operations@seafargo.com',
  phone: '+971 50 709 1804',
  address: 'IFZA Business Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
};

export const whatsappHref = () =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;
