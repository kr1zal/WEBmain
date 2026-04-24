const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Александр Виноградов',
  alternateName: 'Alexander Vinogradov',
  url: 'https://avinogradov.pro',
  image: 'https://avinogradov.pro/static/images/avatar.png',
  jobTitle: 'Head of E-commerce / IT Director',
  description:
    'IT Директор и Head of E-commerce с 13+ летним опытом в цифровой трансформации, e-commerce и управлении командами до 60 человек',
  sameAs: [
    'https://github.com/kr1zal',
    'https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80-%D0%B2%D0%B8%D0%BD%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D0%BE%D0%B2-02a2441a0',
    'https://t.me/alv1nogradov',
  ],
  knowsAbout: [
    'E-commerce',
    'Digital Transformation',
    'AI Automation',
    'Team Management',
    'Marketplace Analytics',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Орловский государственный институт экономики и торговли',
  },
}

export default function SchemaPersonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}
