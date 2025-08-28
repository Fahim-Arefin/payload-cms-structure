// src/globals/AboutUsPage.ts
import type { GlobalConfig } from 'payload'
import { makeHeroSchema } from '../schemas/heroSchema'

export const AboutUsPage: GlobalConfig = {
  slug: 'about-us-page',
  label: 'About Us Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'About Us Page Schemas',
          fields: [
            // ✅ Hero schema for ABOUT
            makeHeroSchema('aboutHero', 'About Us Hero'),

            // Add more About-only sections below:
            // { type: 'group', name: 'aboutMission', label: 'Our Mission', fields: [...] },
            // { type: 'group', name: 'aboutTeam', label: 'Our Team', fields: [...] },
          ],
        },
      ],
    },
  ],
}
