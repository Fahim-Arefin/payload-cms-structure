// src/globals/HomePage.ts
import type { GlobalConfig } from 'payload'
import { makeHeroSchema } from '../schemas/heroSchema'
import { planCardSectionSchema } from '../schemas/OnYourTermsSchema'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Home Page Schemas',
          fields: [
            // ✅ Hero schema for HOME
            makeHeroSchema('homeHero', 'Home Hero'),

            // Add more Home-only sections below:
            // { type: 'group', name: 'homeFeatures', label: 'Home Features', fields: [...] },
            // { type: 'group', name: 'homeTestimonials', label: 'Home Testimonials', fields: [...] },
            planCardSectionSchema,
          ],
        },
      ],
    },
  ],
}
