export const brochureContent = {
  navigation: [
    { label: 'Overview', href: '#overview' }, { label: 'Layouts', href: '#layouts' },
    { label: 'Furnishing', href: '#furnishing' }, { label: 'Facilities', href: '#facilities' },
    { label: 'Location', href: '#location' }, { label: 'Eligibility', href: '#eligibility' }, { label: 'Select', href: '#select-home' },
  ],
  hero: { eyebrow: 'Kota Kemuning · Selangor', title: 'A considered place to call home.', summary: 'Explore the plans, furnishing choices and essential project information for Residensi Lestari Fasa 2.', primaryAction: 'Explore the project', secondaryAction: 'Talk to us', image: 'images/facade-hero.webp', imageAlt: 'Artist’s impression of the Residensi Lestari Fasa 2 residential towers and landscaped entrance' },
  overview: { eyebrow: 'Project overview', title: 'Designed around everyday living.', body: 'Residensi Lestari Fasa 2 brings together practical home layouts, furnishing choices and shared facilities in the Kota Kemuning area. This brochure presents only information supported by the supplied project sources; final availability is confirmed directly with the sales team.' },
  facts: [
    { label: 'Home sizes', value: '1,000–1,080', suffix: 'sq ft' },
    { label: 'Package choices', value: '6', suffix: 'Basic & Upgrade' },
    { label: 'Residential blocks', value: '2', suffix: 'Block B & C' },
    { label: 'Expected VP', value: 'Q3 2030', suffix: 'Subject to confirmation' },
  ],
  layouts: { eyebrow: 'Layouts', title: 'Space for the rhythm of home.', body: 'Compare two owner-approved typical layouts, each with three bedrooms and two bathrooms.' },
  furnishing: { eyebrow: 'Furnishing', title: 'Start with the essentials. Upgrade your finish.', body: 'Basic and Upgrade choices are organised across Packages A, B and C. Upgrade pricing is always shown as a separate addition to the base price.', basicItems: ['TV cabinet and television', 'Kitchen cabinet and refrigerator', 'Three wardrobes', 'Three air-conditioning units', 'Two water heaters'], note: 'Furniture dimensions and colours are subject to manufacturer availability. Confirm final brands, substitutions and terms with an authorised representative.' },
  facilities: { eyebrow: 'Shared spaces', title: 'Useful amenities, close to home.', body: 'The project plans identify a gym and multipurpose hall connecting the residential blocks.', image: 'images/facilities.webp', imageAlt: 'Artist’s impression of the central facilities building at Residensi Lestari Fasa 2' },
  location: { eyebrow: 'Location', title: 'Connected from Kota Kemuning.', body: 'The supplied location plan identifies access to KESAS, LKSA, Federal Highway, ELITE and SKVE. Distances are indicative and should be confirmed for your route.', image: 'images/location-map.webp', imageAlt: 'Project location diagram showing Residensi Lestari Fasa 2 and nearby highway access' },
  eligibility: { eyebrow: 'Eligibility', title: 'A preliminary Rumah Selangorku check.', disclaimer: 'Eligibility remains subject to current LPHS requirements, LPHS approval and bank financing. This website provides a preliminary checklist and does not determine eligibility.' },
  contact: { eyebrow: 'Take the next step', title: 'Let’s find the right home for you.', body: 'Ask about the project, furnishing choices and the latest verified unit information through WhatsApp.', action: 'Start a WhatsApp conversation' },
  imageDisclaimer: 'Artist’s impression. Final appearance may vary.',
} as const
