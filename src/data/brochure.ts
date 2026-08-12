export const brochureContent = {
  navigation: [
    { label: 'Overview', href: '#overview' }, { label: 'Layouts', href: '#layouts' },
    { label: 'Furnishing', href: '#furnishing' }, { label: 'Facilities', href: '#facilities' },
    { label: 'Location', href: '#location' }, { label: 'Eligibility', href: '#eligibility' },
  ],
  hero: { eyebrow: 'Kota Kemuning · Selangor', title: 'A considered place to call home.', summary: 'Explore the plans, furnishing choices and essential project information for Residensi Lestari Fasa 2.', primaryAction: 'Explore the project', secondaryAction: 'Talk to us', image: 'images/facade-hero.webp', imageAlt: 'Artist’s impression of the Residensi Lestari Fasa 2 residential towers and landscaped entrance' },
  overview: { eyebrow: 'Project overview', title: 'Designed around everyday living.', body: 'Residensi Lestari Fasa 2 brings together practical home layouts, furnishing choices and shared facilities in the Kota Kemuning area. This brochure presents only information supported by the supplied project sources; final availability is confirmed directly with the sales team.' },
  facts: [
    { label: 'Home sizes', value: '1,000–1,080', suffix: 'sq ft' },
    { label: 'Package choices', value: '6', suffix: 'Basic & Upgrade' },
    { label: 'Residential blocks', value: '2', suffix: 'Block B & C' },
    { label: 'Expected VP', value: 'Q3 2030', suffix: 'Subject to confirmation' },
  ],
  layouts: { eyebrow: 'Layouts', title: 'Space for the rhythm of home.', body: 'Two built-up sizes are referenced in the supplied project material. Approved standalone floor plans and final bedroom/bathroom specifications are still being prepared.', placeholder: 'Approved floor plan coming soon' },
  furnishing: { eyebrow: 'Furnishing', title: 'Start with the essentials. Upgrade your finish.', body: 'Basic and Upgrade choices are organised across Packages A, B and C. Upgrade pricing is always shown as a separate addition to the base price.', basicItems: ['TV cabinet and television', 'Kitchen cabinet and refrigerator', 'Three wardrobes', 'Three air-conditioning units', 'Two water heaters'], note: 'Working summary from supplied LPHS furnishing material. Final brands, dimensions, colours, substitutions and terms require confirmation.' },
  facilities: { eyebrow: 'Shared spaces', title: 'Useful amenities, close to home.', body: 'The supplied plans identify a gym and multipurpose hall within the development. The final facility schedule remains subject to project approval.', image: 'images/facilities.webp', imageAlt: 'Artist’s impression of the central facilities building at Residensi Lestari Fasa 2' },
  location: { eyebrow: 'Location', title: 'Set within the Kota Kemuning area.', body: 'The precise postal address, map coordinates and verified nearby travel distances are pending approval.', placeholder: 'Verified location map coming soon' },
  eligibility: { eyebrow: 'Eligibility', title: 'A preliminary Rumah Selangorku check.', disclaimer: 'These points are a working English translation of supplied marketing material. Eligibility is subject to current LPHS requirements, LPHS approval and bank financing. This website does not determine eligibility.' },
  contact: { eyebrow: 'Take the next step', title: 'Let’s find the right home for you.', body: 'Ask about the project, furnishing choices and the latest verified unit information through WhatsApp.', action: 'Start a WhatsApp conversation' },
  imageDisclaimer: 'Artist’s impression. Final appearance may vary.',
} as const
